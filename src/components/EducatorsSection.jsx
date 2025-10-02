import { BookOpen, Award, Users, ArrowRight, CheckCircle } from 'lucide-react';

const EducatorsSection = () => {
  const programs = [
    {
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      title: "Curriculum Development",
      description: "Comprehensive STEM curriculum planning and development tailored to different grade levels and learning objectives."
    },
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: "Hands-on Workshop Training",
      description: "Practical workshops that teach educators how to facilitate engaging robotics and AI learning experiences."
    },
    {
      icon: <Award className="h-6 w-6 text-blue-600" />,
      title: "Certification Programs",
      description: "Industry-recognized certifications that validate educators' expertise in teaching cutting-edge technology."
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-blue-600" />,
      title: "Ongoing Support & Resources",
      description: "Continuous access to teaching materials, lesson plans, and a community of STEM educators."
    }
  ];

  return (
    <section id="educators" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full">For Educators</span>
          <h2 className="section-title">Teacher Training Programs</h2>
          <p className="section-subtitle">
            Empower educators with comprehensive training in robotics and AI education. Our programs equip teachers with the skills and knowledge to effectively deliver cutting-edge STEM education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column: Image */}
          <div className="relative animate-on-scroll">
            <div className="relative z-10 overflow-hidden rounded-lg shadow-xl animate-float" style={{ animationDuration: '8s' }}>
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                alt="Teacher training session" 
                className="w-full h-auto rounded-lg"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 -z-10"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 -z-10"></div>
          </div>
          
          {/* Right column: Content */}
          <div className="space-y-8 animate-on-scroll">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Elevate Your Teaching</h3>
              <p className="text-lg text-gray-700">
                Our teacher training programs are designed to transform educators into confident STEM instructors capable of inspiring the next generation of innovators. With a focus on practical, hands-on learning, we ensure teachers can effectively implement robotics and AI education in their classrooms.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {programs.map((program, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-blue-50 p-3 rounded-lg mr-4">
                    {program.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{program.title}</h4>
                    <p className="text-gray-600">{program.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a 
                href="#educator-programs" 
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors group"
              >
                Learn more about our educator programs
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Enhanced Teacher Training Section */}
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl p-8 backdrop-blur-sm border border-white/10 mt-16 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-gray-900">Teacher Training Programs</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Empower educators with comprehensive training in robotics and AI education. 
                Our programs equip teachers with the skills and knowledge to effectively 
                deliver cutting-edge STEM education.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Curriculum Development</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Hands-on Workshop Training</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Certification Programs</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Ongoing Support & Resources</span>
                </li>
              </ul>
              <a
                href="#join-training"
                className="inline-block px-6 py-3 text-white transition-all rounded-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Join Training Program
              </a>
            </div>
            <div className="relative">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                <div className="text-gray-700">Teachers Trained</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-blue-600 md:text-4xl">500+</div>
            <p className="text-gray-600">Educators Trained</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-blue-600 md:text-4xl">200+</div>
            <p className="text-gray-600">Partner Schools</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-blue-600 md:text-4xl">45+</div>
            <p className="text-gray-600">Custom Curricula</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-blue-600 md:text-4xl">95%</div>
            <p className="text-gray-600">Satisfaction Rate</p>
          </div>
        </div>
        
        {/* Testimonial */}
        <div className="mt-16 bg-white p-8 rounded-xl shadow-md border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img 
              src="https://randomuser.me/api/portraits/women/76.jpg" 
              alt="Educator testimonial" 
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <p className="text-gray-700 italic mb-4">
                "The EduForge teacher training program completely transformed how I teach STEM subjects. My students are now more engaged than ever, and I feel confident introducing complex concepts through hands-on robotics activities. The ongoing support from their team has been invaluable."
              </p>
              <div>
                <h4 className="font-bold">Dr. Sarah Johnson</h4>
                <p className="text-sm text-gray-600">Science Department Chair, Lincoln High School</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <a 
            href="#educator-signup" 
            className="btn-primary inline-flex items-center"
          >
            Become a Certified Educator
            <ArrowRight size={16} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default EducatorsSection;