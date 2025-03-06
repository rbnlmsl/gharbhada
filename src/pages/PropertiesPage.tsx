import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FixedSearchBar from "@/components/FixedSearchBar";
import PropertyCard from "@/components/PropertyCard";
import Footer from "@/components/Footer";
import { getFilteredProperties } from "@/lib/mockData";
import { Property, PropertyFilter } from "@/types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, RefreshCw, Filter, SlidersHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PropertiesPage = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { toast } = useToast();
  
  const propertiesPerPage = 9;
  
  const getFiltersFromParams = (): PropertyFilter => {
    const filter: PropertyFilter = {};
    
    if (searchParams.has("location")) filter.location = searchParams.get("location") || undefined;
    if (searchParams.has("minPrice")) filter.priceMin = Number(searchParams.get("minPrice")) || undefined;
    if (searchParams.has("maxPrice")) filter.priceMax = Number(searchParams.get("maxPrice")) || undefined;
    if (searchParams.has("beds")) filter.bedrooms = Number(searchParams.get("beds")) || undefined;
    if (searchParams.has("type")) filter.propertyType = searchParams.get("type") || undefined;
    if (searchParams.has("features")) filter.features = searchParams.get("features")?.split(",") || undefined;
    if (searchParams.has("availability")) filter.availability = searchParams.get("availability") || undefined;
    if (searchParams.has("sort")) filter.sortBy = searchParams.get("sort") || undefined;
    
    return filter;
  };
  
  const loadProperties = (page = 1, append = false) => {
    setLoading(true);
    setError(null);
    
    try {
      const filter = getFiltersFromParams();
      
      setTimeout(() => {
        const filteredProperties = getFilteredProperties(filter);
        setTotalResults(filteredProperties.length);
        
        const startIndex = (page - 1) * propertiesPerPage;
        const endIndex = startIndex + propertiesPerPage;
        const paginatedResults = filteredProperties.slice(startIndex, endIndex);
        
        if (append) {
          setProperties(prev => [...prev, ...paginatedResults]);
        } else {
          setProperties(paginatedResults);
        }
        
        setHasMore(endIndex < filteredProperties.length);
        setCurrentPage(page);
        setLoading(false);
      }, 800);
    } catch (err) {
      setError("Failed to load properties. Please try again.");
      toast({
        title: "Error",
        description: "Failed to load properties. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };
  
  const handleSearch = () => {
    setCurrentPage(1);
    loadProperties(1, false);
  };
  
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    loadProperties(nextPage, true);
  };
  
  useEffect(() => {
    setCurrentPage(1);
    loadProperties(1, false);
    
    if (isFiltersOpen) {
      setIsFiltersOpen(false);
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);
  
  const getSearchResultTitle = () => {
    const filter = getFiltersFromParams();
    const parts = [];
    
    if (filter.propertyType) {
      parts.push(filter.propertyType.charAt(0).toUpperCase() + filter.propertyType.slice(1) + "s");
    } else {
      parts.push("Properties");
    }
    
    if (filter.location) {
      parts.push(`in ${filter.location}`);
    }
    
    if (filter.bedrooms) {
      parts.push(`with ${filter.bedrooms}+ bedrooms`);
    }
    
    return parts.join(" ");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-brand-blue/10 py-6">
          <div className="container mx-auto px-4">
            <FixedSearchBar isExpanded onSearch={handleSearch} />
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {getSearchResultTitle()}
              </h1>
              <p className="text-gray-600">
                {totalResults} {totalResults === 1 ? "property" : "properties"} found
              </p>
            </div>
            <div className="flex mt-3 md:mt-0 space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="flex items-center"
              >
                <SlidersHorizontal size={16} className="mr-2" />
                Filters
              </Button>
              <Button
                variant="outline"
                onClick={() => loadProperties(1, false)}
                className="flex items-center"
                disabled={loading}
              >
                <RefreshCw size={16} className={cn("mr-2", loading && "animate-spin")} />
                Refresh
              </Button>
            </div>
          </div>
          
          {loading && properties.length === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <Skeleton className="h-56 w-full" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-20 w-full" />
                    <div className="flex justify-between pt-3">
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {error && !loading && (
            <div className="text-center py-12">
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-4">
                <p>{error}</p>
              </div>
              <Button 
                onClick={() => loadProperties(1, false)}
                className="flex items-center mx-auto"
              >
                <RefreshCw size={16} className="mr-2" />
                Try Again
              </Button>
            </div>
          )}
          
          {!loading && !error && properties.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-gray-100 rounded-lg p-8 max-w-lg mx-auto">
                <h3 className="text-xl font-semibold mb-3">No properties found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any properties matching your criteria. Try adjusting your filters or search in a different area.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    window.history.pushState({}, "", "/properties");
                    loadProperties(1, false);
                  }}
                  className="flex items-center mx-auto"
                >
                  <Filter size={16} className="mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
          
          {!loading && !error && properties.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
              
              {hasMore && (
                <div className="text-center mt-8">
                  <Button
                    variant="outline"
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="min-w-[200px]"
                  >
                    {loading && properties.length > 0 ? (
                      <>
                        <RefreshCw size={16} className="mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Load More Properties"
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertiesPage;

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
