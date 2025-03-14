
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FixedSearchBar from "@/components/FixedSearchBar";
import PropertyCard from "@/components/PropertyCard";
import Footer from "@/components/Footer";
import { properties } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const [filteredProperties, setFilteredProperties] = useState(properties);

  const handleSearch = (searchParams: Record<string, string>) => {
    console.log("Search params:", searchParams);
    // In a real app, this would filter properties based on search params
    // For now, we'll just use the mock data
    setFilteredProperties(properties);
    
    // Navigate to properties page with search params
    const queryString = new URLSearchParams(searchParams).toString();
    window.location.href = `/properties${queryString ? `?${queryString}` : ''}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <div className="container mx-auto px-4 py-8">
          <FixedSearchBar onSearch={handleSearch} />
          
          <section className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Featured Properties</h2>
              <Button variant="outline" className="text-brand-blue">
                <Link to="/properties">View All Properties</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.slice(0, 6).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </section>
          
          <section className="mt-16 mb-12">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Are you a property owner?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                List your property on gharbhada.com.np and connect with thousands of potential tenants looking for their next home.
              </p>
              <Button className="bg-brand-crimson hover:bg-brand-crimson/90">
                <Link to="/post-property">List Your Property</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
