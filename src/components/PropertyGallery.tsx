
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, X, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

const PropertyGallery = ({ images, title }: PropertyGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    const preloadNextImages = () => {
      // Preload current, next and previous images
      const indicesToLoad = new Set<number>([
        activeIndex,
        (activeIndex + 1) % images.length,
        (activeIndex - 1 + images.length) % images.length,
      ]);
      
      setLoadedImages(prevLoaded => {
        const newLoaded = new Set(prevLoaded);
        indicesToLoad.forEach(index => newLoaded.add(index));
        return newLoaded;
      });
    };

    preloadNextImages();
  }, [activeIndex, images.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleFullscreen = () => {
    setFullscreen(!fullscreen);
    if (!fullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (fullscreen) {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "Escape") handleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fullscreen]);

  return (
    <>
      <div className={cn(
        "relative overflow-hidden group",
        fullscreen ? "hidden" : "rounded-xl"
      )}>
        <div 
          className="relative aspect-[16/9] md:aspect-[2/1] overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
            >
              {loadedImages.has(index) && (
                <img
                  src={image}
                  alt={`${title} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/80 text-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-white"
          aria-label="Previous image"
        >
          <ArrowLeft size={20} />
        </button>
        
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/80 text-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-white"
          aria-label="Next image"
        >
          <ArrowRight size={20} />
        </button>
        
        <button
          onClick={handleFullscreen}
          className="absolute right-4 top-4 z-20 h-10 w-10 rounded-full bg-white/80 text-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-white"
          aria-label="View fullscreen"
        >
          <Maximize2 size={18} />
        </button>

        {/* Image counter */}
        <div className="absolute bottom-4 right-4 z-20 bg-black/60 text-white text-sm px-2 py-1 rounded">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-2 mt-2 overflow-x-auto pb-2 hide-scrollbar">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={cn(
              "flex-shrink-0 w-20 h-20 overflow-hidden rounded-md transition-all duration-200",
              index === activeIndex 
                ? "ring-2 ring-brand-blue opacity-100" 
                : "opacity-60 hover:opacity-100"
            )}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Gallery */}
      {fullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="flex justify-end p-4">
            <button
              onClick={handleFullscreen}
              className="h-10 w-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Close fullscreen"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 flex items-center justify-center relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-500 p-4",
                  index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                )}
              >
                <img
                  src={image}
                  alt={`${title} - Image ${index + 1} (Fullscreen)`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
            
            <button
              onClick={handlePrev}
              className="absolute left-4 z-20 h-12 w-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Previous image"
            >
              <ArrowLeft size={24} />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 z-20 h-12 w-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Next image"
            >
              <ArrowRight size={24} />
            </button>
          </div>
          
          <div className="flex justify-center p-4">
            <div className="bg-white/10 text-white text-sm px-3 py-1 rounded-full">
              {activeIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyGallery;
