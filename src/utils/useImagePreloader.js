import { useEffect, useCallback } from 'react';

/**
 * Custom hook to preload images in the background with improved handling for mobile devices
 * @param {Array<string>} imageUrls - Array of image URLs to preload
 * @param {number} delay - Optional delay before starting preload (in ms)
 * @param {number} batchSize - Optional batch size for loading images (default 3)
 * @param {number} batchDelay - Optional delay between batches (in ms) (default 200)
 * @param {boolean} respectReducedData - Optional flag to respect reduced data preferences (default true)
 */
const useImagePreloader = (
  imageUrls, 
  delay = 0, 
  batchSize = 3, 
  batchDelay = 200,
  respectReducedData = true
) => {
  // Function to check if user has requested reduced data usage
  const shouldReduceDataUsage = useCallback(() => {
    if (!respectReducedData) return false;
    
    // Check for navigator.connection (available in Chrome, Edge, Opera)
    if (typeof navigator !== 'undefined' && navigator.connection) {
      const { saveData, effectiveType } = navigator.connection;
      // Return true if saveData mode is on or network is slow
      if (saveData || ['slow-2g', '2g', '3g'].includes(effectiveType)) {
        return true;
      }
    }
    
    // Check if user is on mobile device (simple check)
    const isMobile = typeof window !== 'undefined' && 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        window.navigator.userAgent
      );
      
    // If we can't detect network but it's mobile, better be conservative
    return isMobile;
  }, [respectReducedData]);

  // Get appropriate image size based on device
  const getOptimizedImageUrl = useCallback((url) => {
    if (!url || typeof url !== 'string') return url;
    
    // Only modify Unsplash URLs
    if (!url.includes('unsplash.com')) return url;
    
    try {
      const parsedUrl = new URL(url);
      const params = new URLSearchParams(parsedUrl.search);
      
      // Set lower quality and size for data-saving mode
      if (shouldReduceDataUsage()) {
        params.set('q', '60'); // Lower quality
        params.set('w', '400'); // Smaller size
      } else {
        params.set('q', '80');
        // Set appropriate size based on screen width
        const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1280;
        params.set('w', screenWidth <= 768 ? '800' : '1200');
      }
      
      params.set('auto', 'format,compress');
      parsedUrl.search = params.toString();
      return parsedUrl.toString();
    } catch (e) {
      return url; // If any error occurs, return original URL
    }
  }, [shouldReduceDataUsage]);

  useEffect(() => {
    if (!imageUrls || !imageUrls.length) return;
    
    // Skip or reduce preloading on data-saving connections
    const isReducedData = shouldReduceDataUsage();
    if (isReducedData && delay === 0) {
      // Introduce a small delay for data-saving connections
      delay = 500;
    }

    // Filter out null/undefined values and deduplicate URLs
    const uniqueUrls = [...new Set(imageUrls.filter(Boolean))];
    
    // Skip preloading for data-saving if there are many images
    if (isReducedData && uniqueUrls.length > 10) {
      console.log('Skipping preload for many images on reduced data connection');
      return;
    }

    const preloadImages = () => {
      // Process in batches to not overwhelm bandwidth
      const processBatch = (startIndex) => {
        // If we're done, stop
        if (startIndex >= uniqueUrls.length) return;
        
        // Process current batch
        const endIndex = Math.min(startIndex + batchSize, uniqueUrls.length);
        for (let i = startIndex; i < endIndex; i++) {
          const img = new Image();
          img.src = getOptimizedImageUrl(uniqueUrls[i]);
        }
        
        // Schedule next batch after delay
        if (endIndex < uniqueUrls.length) {
          setTimeout(() => processBatch(endIndex), batchDelay);
        }
      };
      
      // Start first batch
      processBatch(0);
    };

    // If delay is specified, wait before preloading
    if (delay > 0) {
      const timer = setTimeout(preloadImages, delay);
      return () => clearTimeout(timer);
    } else {
      preloadImages();
    }
  }, [imageUrls, delay, batchSize, batchDelay, getOptimizedImageUrl, shouldReduceDataUsage]);
};

export default useImagePreloader;