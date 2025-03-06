
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, Home, BedDouble, DollarSign, Map, Calendar, Filter, X } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  isExpanded?: boolean;
  onSearch?: (params: Record<string, string>) => void;
}

const SearchBar = ({ className, isExpanded = false, onSearch }: SearchBarProps) => {
  const navigate = useNavigate();
  const [searchParams, getCurrentSearchParams] = useSearchParams();
  
  // Initialize state from URL if available, otherwise use defaults
  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    propertyType: searchParams.get("type") || "",
    minBedrooms: searchParams.get("beds") || "",
    priceRange: searchParams.get("minPrice") && searchParams.get("maxPrice") 
      ? `${searchParams.get("minPrice")}-${searchParams.get("maxPrice")}` 
      : searchParams.get("minPrice") 
        ? `${searchParams.get("minPrice")}-0` 
        : "",
    availability: searchParams.get("availability") || "",
    features: searchParams.has("features") 
      ? searchParams.get("features")!.split(",") 
      : [],
    sortBy: searchParams.get("sort") || "newest"
  });
  
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [priceRangeValues, setPriceRangeValues] = useState<number[]>([0, 100000]);
  
  // Update price slider when priceRange filter changes
  useEffect(() => {
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      // Only update slider if values are valid numbers
      if (!isNaN(min) && (max === 0 || !isNaN(max))) {
        setPriceRangeValues([min, max === 0 ? 100000 : max]);
      }
    }
  }, [filters.priceRange]);

  const propertyTypes = [
    { value: "", label: "Any Type" },
    { value: "apartment", label: "Apartment" },
    { value: "house", label: "House" },
    { value: "condo", label: "Condo" },
    { value: "villa", label: "Villa" },
    { value: "office", label: "Office" }
  ];

  const bedroomOptions = [
    { value: "", label: "Any" },
    { value: "1", label: "1+" },
    { value: "2", label: "2+" },
    { value: "3", label: "3+" },
    { value: "4", label: "4+" }
  ];

  const priceRanges = [
    { value: "", label: "Any Price" },
    { value: "0-20000", label: "Up to 20,000" },
    { value: "20000-40000", label: "20,000 - 40,000" },
    { value: "40000-60000", label: "40,000 - 60,000" },
    { value: "60000-100000", label: "60,000 - 100,000" },
    { value: "100000-0", label: "Above 100,000" }
  ];
  
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "bedrooms_desc", label: "Most Bedrooms" }
  ];
  
  const availabilityOptions = [
    { value: "", label: "Any Time" },
    { value: "immediate", label: "Immediate" },
    { value: "within_week", label: "Within a Week" },
    { value: "within_month", label: "Within a Month" }
  ];
  
  const featureOptions = [
    { value: "parking", label: "Parking" },
    { value: "garden", label: "Garden/Balcony" },
    { value: "furnished", label: "Furnished" },
    { value: "pets", label: "Pet Friendly" },
    { value: "ac", label: "Air Conditioning" },
    { value: "elevator", label: "Elevator" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFeatureToggle = (feature: string) => {
    setFilters(prev => {
      const currentFeatures = [...prev.features];
      const index = currentFeatures.indexOf(feature);
      
      if (index >= 0) {
        currentFeatures.splice(index, 1);
      } else {
        currentFeatures.push(feature);
      }
      
      return {
        ...prev,
        features: currentFeatures
      };
    });
  };
  
  const handlePriceRangeChange = (values: number[]) => {
    setPriceRangeValues(values);
    
    // Convert to string format for the filters state
    const min = values[0];
    const max = values[1];
    
    // If max is at the maximum value, store as "min-0" to represent "min and above"
    const rangeString = max === 100000 ? `${min}-0` : `${min}-${max}`;
    
    setFilters(prev => ({
      ...prev,
      priceRange: rangeString
    }));
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const queryParams = new URLSearchParams();
    
    // Add basic filters
    if (filters.location) queryParams.append("location", filters.location);
    if (filters.propertyType) queryParams.append("type", filters.propertyType);
    if (filters.minBedrooms) queryParams.append("beds", filters.minBedrooms);
    
    // Handle price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-");
      if (min) queryParams.append("minPrice", min);
      if (max && max !== "0") queryParams.append("maxPrice", max);
    }
    
    // Add advanced filters
    if (filters.availability) queryParams.append("availability", filters.availability);
    if (filters.features.length > 0) queryParams.append("features", filters.features.join(","));
    if (filters.sortBy) queryParams.append("sort", filters.sortBy);
    
    // Either call the onSearch callback or navigate to properties page
    if (onSearch) {
      onSearch(Object.fromEntries(queryParams.entries()));
    } else {
      navigate({
        pathname: "/properties",
        search: queryParams.toString()
      });
    }
  };
  
  const clearAllFilters = () => {
    setFilters({
      location: "",
      propertyType: "",
      minBedrooms: "",
      priceRange: "",
      availability: "",
      features: [],
      sortBy: "newest"
    });
    setPriceRangeValues([0, 100000]);
  };
  
  const filterCount = [
    filters.propertyType,
    filters.minBedrooms,
    filters.priceRange,
    filters.availability,
    ...(filters.features.length > 0 ? [true] : [])
  ].filter(Boolean).length;

  return (
    <div className={cn(
      "w-full glass-effect rounded-xl p-2 lg:p-4",
      isExpanded ? "bg-white shadow-md" : "",
      className
    )}>
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {/* Location Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleInputChange}
            placeholder="Location"
            className="w-full pl-10 pr-4 py-3 h-auto rounded-lg bg-white/50 border-0 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
          />
        </div>
        
        {/* Property Type Dropdown */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Home className="h-5 w-5 text-gray-400" />
          </div>
          <Select
            name="propertyType"
            value={filters.propertyType}
            onValueChange={(value) => setFilters(prev => ({ ...prev, propertyType: value }))}
          >
            <SelectTrigger className="w-full pl-10 h-[50px] border-0 rounded-lg bg-white/50 focus:ring-2 focus:ring-brand-blue">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Bedrooms Dropdown */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <BedDouble className="h-5 w-5 text-gray-400" />
          </div>
          <Select
            name="minBedrooms"
            value={filters.minBedrooms}
            onValueChange={(value) => setFilters(prev => ({ ...prev, minBedrooms: value }))}
          >
            <SelectTrigger className="w-full pl-10 h-[50px] border-0 rounded-lg bg-white/50 focus:ring-2 focus:ring-brand-blue">
              <SelectValue placeholder="Bedrooms" />
            </SelectTrigger>
            <SelectContent>
              {bedroomOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label} Bedrooms
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Price Range with Advanced Filters Toggle */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <Select
            name="priceRange"
            value={filters.priceRange}
            onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
          >
            <SelectTrigger className="w-full pl-10 h-[50px] border-0 rounded-lg bg-white/50 focus:ring-2 focus:ring-brand-blue">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map(range => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* More Filters Button & Search Button */}
          <div className="absolute right-0 inset-y-0 flex">
            {isExpanded && (
              <Popover open={showMoreFilters} onOpenChange={setShowMoreFilters}>
                <PopoverTrigger asChild>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    className={cn(
                      "mr-2 px-3 h-[50px] border-0 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-brand-blue",
                      filterCount > 0 ? "text-brand-blue font-medium" : "text-gray-500"
                    )}
                  >
                    <Filter size={18} className="mr-1" />
                    <span>Filters</span>
                    {filterCount > 0 && (
                      <span className="ml-1 rounded-full bg-brand-blue text-white text-xs px-2 py-1">
                        {filterCount}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" align="end">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Advanced Filters</h3>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearAllFilters}
                        className="h-auto py-1 px-2 text-xs text-gray-500"
                      >
                        <X size={14} className="mr-1" />
                        Clear all
                      </Button>
                    </div>
                    
                    {/* Price Range Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Price Range</Label>
                        <span className="text-sm text-gray-500">
                          NPR {priceRangeValues[0].toLocaleString()} - {priceRangeValues[1] === 100000 ? "Any" : `NPR ${priceRangeValues[1].toLocaleString()}`}
                        </span>
                      </div>
                      <Slider
                        min={0}
                        max={100000}
                        step={5000}
                        value={priceRangeValues}
                        onValueChange={handlePriceRangeChange}
                        className="py-4"
                      />
                    </div>
                    
                    {/* Availability */}
                    <div className="space-y-2">
                      <Label>Availability</Label>
                      <Select
                        value={filters.availability}
                        onValueChange={(value) => setFilters(prev => ({ ...prev, availability: value }))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent>
                          {availabilityOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Sort Options */}
                    <div className="space-y-2">
                      <Label>Sort Results By</Label>
                      <Select
                        value={filters.sortBy}
                        onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          {sortOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Property Features */}
                    <div className="space-y-2">
                      <Label>Features</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {featureOptions.map(feature => (
                          <Button
                            key={feature.value}
                            type="button"
                            variant={filters.features.includes(feature.value) ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleFeatureToggle(feature.value)}
                            className="justify-start h-auto py-1"
                          >
                            {filters.features.includes(feature.value) && (
                              <span className="mr-1">✓</span>
                            )}
                            {feature.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      type="button" 
                      onClick={() => {
                        setShowMoreFilters(false);
                        handleSearch();
                      }}
                      className="w-full"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
            <Button
              type="submit"
              className={cn(
                "bg-brand-crimson text-white font-medium rounded-r-lg hover:bg-brand-crimson/90 transition-colors",
                isExpanded ? "px-4 h-[50px]" : "absolute right-0 inset-y-0 px-4"
              )}
            >
              {isExpanded ? "Search Properties" : "Search"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
