import { useState, useEffect } from 'react';

/**
 * Custom hook for extracting content from DOM elements
 * Used by the chatbot to access live website content
 */
const useWebsiteContent = () => {
  const [websiteContent, setWebsiteContent] = useState({
    headings: [],
    sections: {},
    courses: [],
    competitions: []
  });

  useEffect(() => {
    // Function to extract content from the website
    const extractContent = () => {
      try {
        // Extract all headings
        const headingElements = document.querySelectorAll('h1, h2, h3');
        const headings = Array.from(headingElements).map(el => ({
          text: el.textContent.trim(),
          level: el.tagName.charAt(1),
          id: el.id || ''
        }));

        // Extract section content
        const sections = {};
        const sectionElements = document.querySelectorAll('section[id]');
        sectionElements.forEach(section => {
          const sectionId = section.id;
          const sectionContent = section.textContent.trim();
          sections[sectionId] = sectionContent;
        });

        // Extract course information
        // In a real implementation, this would look for specific elements with course data
        // For now, we'll rely on our static data from WebsiteDataExtractor

        // Extract competition information
        // In a real implementation, this would look for specific elements with competition data
        // For now, we'll rely on our static data from WebsiteDataExtractor

        // Set all extracted content
        setWebsiteContent({
          headings,
          sections,
          courses: [], // Filled from WebsiteDataExtractor instead
          competitions: [] // Filled from WebsiteDataExtractor instead
        });
      } catch (error) {
        console.error('Error extracting website content:', error);
      }
    };

    // Extract content after a short delay to ensure DOM is fully loaded
    const timer = setTimeout(() => {
      extractContent();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return websiteContent;
};

export default useWebsiteContent;