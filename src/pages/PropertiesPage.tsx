import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase, typedSupabaseQuery } from "@/integrations/supabase/client";
import { PropertyRow } from "@/types/property-types";
import Navbar from "@/components/Navbar";
import FixedSearchBar from "@/components/FixedSearchBar";
import PropertyCard from "@/components/PropertyCard";
import Footer from "@/components/Footer";
import { Property, PropertyFilter } from "@/types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, RefreshCw, Filter, SlidersHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Fallback to mock data if needed
import { getFilteredProperties } from "@/lib/mockData";

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
  
  // Get filter values from URL
  const locationFilter = searchParams.get("location") || "";
  const propertyTypeFilter = searchParams.get("type") || "";
  const bedsFilter = searchParams.get("beds") || "";
  const bathsFilter = searchParams.get("baths") || "";
  const minPriceFilter = searchParams.get("minPrice") || "";
  const maxPriceFilter = searchParams.get("maxPrice") || "";

  // Format filter object
  const filters: PropertyFilter = {
    location: locationFilter,
    propertyType: propertyTypeFilter,
    bedrooms: bedsFilter ? parseInt(bedsFilter) : undefined,
    bathrooms: bathsFilter ? parseInt(bathsFilter) : undefined,
    priceMin: minPriceFilter ? parseInt(minPriceFilter) : undefined,
    priceMax: maxPriceFilter ? parseInt(maxPriceFilter) : undefined,
  };

  const loadProperties = async (page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      // Start with Supabase query
      let query = typedSupabaseQuery<PropertyRow>("properties")
        .select('*', { count: 'exact' })
        .eq('published', true);
      
      // Apply filters
      if (filters.propertyType) {
        query = query.eq('type', filters.propertyType);
      }
      
      if (filters.location) {
        query = query.ilike('city', `%${filters.location}%`);
      }
      
      if (filters.priceMin) {
        query = query.gte('price', filters.priceMin);
      }
      
      if (filters.priceMax) {
        query = query.lte('price', filters.priceMax);
      }
      
      if (filters.bedrooms) {
        query = query.gte('bedrooms', filters.bedrooms);
      }
      
      if (filters.bathrooms) {
        query = query.gte('bathrooms', filters.bathrooms);
      }
      
      // Calculate pagination
      const from = (page - 1) * propertiesPerPage;
      const to = from + propertiesPerPage - 1;
      
      // Execute query with pagination
      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range(from, to);
      
      if (error) {
        throw error;
      }

      // If we got data from Supabase, process it
      if (data && data.length > 0) {
        // Map Supabase data to our Property type
        const formattedProperties: Property[] = data.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          price: item.price,
          currency: item.currency,
          address: item.address,
          city: item.city,
          zipCode: item.zip_code,
          country: item.country,
          type: item.type,
          bedrooms: item.bedrooms,
          bathrooms: item.bathrooms,
          area: item.area,
          areaUnit: item.area_unit,
          features: item.features,
          images: item.images,
          agent: {
            id: item.agent_id,
            name: "Property Owner", // This should be fetched from profiles
            email: "contact@example.com", // This should be fetched from profiles
            phone: "+1234567890", // This should be fetched from profiles
          },
          published: item.published,
          createdAt: item.created_at,
          updatedAt: item.updated_at
        }));

        if (page === 1) {
          setProperties(formattedProperties);
        } else {
          setProperties(prev => [...prev, ...formattedProperties]);
        }
        
        // Set total count and check if we have more
        setTotalResults(count || 0);
        setHasMore((count || 0) > to + 1);
      } else {
        // Fallback to mock data if no Supabase results
        console.log("No Supabase results, using mock data");
        
        const mockFiltered = getFilteredProperties(filters);
        const paginatedResults = mockFiltered.slice(
          (page - 1) * propertiesPerPage,
          page * propertiesPerPage
        );
        
        if (page === 1) {
          setProperties(paginatedResults);
        } else {
          setProperties(prev => [...prev, ...paginatedResults]);
        }
        
        setTotalResults(mockFiltered.length);
        setHasMore(mockFiltered.length > page * propertiesPerPage);
      }
      
      setCurrentPage(page);
    } catch (err: any) {
      console.error("Error loading properties:", err);
      setError(err.message || "An error occurred while loading properties");
      
      // Fallback to mock data on error
      const mockFiltered = getFilteredProperties(filters);
      const paginatedResults = mockFiltered.slice(
        (page - 1) * propertiesPerPage,
        page * propertiesPerPage
      );
      
      if (page === 1) {
        setProperties(paginatedResults);
      } else {
        setProperties(prev => [...prev, ...paginatedResults]);
      }
      
      setTotalResults(mockFiltered.length);
      setHasMore(mockFiltered.length > page * propertiesPerPage);
    } finally {
      setLoading(false);
    }
  };

  // Load properties on mount and when filters change
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
    loadProperties(1);
  }, [
    locationFilter, 
    propertyTypeFilter, 
    bedsFilter, 
    bathsFilter, 
    minPriceFilter, 
    maxPriceFilter
  ]);

  // Handle "Load More" click
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadProperties(currentPage + 1);
    }
  };

  // Toggle filters visibility on mobile
  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Property</h1>
          <p className="text-gray-600">Search and filter properties to find the perfect match for your needs.</p>
        </div>
        
        {/* Search/Filter Bar */}
        <div className="mb-8">
          <FixedSearchBar isExpanded={isFiltersOpen} />
          
          {/* Mobile filters toggle */}
          <div className="md:hidden mt-3 flex justify-center">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-sm"
              onClick={toggleFilters}
            >
              <Filter size={14} className="mr-1" />
              {isFiltersOpen ? "Less Filters" : "More Filters"}
            </Button>
          </div>
        </div>
        
        {/* Active filters summary */}
        {(locationFilter || propertyTypeFilter || bedsFilter || bathsFilter || minPriceFilter || maxPriceFilter) && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-gray-600 font-medium flex items-center">
              <SlidersHorizontal size={16} className="mr-1" />
              Filters:
            </span>
            
            {locationFilter && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 flex items-center">
                <MapPin size={14} className="mr-1" />
                {locationFilter}
              </span>
            )}
            
            {propertyTypeFilter && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                Type: {propertyTypeFilter.charAt(0).toUpperCase() + propertyTypeFilter.slice(1)}
              </span>
            )}
            
            {bedsFilter && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                {bedsFilter}+ Beds
              </span>
            )}
            
            {bathsFilter && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                {bathsFilter}+ Baths
              </span>
            )}
            
            {minPriceFilter && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                Min: ${parseInt(minPriceFilter).toLocaleString()}
              </span>
            )}
            
            {maxPriceFilter && (
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                Max: ${parseInt(maxPriceFilter).toLocaleString()}
              </span>
            )}
          </div>
        )}
        
        {/* Properties count */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {totalResults} {totalResults === 1 ? 'Property' : 'Properties'} found
          </h2>
        </div>
        
        {/* Properties Grid */}
        {loading && properties.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <Skeleton className="aspect-[4/3] w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-12 w-full" />
                  <div className="pt-3 border-t border-gray-100 flex justify-between">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button 
              variant="outline" 
              onClick={() => loadProperties(1)}
              className="flex items-center mx-auto"
            >
              <RefreshCw size={16} className="mr-2" />
              Try Again
            </Button>
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any properties matching your search criteria. Try adjusting your filters or search for something else.
            </p>
            <Button onClick={() => window.location.href = '/properties'}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            
            {/* Load More button */}
            {hasMore && (
              <div className="mt-8 text-center">
                <Button 
                  onClick={handleLoadMore} 
                  disabled={loading}
                  variant="outline"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <RefreshCw size={16} className="mr-2 animate-spin" />
                      Loading...
                    </span>
                  ) : (
                    "Load More Properties"
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default PropertiesPage;
