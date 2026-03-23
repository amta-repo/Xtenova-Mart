import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { bestSellers, featuredProducts } from "@/data/catalog";

const FeaturedProducts = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Top picks from your approved catalog</p>
            </div>
            <Link to="/products"><Button variant="outline" className="mt-4 md:mt-0">View All<ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {featuredProducts.map((product) => <ProductCard key={product.id} {...product} />)}
          </div>
        </div>

        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Best Sellers</h2>
              <p className="text-muted-foreground">Popular items customers are adding fastest</p>
            </div>
            <Link to="/products"><Button variant="outline" className="mt-4 md:mt-0">View All Best Sellers<ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => <ProductCard key={product.id} {...product} />)}
          </div>
        </div>

        <div className="mt-16 p-8 bg-muted rounded-2xl text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Trusted by Everyday Shoppers</h3>
            <p className="text-muted-foreground mb-6">"Fast delivery, dependable gadgets, and a checkout flow that works well on mobile."</p>
            <div className="flex items-center justify-center gap-2 mb-4">{[...Array(5)].map((_, i) => <span key={i} className="text-rating-star text-xl">★</span>)}<span className="ml-2 font-semibold">4.8/5</span></div>
            <p className="text-sm text-muted-foreground">Based on verified customer feedback and repeat orders</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
