import { useState } from 'react';
import { ArrowRight, PlayCircle, X } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

/**
 * Hero section component
 * Main landing section with animated background, CTA buttons, and featured content
 * @returns {JSX.Element} Hero section with call-to-action and featured image
 */
const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section 
      id="hero" 
      className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50"
      aria-label="Hero Section"
    >
      {/* Animated background elements */}
      <div className="absolute top-40 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" aria-hidden="true"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }} aria-hidden="true"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} aria-hidden="true"></div>
      
      <div className="container relative z-10 px-4 mx-auto">
        <div className="grid items-center grid-cols-1 gap-12 tablet:grid-cols-2 lg:grid-cols-2">
          {/* Left column: Text content */}
          <div className="max-w-lg mx-auto animate-slide-left lg:mx-0">
            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Transforming Education Through 
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Technology & Innovation
              </span>
            </h1>
            
            <p className="mb-8 text-xl text-gray-600">
              Unlock your potential with cutting-edge courses in programming, robotics, AI, and more. Join a community of innovators building the future.
            </p>
            
            <div className="flex flex-wrap gap-4" role="group" aria-label="Call to action">
              <a 
                href="#courses" 
                className="btn-primary flex items-center justify-center gap-2 group px-6 py-3 text-white font-medium bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:from-blue-600 hover:to-purple-700 transition-all"
                aria-label="Explore our educational courses"
              >
                Explore Courses
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} aria-hidden="true" />
              </a>
              
              <button 
                onClick={() => setShowVideo(true)}
                className="flex items-center justify-center gap-2 text-blue-600 transition-all hover:text-blue-700"
                aria-label="Watch our introduction video"
              >
                <PlayCircle size={24} className="animate-pulse" aria-hidden="true" />
                <span>Watch our story</span>
              </button>
            </div>
            
            <div className="flex items-center gap-4 mt-10">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <OptimizedImage 
                    key={i}
                    src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`}
                    alt={`Student ${i}`}
                    className="object-cover w-10 h-10 rounded-full border-2 border-white"
                    width={40}
                    height={40}
                    priority={true} // These are small and in the hero section, so load with priority
                    quality={90} // Higher quality for these small images
                    sizes="40px" // These are always 40px
                  />
                ))}
              </div>
              <div className="text-sm">
                <span className="font-medium text-blue-600">500+ students</span> joined this month
              </div>
            </div>
          </div>
          
          {/* Right column: Image */}
          <div className="relative mx-auto lg:mr-0 animate-slide-right">
            <div className="relative p-3 rounded-2xl bg-white shadow-xl animate-float" style={{ animationDuration: '8s' }}>
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt="Students collaborating on technology projects in a modern classroom environment" 
                className="object-cover rounded-xl shadow-md"
                width={600}
                height={400}
                priority={true} // This is a hero image, load it with priority
                sizes="(max-width: 768px) 100vw, 600px" // Responsive sizes
                loadingStyle="blur" // Use blur effect for loading
              />
              
              {/* Stats cards floating on the image */}
              <div className="absolute -bottom-6 -left-10 bg-white p-4 rounded-xl shadow-lg glass-effect">
                <div className="text-3xl font-bold text-blue-600">150+</div>
                <div className="text-sm text-gray-600">Expert Instructors</div>
              </div>
              
              <div className="absolute -top-6 -right-10 bg-white p-4 rounded-xl shadow-lg glass-effect">
                <div className="text-3xl font-bold text-purple-600">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
            
            {/* Tech icons floating around */}
            <div className="absolute -bottom-8 left-1/4 p-3 bg-white rounded-full shadow-lg animate-float" style={{ animationDelay: '1s' }}>
              <img 
                src="https://cdn.worldvectorlogo.com/logos/react-2.svg" 
                alt="React" 
                width="30" 
                height="30"
              />
            </div>
            
            <div className="absolute top-10 -right-8 p-3 bg-white rounded-full shadow-lg animate-float" style={{ animationDelay: '2.5s' }}>
              <img 
                src="https://cdn.worldvectorlogo.com/logos/python-5.svg" 
                alt="Python" 
                width="30" 
                height="30"
              />
            </div>
            
            <div className="absolute top-1/3 -left-8 p-3 bg-white rounded-full shadow-lg animate-float" style={{ animationDelay: '3.5s' }}>
              <img 
                src="https://cdn.worldvectorlogo.com/logos/arduino-1.svg" 
                alt="Arduino" 
                width="30" 
                height="30"
              />
            </div>
          </div>
        </div>

        {/* Brands that trust us */}
        <div className="pt-20 mt-20 border-t border-gray-200">
          <h2 className="mb-6 text-sm font-medium text-center text-gray-500 uppercase">
            Trusted by leading companies and institutions
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-10 opacity-90" aria-label="Partner companies">
            {[
              { src: '/assets/images/partners/microsoft-logo.svg', alt: 'Microsoft' },
              { src: '/assets/images/partners/google-logo.svg', alt: 'Google' },
              { src: '/assets/images/partners/ibm-logo.svg', alt: 'IBM' },
              { src: '/assets/images/partners/intel-logo.svg', alt: 'Intel' },
              { src: '/assets/images/partners/cisco-logo.svg', alt: 'Cisco' }
            ].map((logo, i) => (
              <img 
                key={i}
                src={logo.src}
                alt={`${logo.alt} logo`}
                className={`h-12 max-w-[150px] object-contain transition-all ${logo.alt === 'Google' || logo.alt === 'Intel' ? 'filter-none' : 'grayscale hover:grayscale-0'}`}
                width="150"
                height="48"
                style={{ 
                  filter: logo.alt === 'Google' || logo.alt === 'Intel' ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' : 'none',
                  transform: logo.alt === 'Google' || logo.alt === 'Intel' ? 'scale(1.05)' : 'none'
                }}
                onError={(e) => {
                  // If image fails to load, apply a colored background with text as fallback
                  e.target.onerror = null;
                  const colors = {
                    'Google': '#4285F4',
                    'Intel': '#0068B5',
                    'Microsoft': '#F25022',
                    'IBM': '#1F70C1',
                    'Cisco': '#049FD9'
                  };
                  e.target.style.background = colors[logo.alt] || '#f0f0f0';
                  e.target.style.color = '#ffffff';
                  e.target.style.display = 'flex';
                  e.target.style.alignItems = 'center';
                  e.target.style.justifyContent = 'center';
                  e.target.style.padding = '10px';
                  e.target.style.borderRadius = '4px';
                  e.target.style.width = '120px';
                  e.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22150%22%20height%3D%2248%22%2F%3E';
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Video modal */}
      {showVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-title"
        >
          <div className="relative w-full max-w-4xl p-2 mx-4 bg-white rounded-lg">
            <button 
              onClick={() => setShowVideo(false)}
              className="absolute p-2 bg-white rounded-full -top-4 -right-4 hover:bg-gray-100"
              aria-label="Close video"
            >
              <X size={24} aria-hidden="true" />
            </button>
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                width="100%" 
                height="315" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="EduForge Introduction" 
                id="video-title"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="rounded-md"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;