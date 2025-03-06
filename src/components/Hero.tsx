
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bed, Bath, Home } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Find Your Dream Home",
      subtitle: "Discover the perfect property in prime locations across Nepal"
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Premium Properties",
      subtitle: "Exclusive listings tailored to your lifestyle and preferences"
    },
    {
      image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80",
      title: "Rent with Confidence",
      subtitle: "Trusted listings and seamless rental experiences await"
    }
  ];

  useEffect(() => {
    startSlideShow();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startSlideShow = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
  };

  const highlightStats = [
    { 
      icon: <Home className="text-brand-crimson h-6 w-6" />, 
      value: "1,000+", 
      label: "Properties" 
    },
    { 
      icon: <Bed className="text-brand-crimson h-6 w-6" />, 
      value: "500+", 
      label: "Apartments" 
    },
    { 
      icon: <Bath className="text-brand-crimson h-6 w-6" />, 
      value: "250+", 
      label: "Houses" 
    },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0 z-10">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black opacity-40"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              startSlideShow();
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-brand-crimson" : "w-2 bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full z-20 container mx-auto px-4 flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center max-w-4xl"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            {slides[currentSlide].subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-4xl mb-12"
        >
          <SearchBar />
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {highlightStats.map((stat, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center"
            >
              <div className="rounded-full bg-white/10 backdrop-blur-sm p-4 mb-3">
                {stat.icon}
              </div>
              <span className="text-white font-bold text-2xl md:text-3xl">{stat.value}</span>
              <span className="text-white/80 text-sm md:text-base">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Browse Properties Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12"
        >
          <Link 
            to="/properties" 
            className="group flex items-center bg-brand-blue hover:bg-brand-blue/90 text-white px-6 py-3 rounded-md transition-all duration-300"
          >
            <span className="font-medium">Browse All Properties</span>
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
