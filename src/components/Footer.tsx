
import { Link } from "react-router-dom";
import { Home, Mail, Phone, MapPin, ArrowRight, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brand-blue text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="relative">
                <div className="h-8 w-8 bg-white rounded-md flex items-center justify-center">
                  <Home size={16} className="text-brand-blue" />
                </div>
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-brand-crimson rounded-full"></div>
              </div>
              <span className="text-xl font-bold">
                gharbhada
                <span className="text-brand-crimson">.com.np</span>
              </span>
            </Link>
            <p className="text-white/80 mb-6">
              Your trusted partner for finding the perfect rental property in Nepal. Discover your dream home with us.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin size={18} className="mr-2 text-brand-crimson" />
                <span className="text-white/80">Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="mr-2 text-brand-crimson" />
                <span className="text-white/80">+977 1-4XXXXXX</span>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="mr-2 text-brand-crimson" />
                <span className="text-white/80">info@gharbhada.com.np</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <span>Quick Links</span>
              <span className="h-px bg-brand-crimson w-10 ml-3"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/80 hover:text-white hover:translate-x-1 flex items-center transition-all duration-300">
                  <ArrowRight size={14} className="mr-2 text-brand-crimson" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-white/80 hover:text-white hover:translate-x-1 flex items-center transition-all duration-300">
                  <ArrowRight size={14} className="mr-2 text-brand-crimson" />
                  <span>Properties</span>
                </Link>
              </li>
              <li>
                <Link to="/locations" className="text-white/80 hover:text-white hover:translate-x-1 flex items-center transition-all duration-300">
                  <ArrowRight size={14} className="mr-2 text-brand-crimson" />
                  <span>Locations</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white hover:translate-x-1 flex items-center transition-all duration-300">
                  <ArrowRight size={14} className="mr-2 text-brand-crimson" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white hover:translate-x-1 flex items-center transition-all duration-300">
                  <ArrowRight size={14} className="mr-2 text-brand-crimson" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <span>Property Types</span>
              <span className="h-px bg-brand-crimson w-10 ml-3"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/properties?type=apartment" className="text-white/80 hover:text-white hover:translate-x-1 flex items-center transition-all duration-300">
                  <ArrowRight size={14} className="mr-2 text-brand-crimson" />
                  <span>Apartments</span>
                </Link>
              </li>
              <li>
                <Link to="/properties?type=house" className="text-white/80 hover:text-white hover:translate-x-1 flex items-center transition-all duration-300">
                  <ArrowRight size={14} className="mr-2 text-brand-crimson" />
                  <span>Houses</span>
                </Link>
              </li>
              <li>
                <Link to="/properties?type=condo" className="text-white/80 hover:text-white hover:translate-x-1 flex items-center transition-all duration-300">
                  <ArrowRight size={14} className="mr-2 text-brand-crimson" />
                  <span>Condos</span>
                </Link>
              </li>
              <li>
                <Link to="/properties?type=villa" className="text-white/80 hover:text-white hover:translate-x-1 flex items-center transition-all duration-300">
                  <ArrowRight size={14} className="mr-2 text-brand-crimson" />
                  <span>Villas</span>
                </Link>
              </li>
              <li>
                <Link to="/properties?type=office" className="text-white/80 hover:text-white hover:translate-x-1 flex items-center transition-all duration-300">
                  <ArrowRight size={14} className="mr-2 text-brand-crimson" />
                  <span>Offices</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <span>Newsletter</span>
              <span className="h-px bg-brand-crimson w-10 ml-3"></span>
            </h3>
            <p className="text-white/80 mb-4">Subscribe to our newsletter for the latest property listings and news.</p>
            <form className="mb-6">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:border-brand-crimson transition-colors"
                />
                <button 
                  type="submit"
                  className="absolute right-0 top-0 h-full bg-brand-crimson text-white px-4 rounded-r-md hover:bg-brand-crimson/90 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <span>Follow Us</span>
            </h3>
            <div className="flex space-x-3">
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-crimson transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-crimson transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-crimson transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-crimson transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-center">
          <p className="text-white/70 text-sm">
            © {currentYear} gharbhada.com.np. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
