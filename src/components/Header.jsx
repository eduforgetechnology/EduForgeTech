import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

/**
 * Header component for the website navigation
 * Includes responsive navigation menu with dropdown support
 * @param {Object} props - Component props
 * @param {string} props.activeSection - The currently active section ID
 */
const Header = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { 
      name: 'Courses', 
      href: '#courses',
      dropdown: [
        { name: 'All Courses', href: '#courses' },
        { name: 'Mechanical Building', href: '#courses-mechanical' },
        { name: 'Electronics', href: '#courses-electronics' },
        { name: 'Coding & AI', href: '#courses-coding' }
      ]
    },
    { name: 'Competitions', href: '#competitions' },
    { name: 'Tuition', href: '#competitions-tuition' },
    { name: 'Educators', href: '#educators' },
    { name: 'Contact', href: '#contact' },
  ];

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
      role="banner"
      aria-label="Main site header"
    >
      <div className="container flex items-center justify-between px-2 sm:px-4 md:px-6 lg:px-8 mx-auto">
        <div className="flex items-center flex-shrink-0">
          <a href="#hero" className="flex items-center" aria-label="EduForge Home">
            <img 
              src="/logo1.svg" 
              alt="Edu Forge Logo" 
              className="w-auto h-12 sm:h-14 md:h-16 tablet:h-14 lg:h-16"
              width="140"
              height="56"
              style={{ minWidth: "100px" }}
            />
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden sm:block" aria-label="Main Navigation">
          <ul className="flex flex-wrap items-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-8" role="menubar">
            {navLinks.map((link, index) => (
              <li key={index} className="relative" role="none">
                {link.dropdown ? (
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(index)}
                      className={`flex items-center px-1 py-2 text-base font-medium transition-colors ${
                        activeSection === link.href.substring(1)
                          ? 'text-blue-600'
                          : 'text-gray-700 hover:text-blue-600'
                      }`}
                      role="menuitem"
                      aria-haspopup="true"
                      aria-expanded={openDropdown === index}
                      aria-controls={`dropdown-menu-${index}`}
                    >
                      {link.name}
                      <ChevronDown size={16} className="ml-1" aria-hidden="true" />
                    </button>
                    
                    {openDropdown === index && (
                      <div 
                        id={`dropdown-menu-${index}`}
                        className="absolute left-0 z-10 w-48 mt-2 origin-top-left bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby={`menu-button-${index}`}
                      >
                        <div className="py-1">
                          {link.dropdown.map((subLink, subIndex) => (
                            <a
                              key={subIndex}
                              href={subLink.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                              onClick={(e) => {
                                closeMenu();
                                // If we're navigating to a specific course category, we need to handle it specially
                                if (subLink.href.startsWith('#courses-')) {
                                  e.preventDefault();
                                  const categoryEl = document.getElementById(subLink.href.substring(1));
                                  if (categoryEl) {
                                    categoryEl.click(); // Simulate click on the category button
                                    window.location.href = '#courses'; // Navigate to courses section
                                  }
                                }
                              }}
                            >
                              {subLink.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={link.href}
                    className={`relative px-1 py-2 text-base font-medium transition-colors ${
                      activeSection === link.href.substring(1)
                        ? 'text-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                    role="menuitem"
                    aria-current={activeSection === link.href.substring(1) ? "page" : undefined}
                  >
                    {link.name}
                    {activeSection === link.href.substring(1) && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"></span>
                    )}
                  </a>
                )}
              </li>
            ))}
            <li>
              <a
                href="#signup"
                className="px-4 py-2 text-white transition-all rounded-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Join Us
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="p-2 sm:hidden rounded-md hover:bg-gray-100 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className="w-7 h-7 text-blue-600" />
          ) : (
            <Menu className="w-7 h-7 text-blue-600" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 z-30 bg-black bg-opacity-50 sm:hidden" 
            onClick={closeMenu}
            aria-hidden="true"
          ></div>
          
          {/* Menu Panel */}
          <div className="fixed inset-y-0 right-0 z-40 w-full max-w-sm overflow-y-auto bg-white sm:hidden shadow-xl transform transition-transform duration-300 ease-in-out">
            {/* Close button positioned in the top right corner */}
            <button 
              className="absolute top-6 right-6 p-2 text-gray-700 hover:text-blue-600 focus:outline-none z-50 bg-white shadow-md rounded-full transition-transform hover:scale-110 active:scale-95 border border-gray-100"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X className="w-8 h-8" />
            </button>
          
            <div className="container pt-20 pb-8 mx-auto px-6">
              <div className="mb-8 border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold text-blue-600">EduForge</h2>
                <p className="text-sm text-gray-500 mt-1">Navigation Menu</p>
              </div>
              <ul className="flex flex-col space-y-6">
                {navLinks.map((link, index) => (
                <li key={index} className="relative">
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(index)}
                        className={`flex items-center w-full px-1 py-2 text-lg font-medium transition-colors ${
                          activeSection === link.href.substring(1)
                            ? 'text-blue-600'
                            : 'text-gray-700'
                        }`}
                      >
                        {link.name}
                        <ChevronDown size={18} className="ml-1" />
                      </button>
                      
                      {openDropdown === index && (
                        <div className="mt-2 ml-4">
                          {link.dropdown.map((subLink, subIndex) => (
                            <a
                              key={subIndex}
                              href={subLink.href}
                              className="block py-2 text-base text-gray-700 hover:text-blue-600"
                              onClick={(e) => {
                                closeMenu();
                                // If we're navigating to a specific course category, we need to handle it specially
                                if (subLink.href.startsWith('#courses-')) {
                                  e.preventDefault();
                                  const categoryEl = document.getElementById(subLink.href.substring(1));
                                  if (categoryEl) {
                                    categoryEl.click(); // Simulate click on the category button
                                    window.location.href = '#courses'; // Navigate to courses section
                                  }
                                }
                              }}
                            >
                              {subLink.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={link.href}
                      className={`block px-1 py-2 text-lg font-medium transition-colors ${
                        activeSection === link.href.substring(1)
                          ? 'text-blue-600'
                          : 'text-gray-700 hover:text-blue-600'
                      }`}
                      onClick={closeMenu}
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
              <li className="pt-4">
                <a
                  href="#signup"
                  className="inline-block px-6 py-3 text-white transition-all rounded-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  onClick={closeMenu}
                >
                  Join Us
                </a>
              </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;