import { useState } from "react";
import { useParams } from "react-router-dom";
import { Filter, SlidersHorizontal, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

// Mock products data by category
const allProducts = {
  clothing: [
    {
      id: "c1",
      name: "Premium Cotton T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      rating: 4.7,
      reviewCount: 234,
      isOnSale: true,
      stockLevel: "high" as const,
      category: "Clothing",
      brand: "StyleCo",
    },
    {
      id: "c2",
      name: "Elegant Summer Dress",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
      rating: 4.9,
      reviewCount: 187,
      isNew: true,
      stockLevel: "medium" as const,
      category: "Clothing",
      brand: "FashionForward",
    },
    {
      id: "c3",
      name: "Classic Denim Jacket",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
      rating: 4.6,
      reviewCount: 156,
      stockLevel: "high" as const,
      category: "Clothing",
      brand: "StyleCo",
    },
    {
      id: "c4",
      name: "Formal Business Suit",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      rating: 4.8,
      reviewCount: 92,
      isOnSale: true,
      stockLevel: "low" as const,
      stockCount: 5,
      category: "Clothing",
      brand: "FashionForward",
    },
  ],
  shoes: [
    {
      id: "s1",
      name: "Athletic Running Shoes",
      price: 129.99,
      originalPrice: 159.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      rating: 4.8,
      reviewCount: 412,
      isOnSale: true,
      stockLevel: "high" as const,
      category: "Shoes",
      brand: "SportMax",
    },
    {
      id: "s2",
      name: "Elegant High Heels",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
      rating: 4.5,
      reviewCount: 167,
      stockLevel: "medium" as const,
      category: "Shoes",
      brand: "GlamStyle",
    },
    {
      id: "s3",
      name: "Casual Sneakers",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      rating: 4.7,
      reviewCount: 298,
      isNew: true,
      stockLevel: "high" as const,
      category: "Shoes",
      brand: "ComfortWalk",
    },
    {
      id: "s4",
      name: "Formal Leather Boots",
      price: 179.99,
      image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=400&fit=crop",
      rating: 4.6,
      reviewCount: 134,
      stockLevel: "medium" as const,
      category: "Shoes",
      brand: "LeatherCraft",
    },
  ],
  gadgets: [
    {
      id: "g1",
      name: "Wireless Bluetooth Headphones",
      price: 129.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      rating: 4.8,
      reviewCount: 324,
      isOnSale: true,
      stockLevel: "high" as const,
      category: "Gadgets",
      brand: "TechPro",
    },
    {
      id: "g2",
      name: "Smart Fitness Watch",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      rating: 4.9,
      reviewCount: 567,
      isNew: true,
      stockLevel: "medium" as const,
      category: "Gadgets",
      brand: "FitTech",
    },
    {
      id: "g3",
      name: "Portable Phone Charger",
      price: 39.99,
      originalPrice: 49.99,
      image: "https://images.unsplash.com/photo-1609592992071-8942600a8f88?w=400&h=400&fit=crop",
      rating: 4.6,
      reviewCount: 189,
      isOnSale: true,
      stockLevel: "high" as const,
      category: "Gadgets",
      brand: "PowerMax",
    },
    {
      id: "g4",
      name: "Wireless Gaming Mouse",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
      rating: 4.7,
      reviewCount: 245,
      stockLevel: "high" as const,
      category: "Gadgets",
      brand: "GameTech",
    },
  ],
  cosmetics: [
    {
      id: "co1",
      name: "Premium Skincare Set",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
      rating: 4.9,
      reviewCount: 156,
      isNew: true,
      stockLevel: "low" as const,
      stockCount: 3,
      category: "Cosmetics",
      brand: "GlowBeauty",
    },
    {
      id: "co2",
      name: "Luxury Lipstick Collection",
      price: 49.99,
      originalPrice: 69.99,
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
      rating: 4.8,
      reviewCount: 234,
      isOnSale: true,
      stockLevel: "medium" as const,
      category: "Cosmetics",
      brand: "LuxeBeauty",
    },
    {
      id: "co3",
      name: "Professional Makeup Brush Set",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop",
      rating: 4.7,
      reviewCount: 187,
      stockLevel: "high" as const,
      category: "Cosmetics",
      brand: "ProMakeup",
    },
    {
      id: "co4",
      name: "Anti-Aging Serum",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
      rating: 4.9,
      reviewCount: 298,
      isNew: true,
      stockLevel: "medium" as const,
      category: "Cosmetics",
      brand: "SkinCare+",
    },
  ],
};

const categoryInfo = {
  clothing: {
    title: "Clothing Collection",
    description: "Discover our premium fashion collection for every occasion",
  },
  shoes: {
    title: "Footwear Collection", 
    description: "Step out in style with our curated shoe collection",
  },
  gadgets: {
    title: "Tech & Gadgets",
    description: "Latest technology and innovative gadgets for modern life",
  },
  cosmetics: {
    title: "Beauty & Cosmetics",
    description: "Premium beauty products for your skincare and makeup needs",
  },
  sale: {
    title: "Sale Items",
    description: "Amazing deals and discounts on your favorite products",
  },
};

const ProductListing = () => {
  const { category } = useParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Get products based on category
  const getProducts = () => {
    if (category === "sale") {
      // Return sale items from all categories
      return Object.values(allProducts).flat().filter(product => product.isOnSale);
    }
    if (category && allProducts[category as keyof typeof allProducts]) {
      return allProducts[category as keyof typeof allProducts];
    }
    // Return all products if no category or invalid category
    return Object.values(allProducts).flat();
  };

  const products = getProducts();
  const currentCategoryInfo = categoryInfo[category as keyof typeof categoryInfo] || {
    title: "All Products",
    description: "Discover our complete collection",
  };

  const categories = ["Clothing", "Beauty", "Shoes", "Gadgets"];
  const brands = ["TechPro", "GlowBeauty", "StyleCo", "FashionForward", "SportMax", "FitTech", "PowerMax", "GameTech", "LuxeBeauty", "ProMakeup", "SkinCare+", "GlamStyle", "ComfortWalk", "LeatherCraft"];

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(prev => 
      checked 
        ? [...prev, category]
        : prev.filter(c => c !== category)
    );
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    setSelectedBrands(prev => 
      checked 
        ? [...prev, brand]
        : prev.filter(b => b !== brand)
    );
  };

  const FilterSidebar = () => (
    <div className="w-full space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={500}
          step={10}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <Separator />

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => 
                  handleCategoryChange(category, checked as boolean)
                }
              />
              <label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Brands */}
      <div>
        <h3 className="font-semibold mb-3">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => 
                  handleBrandChange(brand, checked as boolean)
                }
              />
              <label htmlFor={brand} className="text-sm cursor-pointer">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Rating Filter */}
      <div>
        <h3 className="font-semibold mb-3">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox id={`rating-${rating}`} />
              <label htmlFor={`rating-${rating}`} className="flex items-center text-sm cursor-pointer">
                <span className="flex mr-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${
                        i < rating ? "text-rating-star" : "text-muted-foreground"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </span>
                & up
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>{category ? category.charAt(0).toUpperCase() + category.slice(1) : "Products"}</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{currentCategoryInfo.title}</h1>
            <p className="text-muted-foreground">{currentCategoryInfo.description}</p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {/* Search */}
            <Input
              type="search"
              placeholder="Search products..."
              className="w-64"
            />
            
            {/* Sort */}
            <Select defaultValue="popularity">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex rounded-lg border">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-8">
              <h2 className="font-semibold text-lg mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h2>
              <FilterSidebar />
            </div>
          </aside>

          {/* Mobile Filters */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="mb-6">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-muted-foreground">
              Showing 1-{products.length} of {products.length} products
            </div>
            
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "grid-cols-1"
            }`}>
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Products
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductListing;