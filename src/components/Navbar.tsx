import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X, User, LogOut, Home, Search, PlusCircle } from "lucide-react";

const Navbar = () => {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile, isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const isLandlordOrAgent = userProfile && (userProfile.role === 'landlord' || userProfile.role === 'agent');

  const NavLinks = () => (
    <>
      <Link to="/" className="font-medium text-gray-700 hover:text-brand-blue transition-colors">Home</Link>
      <Link to="/properties" className="font-medium text-gray-700 hover:text-brand-blue transition-colors">Properties</Link>
      {isLandlordOrAgent && (
        <Link to="/property/upload" className="font-medium text-gray-700 hover:text-brand-blue transition-colors flex items-center">
          <PlusCircle size={16} className="mr-1" />
          List Property
        </Link>
      )}
    </>
  );

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all ${
        scrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container px-4 mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Home className="text-brand-blue w-6 h-6" />
          <span className="font-bold text-xl text-gray-900">RentEase</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
        </nav>

        <div className="flex items-center">
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/properties">
              <Button variant="outline" size="sm" className="flex items-center">
                <Search size={16} className="mr-1" />
                Find Properties
              </Button>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-3">
                {isLandlordOrAgent && (
                  <Link to="/property/upload">
                    <Button variant="outline" size="sm">
                      List Property
                    </Button>
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate('/profile')}
                  >
                    <User size={16} className="mr-1" />
                    {userProfile?.full_name || user.email}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} className="mr-1" />
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <Button onClick={() => navigate('/auth')}>
                Sign In
              </Button>
            )}
          </div>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden ml-2 p-2 text-gray-700 hover:text-brand-blue transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <div className="flex flex-col space-y-4">
              <NavLinks />
            </div>
            
            {user ? (
              <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/profile')}
                  className="justify-start"
                >
                  <User size={16} className="mr-2" />
                  {userProfile?.full_name || user.email}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLogout}
                  className="justify-start"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-100">
                <Button 
                  onClick={() => navigate('/auth')}
                  className="w-full"
                >
                  Sign In
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
