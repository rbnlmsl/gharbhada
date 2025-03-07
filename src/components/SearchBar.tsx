
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin } from "lucide-react";

const SearchBar = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("any");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params: Record<string, string> = {};
    if (location) params.location = location;
    if (propertyType && propertyType !== "any") params.type = propertyType;
    
    const queryString = new URLSearchParams(params).toString();
    navigate(`/properties${queryString ? `?${queryString}` : ''}`);
  };
  
  return (
    <form onSubmit={handleSearch} className="relative flex flex-col md:flex-row gap-2 w-full backdrop-blur-sm bg-white/10 p-2 rounded-lg">
      <div className="relative flex-grow">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white">
          <MapPin size={18} />
        </div>
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Where do you want to live?"
          className="pl-10 h-12 bg-white/20 border-white/30 text-white placeholder:text-white/70"
        />
      </div>
      
      <div className="min-w-[160px]">
        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger className="h-12 bg-white/20 border-white/30 text-white">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Type</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="condo">Condo</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button type="submit" className="h-12 px-6 bg-brand-crimson hover:bg-brand-crimson/90 text-white">
        <Search className="mr-2 h-4 w-4" />
        <span>Search</span>
      </Button>
    </form>
  );
};

export default SearchBar;
