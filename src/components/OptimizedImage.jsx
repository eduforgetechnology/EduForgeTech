import { useState, useEffect, useRef } from 'react';

/**
 * OptimizedImage component that enhances image loading performance
 * Features responsive sizing, lazy loading, loading indicators, and image optimizations
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Source URL of the image
 * @param {string} props.alt - Alt text for accessibility and SEO
 * @param {string} props.className - CSS class names
 * @param {number|string} props.width - Width of the image
 * @param {number|string} props.height - Height of the image
 * @param {string} props.fallbackSrc - Fallback image source if main image fails to load
 * @param {string} props.loadingStyle - Style of loading indicator ('blur' or 'skeleton')
 * @param {boolean} props.priority - Whether image should load with high priority (for LCP images)
 * @param {string} props.sizes - Sizes attribute for responsive images
 * @param {number} props.quality - Image quality (1-100)
 * @returns {JSX.Element} Optimized image component
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  width, 
  height, 
  fallbackSrc,
  loadingStyle = "blur", // "blur" or "skeleton"
  priority = false, // Set to true for above-the-fold images
  sizes = '100vw', // Default sizes attribute for responsive images
  quality = 75 // Image quality (1-100)
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(priority ? src : null);
  const [isInView, setIsInView] = useState(priority); // Priority images are considered in view immediately
  const imgRef = useRef(null);
  
  // Reset states when component gets new src prop
  useEffect(() => {
    // When src changes completely, reset states
    setIsLoaded(false);
    setError(false);
    // Always set the image source immediately without delay
    // This ensures images load right away when categories change
    setImgSrc(src);
  }, [src]); // Only depend on src to ensure it updates properly

  // Use Intersection Observer for better lazy loading
  useEffect(() => {
    // Skip for priority images
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          setImgSrc(src); // Only set image source when in view
          observer.disconnect();
        }
      },
      { 
        rootMargin: '200px 0px', // Start loading before image enters viewport
        threshold: 0.01 
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority, src]);

  // Get device pixel ratio for better handling of high-density displays
  const getDevicePixelRatio = () => {
    return typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  };

  // Determine if width/height are numbers and convert to appropriate style values
  const getNumericDimension = (value) => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string' && value.match(/^\d+$/)) return parseInt(value, 10);
    return null;
  };

  const optimizedSrc = (sourceSrc, specificWidth = null) => {
    if (!sourceSrc) return '';

    // Skip processing for local SVGs
    if (sourceSrc.endsWith('.svg') && !sourceSrc.startsWith('http')) {
      return sourceSrc;
    }
    
    try {
      // For Unsplash images, optimize by modifying URL parameters
      if (sourceSrc.includes('unsplash.com')) {
        const url = new URL(sourceSrc);
        // Extract existing parameters
        const params = new URLSearchParams(url.search);
        
        // Override or set quality and size parameters for better performance
        params.set('q', quality.toString()); 
        params.set('auto', 'format,compress'); // Use WebP if supported
        
        // Set width based on props, specific width param, or default
        const dpr = getDevicePixelRatio();
        const numericWidth = getNumericDimension(specificWidth || width);
        
        // If we have a numeric width, apply it with DPR adjustment for retina displays
        if (numericWidth) {
          params.set('w', Math.round(numericWidth * dpr).toString());
        } else if (!specificWidth && !params.has('w')) {
          // Size optimization based on screen width
          const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
          
          // Select appropriate size based on screen width
          let imageWidth;
          if (screenWidth < 768) {
            imageWidth = '400'; // Mobile
          } else if (screenWidth >= 768 && screenWidth < 924) {
            imageWidth = '500'; // Tablet (md to tablet breakpoint)
          } else {
            imageWidth = '800'; // Desktop
          }
          
          params.set('w', imageWidth);
        }
        
        // Rebuild the URL with new parameters
        url.search = params.toString();
        return url.toString();
      }
      
      return sourceSrc;
    } catch (e) {
      // If URL parsing fails, return original source
      console.error('Error optimizing image URL:', e);
      return sourceSrc;
    }
  };

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    if (!src || (src.endsWith('.svg') && !src.startsWith('http'))) {
      return '';
    }

    // Define breakpoints for different screen sizes including tablet size
    const breakpoints = [320, 640, 768, 924, 1024, 1280, 1536];
    
    try {
      return breakpoints
        .map(bpWidth => `${optimizedSrc(src, bpWidth)} ${bpWidth}w`)
        .join(', ');
    } catch (e) {
      console.error('Error generating srcSet:', e);
      return '';
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
    if (fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`} 
      style={{ width, height }}
      ref={imgRef}
    >
      {(!isLoaded && loadingStyle === "blur") && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {(!isLoaded && loadingStyle === "skeleton") && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" 
          style={{ 
            backgroundSize: '200% 100%', 
            animation: 'shimmer 1.5s infinite'
          }} 
        />
      )}
      
      {(imgSrc && (isInView || priority)) && (
        <img
          src={optimizedSrc(imgSrc)}
          srcSet={generateSrcSet()}
          sizes={sizes}
          alt={alt || 'Image'} // Always provide alt text for accessibility and SEO
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          style={{ width, height, objectFit: 'cover' }}
          loading={priority ? "eager" : "lazy"}
          onLoad={handleLoad}
          onError={handleError}
          decoding="async"
          width={typeof width === 'number' ? width : undefined}
          height={typeof height === 'number' ? height : undefined}
          fetchPriority={priority ? "high" : "auto"}
        />
      )}
    </div>
  );
};

export default OptimizedImage;