import { useState, useEffect } from 'react';
import { Clock, Users, Star, ChevronRight, Loader2 } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const CourseSection = () => {
  const categories = [
    'All Courses',
    'Mechanical Building',
    'Electronics',
    'Coding & AI'
  ];

  const [activeCategory, setActiveCategory] = useState('All Courses');
  const [isLoading, setIsLoading] = useState(false);

  const courses = [
    {
      id: 1,
      title: "Advanced Robotics Framework Design",
      category: "Mechanical Building",
      description: "Learn to design and construct advanced robotic frameworks with precision engineering techniques.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      duration: "12 weeks",
      students: 1250,
      rating: 4.8,
      level: "Intermediate to Advanced"
    },
    {
      id: 2,
      title: "3D Design & Rapid Prototyping",
      category: "Mechanical Building",
      description: "Master CAD/CAM software and hands-on fabrication techniques to bring your designs to life quickly.",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      duration: "10 weeks",
      students: 950,
      rating: 4.7,
      level: "Beginner to Intermediate"
    },
    {
      id: 3,
      title: "Material Science for Robotics",
      category: "Mechanical Building",
      description: "Learn about optimal materials selection and assembly techniques for building durable robot structures.",
      image: "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      duration: "8 weeks",
      students: 730,
      rating: 4.6,
      level: "Intermediate"
    },
    {
      id: 4,
      title: "Arduino & Microcontroller Programming",
      category: "Electronics",
      description: "Build intelligent electronic systems using Arduino and other popular microcontroller platforms.",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      duration: "12 weeks",
      students: 1350,
      rating: 4.9,
      level: "Beginner to Advanced"
    },
    {
      id: 5,
      title: "Advanced Sensors & Data Acquisition",
      category: "Electronics",
      description: "Learn to implement various sensor types and create systems for reliable data collection and processing.",
      image: "/assets/images/courses/sensors-pcb-design.svg",
      fallbackImage: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      duration: "10 weeks",
      students: 1090,
      rating: 4.7,
      level: "Intermediate"
    },
    {
      id: 6,
      title: "PCB Design & Fabrication",
      category: "Electronics",
      description: "Design and create custom printed circuit boards for specialized robotics applications.",
      image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      duration: "8 weeks",
      students: 820,
      rating: 4.8,
      level: "Intermediate to Advanced"
    },
    {
      id: 7,
      title: "Python for Robotics",
      category: "Coding & AI",
      description: "Master Python programming specifically for robotics applications with practical examples.",
      image: "https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      duration: "14 weeks",
      students: 1720,
      rating: 4.9,
      level: "Beginner to Advanced"
    },
    {
      id: 8,
      title: "Machine Learning for Robotics",
      category: "Coding & AI",
      description: "Implement machine learning algorithms to create intelligent, adaptive robotic systems.",
      image: "https://images.unsplash.com/photo-1527430253228-e93688616381?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      duration: "16 weeks",
      students: 1320,
      rating: 4.8,
      level: "Advanced"
    },
    {
      id: 9,
      title: "Computer Vision Systems",
      category: "Coding & AI",
      description: "Develop advanced computer vision capabilities for robots to perceive and interact with their environment.",
      image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format,compress&fit=crop&w=400&q=80",
      duration: "12 weeks",
      students: 980,
      rating: 4.7,
      level: "Intermediate to Advanced"
    }
  ];

  // Filter courses based on active category and add a key for forcing re-render
  const filteredCourses = (activeCategory === 'All Courses' 
    ? courses 
    : courses.filter(course => course.category === activeCategory))
    .map(course => ({
      ...course,
      // Add a unique key that changes when the category changes
      uniqueKey: `${course.id}-${activeCategory}`
    }));

  return (
    <section id="courses" className="py-20 bg-gray-50 scroll-mt-20">
      <div className="container px-2 sm:px-4 md:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full">Our Specialized Robotics Courses</span>
          <h2 className="section-title">Build Your Future in Robotics with Our Expert-Led Programs</h2>
          <p className="section-subtitle">
            Master robotics technology through our comprehensive courses in mechanical building, electronics, and coding & AI - the three pillars of modern robotics education.
          </p>
        </div>

        {/* Category filter */}
  <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 overflow-x-auto tablet:gap-2" style={{scrollbarWidth:'none'}}>
          {categories.map((category, index) => (
            <button
              key={index}
              id={category === 'All Courses' ? 'courses' : 
                  category === 'Mechanical Building' ? 'courses-mechanical' :
                  category === 'Electronics' ? 'courses-electronics' :
                  category === 'Coding & AI' ? 'courses-coding' : ''}
              onClick={() => {
                if (category !== activeCategory) {
                  setIsLoading(true);
                  setActiveCategory(category);
                  // Reset loading state after a short delay to allow rendering
                  setTimeout(() => setIsLoading(false), 200);
                }
              }}
              className={`px-3 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-full transition-all ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 size={40} className="text-blue-600 animate-spin" />
          </div>
        )}

        {/* Courses grid */}
  <div className={`grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 tablet:grid-cols-2 lg:grid-cols-3 ${isLoading ? 'hidden' : ''}`}>
          {filteredCourses.map((course) => (
            <div 
              key={course.uniqueKey || course.id} 
              className="overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 animate-on-scroll"
            >
              <div className="overflow-hidden h-40 sm:h-48 tablet:h-44 md:h-48 lg:h-56">
                <OptimizedImage 
                  src={course.image}
                  fallbackSrc={course.fallbackImage || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format,compress&fit=crop&w=400&q=80"}
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  style={{objectPosition:'center top'}} // Changed to center top to ensure better visibility
                  width="100%"
                  height="100%"
                  loadingStyle="skeleton"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={75}
                  priority={course.id <= 3}
                />
              </div>
              
              <div className="p-6">
                <div className="mb-2">
                  <span className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                    {course.category}
                  </span>
                  <span className="px-3 py-1 ml-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full">
                    {course.level}
                  </span>
                </div>
                
                <h3 className="mb-2 text-xl font-bold">{course.title}</h3>
                <p className="mb-4 text-gray-600">{course.description}</p>
                
                <div className="flex flex-wrap items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users size={16} className="mr-1" />
                    {course.students.toLocaleString()} students
                  </div>
                  <div className="flex items-center">
                    <Star size={16} className="mr-1 text-yellow-500 fill-yellow-500" />
                    {course.rating} / 5.0
                  </div>
                </div>
                {course.image && course.image.includes('unsplash.com') && (
                  <div className="mt-2 mb-2">
                    <p className="text-xs text-gray-400">Image: Unsplash</p>
                  </div>
                )}
                
                <a 
                  href={`#course-${course.id}`} 
                  className="flex items-center justify-center w-full px-4 py-2 mt-2 text-blue-600 transition-colors border-2 border-blue-600 rounded-md hover:bg-blue-50 group"
                >
                  View Details
                  <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* View all courses button */}
        <div className="mt-12 text-center">
          <a 
            href="#all-courses" 
            className="btn-primary inline-flex items-center"
          >
            Explore All Robotics Programs
            <ChevronRight size={16} className="ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;