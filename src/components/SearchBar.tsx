
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Home, BedDouble, DollarSign } from "lucide-react";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    location: "",
    propertyType: "",
    minBedrooms: "",
    priceRange: ""
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const queryParams = new URLSearchParams();
    
    if (searchParams.location) {
      queryParams.append("location", searchParams.location);
    }
    
    if (searchParams.propertyType) {
      queryParams.append("type", searchParams.propertyType);
    }
    
    if (searchParams.minBedrooms) {
      queryParams.append("beds", searchParams.minBedrooms);
    }
    
    if (searchParams.priceRange) {
      const [min, max] = searchParams.priceRange.split("-");
      if (min) queryParams.append("minPrice", min);
      if (max && max !== "0") queryParams.append("maxPrice", max);
    }
    
    navigate({
      pathname: "/properties",
      search: queryParams.toString()
    });
  };

  return (
    <div className="w-full glass-effect rounded-xl p-2 lg:p-4">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="location"
            value={searchParams.location}
            onChange={handleInputChange}
            placeholder="Location"
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/50 border-0 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Home className="h-5 w-5 text-gray-400" />
          </div>
          <select
            name="propertyType"
            value={searchParams.propertyType}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/50 border-0 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all appearance-none"
          >
            {propertyTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <BedDouble className="h-5 w-5 text-gray-400" />
          </div>
          <select
            name="minBedrooms"
            value={searchParams.minBedrooms}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/50 border-0 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all appearance-none"
          >
            {bedroomOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} Bedrooms
              </option>
            ))}
          </select>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <select
            name="priceRange"
            value={searchParams.priceRange}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/50 border-0 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all appearance-none"
          >
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="absolute right-0 inset-y-0 px-4 bg-brand-crimson text-white font-medium rounded-r-lg hover:bg-brand-crimson/90 transition-colors"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
