
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, Home, Search, User, MapPin } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? 
          "bg-white/90 backdrop-blur-md shadow-sm py-3" : 
          "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-all duration-300"
        >
          <div className="relative">
            <div className="h-8 w-8 bg-brand-blue rounded-md flex items-center justify-center">
              <Home size={16} className="text-white" />
            </div>
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-brand-crimson rounded-full"></div>
          </div>
          <span className={cn(
            "text-xl font-bold transition-all duration-300",
            isScrolled ? "text-brand-blue" : "text-white"
          )}>
            gharbhada
            <span className="text-brand-crimson">.com.np</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={cn(
              "flex items-center space-x-1 font-medium hover:text-brand-crimson transition-colors",
              isScrolled ? "text-gray-700" : "text-white"
            )}
          >
            <Home size={16} />
            <span>Home</span>
          </Link>
          <Link 
            to="/properties" 
            className={cn(
              "flex items-center space-x-1 font-medium hover:text-brand-crimson transition-colors",
              isScrolled ? "text-gray-700" : "text-white"
            )}
          >
            <Search size={16} />
            <span>Properties</span>
          </Link>
          <Link 
            to="/locations" 
            className={cn(
              "flex items-center space-x-1 font-medium hover:text-brand-crimson transition-colors",
              isScrolled ? "text-gray-700" : "text-white"
            )}
          >
            <MapPin size={16} />
            <span>Locations</span>
          </Link>
          <Link 
            to="/account" 
            className={cn(
              "flex items-center space-x-1 font-medium hover:text-brand-crimson transition-colors",
              isScrolled ? "text-gray-700" : "text-white"
            )}
          >
            <User size={16} />
            <span>Account</span>
          </Link>
          <button 
            className="bg-brand-crimson text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
          >
            Post Property
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center text-gray-700" 
          onClick={toggleMenu}
        >
          {isOpen ? (
            <X size={24} className={isScrolled ? "text-gray-700" : "text-white"} />
          ) : (
            <Menu size={24} className={isScrolled ? "text-gray-700" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed top-0 left-0 w-full h-screen bg-white transition-all duration-300 ease-in-out transform z-40",
          isOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="container mx-auto px-4 py-5 h-full flex flex-col">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
              <div className="relative">
                <div className="h-8 w-8 bg-brand-blue rounded-md flex items-center justify-center">
                  <Home size={16} className="text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-brand-crimson rounded-full"></div>
              </div>
              <span className="text-xl font-bold text-brand-blue">
                gharbhada
                <span className="text-brand-crimson">.com.np</span>
              </span>
            </Link>
            <button onClick={toggleMenu}>
              <X size={24} className="text-gray-700" />
            </button>
          </div>
          <div className="flex flex-col space-y-6 mt-12 items-center">
            <Link 
              to="/" 
              className="text-xl font-medium text-gray-700 hover:text-brand-crimson flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link 
              to="/properties" 
              className="text-xl font-medium text-gray-700 hover:text-brand-crimson flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <Search size={20} />
              <span>Properties</span>
            </Link>
            <Link 
              to="/locations" 
              className="text-xl font-medium text-gray-700 hover:text-brand-crimson flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <MapPin size={20} />
              <span>Locations</span>
            </Link>
            <Link 
              to="/account" 
              className="text-xl font-medium text-gray-700 hover:text-brand-crimson flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <User size={20} />
              <span>Account</span>
            </Link>
            <button 
              className="bg-brand-crimson text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity text-xl"
            >
              Post Property
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
