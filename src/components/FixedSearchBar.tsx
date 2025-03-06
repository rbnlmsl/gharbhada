
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/";
import { Search, MapPin, Home, BedDouble, Bath, Sliders } from "lucide-react";

interface SearchBarProps {
  isExpanded?: boolean;
  onSearch?: (searchParams: Record<string, string>) => void;
}

const FixedSearchBar = ({ isExpanded = false, onSearch }: SearchBarProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [propertyType, setPropertyType] = useState(searchParams.get("type") || "any");
  const [bedrooms, setBedrooms] = useState(searchParams.get("beds") || "any");
  const [bathrooms, setBathrooms] = useState(searchParams.get("baths") || "any");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build search params object
    const params: Record<string, string> = {};
    if (location) params.location = location;
    if (propertyType && propertyType !== "any") params.type = propertyType;
    if (bedrooms && bedrooms !== "any") params.beds = bedrooms;
    if (bathrooms && bathrooms !== "any") params.baths = bathrooms;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    
    // Call onSearch callback if provided
    if (onSearch) {
      onSearch(params);
    } else {
      // Navigate to properties page with search params
      const queryString = new URLSearchParams(params).toString();
      navigate(`/properties${queryString ? `?${queryString}` : ''}`);
    }
  };
  
  return (
    <form onSubmit={handleSearch} className={`bg-white rounded-lg shadow-md ${isExpanded ? 'p-6' : 'p-4'}`}>
      <div className={`grid gap-4 ${isExpanded ? 'md:grid-cols-3 lg:grid-cols-6' : 'grid-cols-1 md:grid-cols-5'}`}>
        {/* Location input */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <MapPin size={18} />
          </div>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="pl-10"
          />
        </div>
        
        {/* Property Type Select */}
        <div>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="h-10">
              <div className="flex items-center">
                <Home size={18} className="mr-2 text-gray-500" />
                <SelectValue placeholder="Property Type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Type</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="office">Office</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Bedrooms Select */}
        <div>
          <Select value={bedrooms} onValueChange={setBedrooms}>
            <SelectTrigger className="h-10">
              <div className="flex items-center">
                <BedDouble size={18} className="mr-2 text-gray-500" />
                <SelectValue placeholder="Bedrooms" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Beds</SelectItem>
              <SelectItem value="1">1+ Bedroom</SelectItem>
              <SelectItem value="2">2+ Bedrooms</SelectItem>
              <SelectItem value="3">3+ Bedrooms</SelectItem>
              <SelectItem value="4">4+ Bedrooms</SelectItem>
              <SelectItem value="5">5+ Bedrooms</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Bathrooms Select */}
        <div>
          <Select value={bathrooms} onValueChange={setBathrooms}>
            <SelectTrigger className="h-10">
              <div className="flex items-center">
                <Bath size={18} className="mr-2 text-gray-500" />
                <SelectValue placeholder="Bathrooms" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Baths</SelectItem>
              <SelectItem value="1">1+ Bathroom</SelectItem>
              <SelectItem value="2">2+ Bathrooms</SelectItem>
              <SelectItem value="3">3+ Bathrooms</SelectItem>
              <SelectItem value="4">4+ Bathrooms</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Price Range */}
        {isExpanded && (
          <>
            <div>
              <Input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min Price"
                className="h-10"
              />
            </div>
            <div>
              <Input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max Price"
                className="h-10"
              />
            </div>
          </>
        )}
        
        {/* Search Button */}
        <div className={isExpanded ? "md:col-span-3 lg:col-span-1" : ""}>
          <Button type="submit" className="w-full">
            <Search size={18} className="mr-2" />
            Search
          </Button>
        </div>
      </div>
      
      {!isExpanded && (
        <div className="mt-3 flex justify-center md:hidden">
          <Button variant="outline" size="sm" className="text-sm">
            <Sliders size={14} className="mr-1" />
            More Filters
          </Button>
        </div>
      )}
    </form>
  );
};

export default FixedSearchBar;
