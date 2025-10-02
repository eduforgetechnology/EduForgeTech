import { CheckCircle2, Award, Users, BookOpen } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const AboutSection = () => {
  const features = [
    {
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      title: "Competition-Ready Training",
      description: "Specialized curriculum designed to prepare students for national and international robotics competitions like WRO, WSRO, FTC, and more."
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Complete Robotics Ecosystem",
      description: "Integrated training across mechanical building, electronics, and coding & AI - the three essential pillars of modern robotics."
    },
    {
      icon: <Award className="w-6 h-6 text-blue-600" />,
      title: "Proven Success Record",
      description: "Our students have won multiple national championships and represented India in international robotics competitions."
    }
  ];

  const stats = [
    { value: "5,000+", label: "Students Trained" },
    { value: "320+", label: "Partner Schools" },
    { value: "750+", label: "Educators Certified" },
    { value: "45+", label: "Competition Awards" }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full">About Us</span>
          <h2 className="section-title">Building India's Next Generation of Robotics Champions</h2>
          <p className="section-subtitle">
            At EduForge Technology, we're on a mission to transform robotics education in India through our comprehensive training programs, competition preparation, and educator certification.
          </p>
        </div>

        {/* Two columns: Image and content */}
        <div className="grid items-center grid-cols-1 gap-16 mb-20 tablet:grid-cols-2 lg:grid-cols-2">
          {/* Left column: Image */}
          <div className="relative animate-on-scroll">
            <div className="relative z-10 overflow-hidden rounded-lg shadow-xl animate-float" style={{ animationDuration: '8s' }}>
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                fallbackSrc="https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt="Robotics Vision System" 
                className="w-full h-auto rounded-lg"
                width={600}
                height={400}
                priority={true} // This is an above-the-fold image, load it with priority
                sizes="(max-width: 768px) 100vw, 600px"
                loadingStyle="blur"
                quality={85}
              />
              <p className="text-center text-xs text-gray-500 mt-2">Robotics Vision Systems - Advanced AI Integration</p>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 -z-10"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 -z-10"></div>
          </div>
          
          {/* Right column: Content */}
          <div className="animate-on-scroll">
            <h3 className="mb-4 text-2xl font-bold text-gray-900">Our Story</h3>
            <p className="mb-6 text-lg text-gray-700">
              Founded in 2020 by Lokesh Sharma, EduForge Technology emerged from a vision to revolutionize robotics education in India. What began as a small workshop series in Delhi NCR has rapidly grown into a comprehensive robotics and AI education platform serving students across the country.
            </p>
            <p className="mb-8 text-lg text-gray-700">
              At EduForge, we focus on the three pillars of modern robotics education: mechanical building, electronics, and coding & AI. Our integrated approach ensures students develop a complete understanding of robotics systems while building practical skills that prepare them for competitions and future careers.
            </p>
            
            <ul className="space-y-4">
              {[
                "Specialized robotics curriculum aligned with international competitions",
                "Hands-on learning with real robotics components and systems",
                "Guidance from experienced mentors with competition backgrounds",
                "Access to competition preparation resources and practice facilities",
                "India's only comprehensive robotics training ecosystem"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="flex-shrink-0 w-5 h-5 mt-1 mr-3 text-green-500" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Founder & CEO Section */}
        <div className="mb-20">
          <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-3xl p-8 backdrop-blur-sm border border-blue-100">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                <Users className="h-16 w-16 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Lokesh Sharma</h3>
                <p className="text-blue-600 font-semibold mb-4">Founder & CEO</p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  With over 8 years of experience in robotics education and competitive robotics, 
                  Lokesh has led teams to national and international robotics competitions. His vision 
                  is to make India a global leader in robotics education and innovation.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  A robotics engineer by training and an educator at heart, Lokesh founded EduForge Technology 
                  to bridge the gap between theoretical knowledge and practical application in STEM education. 
                  He has personally trained over 2,000 students and 200+ educators in advanced robotics concepts.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-10 mb-20 md:grid-cols-2 tablet:grid-cols-3 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 transition-all duration-300 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md animate-on-scroll"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="p-4 mb-4 bg-blue-50 rounded-full w-fit">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="p-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl animate-on-scroll">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 tablet:grid-cols-4 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 text-3xl font-bold text-white md:text-4xl lg:text-5xl">{stat.value}</div>
                <div className="text-sm font-medium text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;