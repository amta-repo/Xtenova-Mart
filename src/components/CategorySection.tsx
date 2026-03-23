import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { categoryCards } from "@/data/catalog";

const CategorySection = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Only the product lines you selected are displayed here: mobile accessories, smart tech, and solar power.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryCards.map((category) => (
            <Card key={category.id} className={`group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${category.featured ? "md:col-span-2 md:row-span-1" : ""}`}>
              <Link to={category.href}>
                <div className="relative overflow-hidden">
                  <img src={category.image} alt={category.name} className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${category.featured ? "h-72" : "h-64"}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className={`font-bold mb-2 ${category.featured ? "text-2xl" : "text-xl"}`}>{category.name}</h3>
                    <p className="text-white/90 mb-4">{category.description}</p>
                    <Button variant="secondary" className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm">Shop Now<ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t">
          {[
            { value: "15+", label: "Live Products" },
            { value: "3", label: "Core Categories" },
            { value: "24h", label: "Order Review" },
            { value: "MTN", label: "MoMo Checkout" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
