import { ChevronRight, ArrowUp, Mail } from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !email.includes('@')) {
      setSubscribeStatus({
        submitted: true,
        success: false,
        message: 'Please enter a valid email address.'
      });
      return;
    }
    
    // Simulate API call
    setSubscribeStatus({
      submitted: true,
      success: true,
      message: 'Thank you for subscribing to our newsletter!'
    });
    
    // Reset form
    setEmail('');
    
    // Reset status after a delay
    setTimeout(() => {
      setSubscribeStatus({
        submitted: false,
        success: false,
        message: ''
      });
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', url: '#about' },
        { name: 'Our Team', url: '#team' },
        { name: 'Careers', url: '#careers' },
        { name: 'Press', url: '#press' },
        { name: 'Contact', url: '#contact' }
      ]
    },
    {
      title: 'Courses',
      links: [
        { name: 'Web Development', url: '#courses-web' },
        { name: 'Machine Learning', url: '#courses-ml' },
        { name: 'Robotics', url: '#courses-robotics' },
        { name: 'Data Science', url: '#courses-data' },
        { name: 'View All Courses', url: '#courses' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', url: '#blog' },
        { name: 'Tutorials', url: '#tutorials' },
        { name: 'Documentation', url: '#docs' },
        { name: 'FAQs', url: '#faqs' },
        { name: 'Community', url: '#community' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', url: '#terms' },
        { name: 'Privacy Policy', url: '#privacy' },
        { name: 'Cookie Policy', url: '#cookies' },
        { name: 'Refund Policy', url: '#refunds' },
        { name: 'Accessibility', url: '#accessibility' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container px-4 pt-16 pb-8 mx-auto">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 tablet:grid-cols-3 lg:grid-cols-5">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src="/logo1.svg" 
                alt="EduForge Logo" 
                className="h-12 w-auto"
              />
              <span className="text-2xl font-bold text-white">EduForge</span>
            </div>
            
            <p className="mb-6 text-gray-300">
              Transforming education through technology and innovation. EduForge provides cutting-edge courses, workshops, and competitions to help students master in-demand tech skills.
            </p>
            
            {/* Newsletter subscription */}
            <div className="mb-8">
              <h4 className="mb-4 text-lg font-bold">Subscribe to our newsletter</h4>
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 text-gray-800 bg-white rounded-md pr-14"
                />
                <button
                  type="submit"
                  className="absolute p-3 text-white transition-colors bg-blue-600 rounded-md top-0 right-0 hover:bg-blue-700"
                >
                  <Mail size={18} />
                </button>
              </form>
              
              {subscribeStatus.submitted && (
                <p className={`mt-2 text-sm ${subscribeStatus.success ? 'text-green-400' : 'text-red-400'}`}>
                  {subscribeStatus.message}
                </p>
              )}
            </div>
            
            {/* Social links */}
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'linkedin', 'instagram', 'youtube'].map((social) => (
                <a 
                  key={social} 
                  href="#"
                  className="p-2 transition-colors bg-gray-800 rounded-full hover:bg-gray-700"
                  aria-label={`${social} link (not active)`}
                >
                  <img 
                    src={`https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/${social}.svg`}
                    alt={social}
                    className="w-5 h-5 filter invert"
                  />
                </a>
              ))}
            </div>
          </div>
          
          {/* Footer links */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h4 className="mb-4 text-lg font-bold">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.url}
                      className="inline-flex items-center text-gray-300 transition-colors hover:text-blue-400"
                    >
                      <ChevronRight size={14} className="mr-1" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <hr className="my-8 border-gray-800" />
        
        {/* Bottom footer */}
        <div className="flex flex-col items-center justify-between md:flex-row">
          <p className="mb-4 text-gray-400 md:mb-0">
            &copy; 2024 EduForge Technology. All rights reserved. | Founder & CEO: Lokesh Sharma
          </p>
          
          <div>
            <button 
              onClick={scrollToTop}
              className="p-3 transition-colors bg-gray-800 rounded-full hover:bg-gray-700"
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom banner */}
      <div className="py-4 bg-gray-950">
        <div className="container px-4 mx-auto text-center">
          <p className="text-sm text-gray-500">
            Made with ❤️ by EduForge Technology | <a href="#accessibility" className="underline hover:text-gray-400">Accessibility Statement</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;