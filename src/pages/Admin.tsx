import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, ShoppingBag, Package, LogOut, Home, DollarSign, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/lib/currency";
import { catalogProducts } from "@/data/catalog";
import { useToast } from "@/hooks/use-toast";

type AdminTab = "overview" | "orders" | "inventory";

interface Order {
  id: string;
  created_at: string;
  total: number;
  status: string;
  payment_status: string;
  shipping_name: string;
  shipping_city: string;
  payer_phone: string | null;
}

const Admin = () => {
  const { user, signOut } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderFilter, setOrderFilter] = useState("all");
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      navigate("/");
    }
  }, [isAdmin, adminLoading, navigate]);

  useEffect(() => {
    if (isAdmin) fetchOrders();
  }, [isAdmin]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    const { data, error } = await supabase
      .from("orders")
      .select("id, created_at, total, status, payment_status, shipping_name, shipping_city, payer_phone")
      .order("created_at", { ascending: false });

    if (!error && data) setOrders(data);
    setLoadingOrders(false);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);
    if (!error) {
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
      toast({ title: "Order updated", description: `Status changed to ${newStatus}` });
    }
  };

  if (adminLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><p className="text-muted-foreground">Loading...</p></div>;
  }

  if (!isAdmin) return null;

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === "paid") return o.payment_status === "successful" || o.status === "paid";
    if (orderFilter === "shipped") return o.status === "shipped";
    if (orderFilter === "pending") return o.payment_status === "pending";
    return true;
  });

  const totalRevenue = orders.filter((o) => o.payment_status === "successful" || o.status === "paid").reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const paidOrders = orders.filter((o) => o.payment_status === "successful" || o.status === "paid").length;

  const sidebarItems = [
    { id: "overview" as const, label: "Sales Overview", icon: BarChart3 },
    { id: "orders" as const, label: "Orders", icon: ShoppingBag },
    { id: "inventory" as const, label: "Inventory", icon: Package },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-lg font-bold text-primary">Xtenova Mart</h1>
          <p className="text-xs text-muted-foreground mt-1">Admin Dashboard</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t space-y-2">
          <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => navigate("/")}>
            <Home className="h-4 w-4 mr-2" /> Back to Store
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm text-destructive" onClick={() => signOut()}>
            <LogOut className="h-4 w-4 mr-2" /> Sign Out
          </Button>
          <p className="text-[10px] text-muted-foreground px-2">{user?.email}</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-8 overflow-auto">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Sales Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                  <DollarSign className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPrice(totalRevenue)}</div>
                  <p className="text-xs text-muted-foreground mt-1">From {paidOrders} paid orders</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalOrders}</div>
                  <p className="text-xs text-muted-foreground mt-1">All time</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
                  <TrendingUp className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalOrders > 0 ? Math.round((paidOrders / totalOrders) * 100) : 0}%</div>
                  <p className="text-xs text-muted-foreground mt-1">Paid / Total orders</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No orders yet.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.slice(0, 5).map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.shipping_name}</TableCell>
                          <TableCell>{formatPrice(order.total)}</TableCell>
                          <TableCell>
                            <Badge variant={order.payment_status === "successful" ? "default" : "secondary"}>
                              {order.payment_status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{order.status}</Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-xs">
                            {new Date(order.created_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Orders</h2>
              <div className="flex gap-2">
                <Select value={orderFilter} onValueChange={setOrderFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={fetchOrders}>Refresh</Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                {loadingOrders ? (
                  <p className="p-6 text-muted-foreground">Loading orders...</p>
                ) : filteredOrders.length === 0 ? (
                  <p className="p-6 text-muted-foreground">No orders found.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono text-xs">{order.id.slice(0, 8)}...</TableCell>
                          <TableCell className="font-medium">{order.shipping_name}</TableCell>
                          <TableCell>{order.shipping_city}</TableCell>
                          <TableCell className="text-xs">{order.payer_phone || "—"}</TableCell>
                          <TableCell className="font-semibold">{formatPrice(order.total)}</TableCell>
                          <TableCell>
                            <Badge variant={order.payment_status === "successful" ? "default" : "secondary"}>
                              {order.payment_status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Select value={order.status} onValueChange={(v) => updateOrderStatus(order.id, v)}>
                              <SelectTrigger className="w-28 h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => updateOrderStatus(order.id, "shipped")}>
                              Ship
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "inventory" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Inventory</h2>
            <p className="text-muted-foreground text-sm">Manage your product catalog and stock levels.</p>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Products ({catalogProducts.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {catalogProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                        </TableCell>
                        <TableCell className="font-medium text-sm">{product.name}</TableCell>
                        <TableCell className="text-sm">{product.categoryLabel}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{product.brand}</TableCell>
                        <TableCell className="font-semibold text-sm">{formatPrice(product.price)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={product.stockLevel === "out" ? "destructive" : product.stockLevel === "low" ? "secondary" : "default"}
                          >
                            {product.stockLevel === "out" ? "Out of Stock" : product.stockLevel === "low" ? `Low (${product.stockCount})` : product.stockLevel === "medium" ? "Medium" : "In Stock"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
