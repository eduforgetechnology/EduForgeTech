import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Software Engineer at Google",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "The web development bootcamp at EduForge completely transformed my career. The project-based curriculum gave me practical skills that I use daily in my role at Google. The instructors were incredibly knowledgeable and supportive throughout the journey.",
      rating: 5,
      course: "Full Stack Web Development"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Data Scientist at Amazon",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "I enrolled in the Data Science bootcamp with basic Python knowledge and graduated with the confidence to tackle complex data problems. The hands-on approach and real-world projects made all the difference. I landed my dream job within a month of completing the program!",
      rating: 5,
      course: "Data Science Bootcamp"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Robotics Engineer at Boston Dynamics",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      quote: "The Robotics Engineering course exceeded all my expectations. The combination of theory and practical application was perfectly balanced, and I appreciated the opportunity to work with cutting-edge equipment. This course directly led to my position at Boston Dynamics.",
      rating: 5,
      course: "Robotics Engineering"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Mobile App Developer at Spotify",
      image: "https://randomuser.me/api/portraits/men/11.jpg",
      quote: "The React Native course gave me exactly what I needed to transition from web to mobile development. The curriculum was up-to-date with the latest industry standards, and the mentorship I received was invaluable. Highly recommend to anyone interested in mobile development!",
      rating: 4,
      course: "React Native Development"
    },
    {
      id: 5,
      name: "Aisha Patel",
      role: "AI Research Scientist at Microsoft",
      image: "https://randomuser.me/api/portraits/women/37.jpg",
      quote: "EduForge's Machine Learning course provided the perfect foundation for my career in AI research. The course was challenging but the teaching assistants were always there to help. The project portfolio I built during the course helped me stand out to employers.",
      rating: 5,
      course: "Machine Learning Fundamentals"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayRef = useRef(null);
  const timeoutRef = useRef(null);

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);
  // If we don't have enough testimonials to fill the slider, add from the beginning
  if (visibleTestimonials.length < 3) {
    const remaining = 3 - visibleTestimonials.length;
    visibleTestimonials.push(...testimonials.slice(0, remaining));
  }

  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Auto-play functionality
  useEffect(() => {
    autoPlayRef.current = () => {
      nextSlide();
    };
  }, [currentIndex]);

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };
    
    const interval = setInterval(play, 5000);
    
    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Function to render stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index}
        size={16} 
        className={`${index < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full">Testimonials</span>
          <h2 className="section-title">What Our Students Say</h2>
          <p className="section-subtitle">
            Discover how EduForge has helped thousands of students transform their careers and achieve their goals.
          </p>
        </div>

        {/* Testimonial carousel */}
        <div className="relative">
          {/* Navigation buttons */}
          <div className="absolute left-0 z-10 hidden transform -translate-y-1/2 md:block top-1/2">
            <button 
              onClick={prevSlide} 
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
              disabled={isAnimating}
            >
              <ChevronLeft size={24} className="text-blue-600" />
            </button>
          </div>
          
          <div className="absolute right-0 z-10 hidden transform -translate-y-1/2 md:block top-1/2">
            <button 
              onClick={nextSlide} 
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
              disabled={isAnimating}
            >
              <ChevronRight size={24} className="text-blue-600" />
            </button>
          </div>
          
          {/* Testimonials */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 tablet:grid-cols-3 lg:grid-cols-3">
            {visibleTestimonials.map((testimonial, index) => (
              <div 
                key={`${testimonial.id}-${index}`} 
                className={`bg-white p-6 rounded-xl shadow-md transition-all duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  animation: 'float 6s ease-in-out infinite',
                  animationDelay: `${index * 1}s`
                }}
              >
                <div className="flex items-center mb-4">
                  <OptimizedImage 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    loadingStyle="blur"
                    quality={85}
                    sizes="48px"
                    className="object-cover w-12 h-12 mr-4 rounded-full"
                    width={48}
                    height={48}
                  />
                  <div>
                    <h4 className="text-lg font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="relative mb-6">
                  <Quote size={36} className="absolute text-blue-100 -top-2 -left-2 -z-10" />
                  <p className="text-gray-700">"{testimonial.quote}"</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {renderStars(testimonial.rating)}
                  </div>
                  <span className="text-sm text-gray-500">{testimonial.course}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile navigation dots */}
          <div className="flex justify-center mt-8 space-x-2 md:hidden">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6 mt-20 text-center md:grid-cols-3 tablet:grid-cols-4 lg:grid-cols-4">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="mb-2 text-3xl font-bold text-blue-600 md:text-4xl">98%</div>
            <p className="text-gray-600">Student Satisfaction</p>
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="mb-2 text-3xl font-bold text-blue-600 md:text-4xl">15,000+</div>
            <p className="text-gray-600">Graduates</p>
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="mb-2 text-3xl font-bold text-blue-600 md:text-4xl">92%</div>
            <p className="text-gray-600">Job Placement Rate</p>
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="mb-2 text-3xl font-bold text-blue-600 md:text-4xl">45%</div>
            <p className="text-gray-600">Average Salary Increase</p>
          </div>
        </div>
        
        {/* CTA */}
        <div className="max-w-2xl p-8 mx-auto mt-16 text-center bg-white rounded-xl shadow-md">
          <h3 className="mb-3 text-2xl font-bold">Ready to Start Your Learning Journey?</h3>
          <p className="mb-6 text-gray-600">Join thousands of successful students who have transformed their careers with EduForge.</p>
          <a 
            href="#signup" 
            className="inline-block px-6 py-3 text-white transition-all rounded-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            Enroll Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;