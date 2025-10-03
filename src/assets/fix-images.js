// Script to make the main image fully visible on all screens
document.addEventListener('DOMContentLoaded', () => {
  // Find all images with the specific Unsplash URL
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (img.src.includes('photo-1581092918056')) {
      // Apply direct styling to ensure image is fully visible
      img.style.objectFit = 'contain';
      img.style.maxHeight = '100%';
      img.style.width = '100%';
      
      // Find parent container and ensure it has proper dimensions
      const container = img.closest('div');
      if (container) {
        container.style.maxWidth = '100%';
        container.style.overflow = 'hidden';
      }
    }
  });
});