import { useState, useEffect } from 'react';
import { Trophy, Calendar, MapPin, Clock, Users, ChevronRight, Loader2 } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const CompetitionSection = () => {
  // Tabs for different competition types
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isLoading, setIsLoading] = useState(false);
  
  const competitions = {
    upcoming: [
      {
        id: 0,
        title: "FIRST Robotics Competition",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        fallbackImage: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        date: "March 5-10, 2026",
        location: "Multiple Regional Events & Championship in Houston, TX",
        description: "The FIRST Robotics Competition is the premier international high school robotics competition where teams build industrial-size robots to play challenging field games.",
        prize: "$80,000+ in college scholarships",
        participants: "3,900+ teams worldwide",
        registrationDeadline: "December 1, 2025",
        registrationLink: "https://www.firstinspires.org/robotics/frc/register"
      },
      {
        id: 1,
        title: "World Robot Olympiad (WRO)",
        image: "https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        date: "November 5-8, 2026",
        location: "Delhi NCR, India (National Finals)",
        description: "WRO is an international robotics competition that brings together young people from all over the world to develop creativity and problem-solving skills through robotics challenges.",
        prize: "National recognition & international qualification",
        participants: "400+ teams in India, 28,000+ worldwide",
        registrationDeadline: "July 15, 2026",
        registrationLink: "https://www.wro-association.org"
      },
      {
        id: 2,
        title: "VEX Robotics Competition",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        date: "April 20-22, 2026",
        location: "Dallas, TX (World Championship)",
        description: "The VEX Robotics Competition is the largest and fastest growing middle school and high school robotics program globally with more than 20,000 teams from 50+ countries.",
        prize: "$2 million in college scholarships",
        participants: "20,000+ teams worldwide",
        registrationDeadline: "November 20, 2025",
        registrationLink: "https://www.vexrobotics.com/competition"
      },
      {
        id: 3,
        title: "FIRST Tech Challenge (FTC)",
        image: "https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        date: "January 25-30, 2026",
        location: "Multiple Regional Events Across India",
        description: "FIRST Tech Challenge teams design, build, program, and operate robots to compete in a head-to-head challenge in an alliance format. Teams are required to develop strategy and build robots.",
        prize: "$80 million in college scholarships",
        participants: "7,000+ teams in 45+ countries",
        registrationDeadline: "October 28, 2025",
        registrationLink: "https://www.firstinspires.org/robotics/ftc"
      },
      {
        id: 4,
        title: "RoboCup International",
        image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        date: "July 15-21, 2026",
        location: "Tokyo, Japan",
        description: "RoboCup is an international scientific initiative with the goal to advance the state of the art of intelligent robots through competitions like robot soccer, rescue, and home assistance challenges.",
        prize: "International recognition & research opportunities",
        participants: "3,500+ participants from 45+ countries",
        registrationDeadline: "May 1, 2026",
        registrationLink: "https://www.robocup.org"
      }
    ],
    ongoing: [
      {
        id: 4,
        title: "FIRST LEGO League Challenge",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        date: "October 1 - December 15, 2025",
        location: "Multiple Regional Events Across India",
        description: "FIRST LEGO League is an international competition for elementary and middle school students that introduces younger students to real-world engineering challenges by building LEGO-based robots.",
        prize: "National recognition & global opportunities",
        participants: "35,000+ teams worldwide",
        registrationDeadline: "Open now"
      }
    ],
    past: [
      {
        id: 5,
        title: "International Aerial Robotics Competition (IARC)",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        date: "August 15-17, 2025",
        location: "Bengaluru, India (Asia-Pacific Challenge)",
        description: "IARC is the longest running collegiate aerial robotics challenge in the world, challenging teams to create autonomous aerial systems capable of complex missions.",
        prize: "$10,000",
        participants: "40+ university teams",
        winner: "IIT Delhi - Autonomous Navigation System"
      },
      {
        id: 6,
        title: "NASA Space Apps Challenge",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        date: "July 5-7, 2023",
        location: "Virtual (Online)",
        description: "Identify and solve cybersecurity vulnerabilities in simulated environments.",
        prize: "$12,000",
        participants: "75+ teams",
        winner: "Team SecureMatrix - Advanced Threat Detection System"
      }
    ]
  };

  return (
    <section id="competitions" className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full">Competitions</span>
          <h2 className="section-title">Put Your Skills to the Test</h2>
          <p className="section-subtitle">
            Participate in exciting competitions and hackathons to challenge yourself, gain practical experience, and win amazing prizes.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-12 space-x-1">
          {[
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'ongoing', label: 'Ongoing' },
            { id: 'past', label: 'Past Competitions' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                if (activeTab !== tab.id) {
                  setIsLoading(true);
                  setActiveTab(tab.id);
                  setTimeout(() => setIsLoading(false), 200);
                }
              }}
              className={`px-6 py-3 text-sm font-medium transition-all rounded-lg ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Competition cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            // Loading state - show skeleton cards
            Array.from({ length: 3 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="overflow-hidden bg-white border border-gray-100 rounded-xl shadow-sm animate-pulse">
                <div className="relative overflow-hidden h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-100 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded mb-2 w-4/5"></div>
                  <div className="h-4 bg-gray-100 rounded mb-4 w-2/3"></div>
                  <div className="h-20 bg-gray-100 rounded-lg mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded-md"></div>
                </div>
              </div>
            ))
          ) : (
            competitions[activeTab].map((competition) => (
              <div 
                key={competition.id}
                className="overflow-hidden bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 animate-on-scroll"
              >
                <div className="relative overflow-hidden h-48">
                  <OptimizedImage 
                    src={competition.image} 
                    alt={competition.title} 
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                    fallbackSrc={competition.fallbackImage}
                    loadingStyle="skeleton"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={75}
                  />
                  {activeTab === 'past' && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="px-4 py-2 bg-white rounded-md">
                        <span className="font-bold text-blue-600">Completed</span>
                      </div>
                    </div>
                  )}
                </div>
              
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold">{competition.title}</h3>
                
                <div className="mb-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-blue-600" />
                    {competition.date}
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2 text-blue-600" />
                    {competition.location}
                  </div>
                  {activeTab !== 'past' && (
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2 text-blue-600" />
                      Registration Deadline: {competition.registrationDeadline}
                    </div>
                  )}
                </div>
                
                <p className="mb-4 text-gray-600">{competition.description}</p>
                
                {competition.image && competition.image.includes('unsplash.com') && (
                  <div className="mb-2">
                    <p className="text-xs text-gray-400">Image: Unsplash</p>
                  </div>
                )}
                
                <div className="p-4 mb-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Trophy size={18} className="mr-2 text-yellow-500" />
                    <span className="font-medium">Prize: {competition.prize}</span>
                  </div>
                  <div className="flex items-center">
                    <Users size={18} className="mr-2 text-blue-600" />
                    <span>{competition.participants}</span>
                  </div>
                  {activeTab === 'past' && (
                    <div className="flex items-center mt-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Winner: {competition.winner}</span>
                    </div>
                  )}
                </div>
                
                {activeTab !== 'past' ? (
                  <a 
                    href={competition.registrationLink || `#competition-${competition.id}`} 
                    target={competition.registrationLink ? "_blank" : "_self"}
                    rel={competition.registrationLink ? "noopener noreferrer" : ""}
                    className="flex items-center justify-center w-full px-4 py-2 text-white transition-all bg-blue-600 rounded-md hover:bg-blue-700 group"
                  >
                    Register Now
                    <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </a>
                ) : (
                  <a 
                    href={`#competition-details-${competition.id}`} 
                    className="flex items-center justify-center w-full px-4 py-2 text-blue-600 transition-colors border-2 border-blue-600 rounded-md hover:bg-blue-50 group"
                  >
                    View Details
                    <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </a>
                )}
              </div>
            </div>
            ))
          )}
        </div>
        
        {/* Featured competition banner */}
        <div className="p-6 mt-16 overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl md:p-10">
          <div className="grid items-center grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-white uppercase bg-blue-500 bg-opacity-30 rounded-full">Featured Competition</span>
              <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">Space Robotics Challenge</h3>
              <p className="mb-6 text-blue-100">
                Join India's premier robotics challenge focusing on autonomous systems for space exploration. Design robots that can operate in extreme environments with minimal human intervention. Compete for a prize pool of ₹10,00,000 and potential research internships.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="px-4 py-2 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
                  <Calendar size={16} className="inline mr-2 text-white" />
                  <span className="text-white">March 5-10, 2026</span>
                </div>
                <div className="px-4 py-2 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
                  <MapPin size={16} className="inline mr-2 text-white" />
                  <span className="text-white">Houston, TX (Finals)</span>
                </div>
              </div>
              <div className="px-4 py-2 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm inline-block mb-6">
                <Trophy size={16} className="inline mr-2 text-yellow-300" />
                <span className="text-white">Prize Pool: $150,000</span>
              </div>
              <a 
                href="https://www.nasa.gov/space-robotics-challenge" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 font-medium text-blue-600 transition-colors bg-white rounded-md hover:bg-blue-50 group"
              >
               Learn more about the Space Robotics Challenge
                <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <div className="hidden md:block">
              <OptimizedImage 
                src="https://images.nasa.gov/images/SPL_SRC_033021_f840.width-1600.jpg"
                loadingStyle="skeleton" 
                sizes="(max-width: 768px) 0vw, (max-width: 1280px) 40vw, 480px"
                quality={80}
                alt="NASA Space Robotics Challenge" 
                className="object-cover w-full h-64 rounded-xl shadow-lg"
                fallbackSrc="https://images.unsplash.com/photo-1541185934-01b600ea0e28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              />
            </div>
          </div>
        </div>
        
        {/* Additional Competitions */}
        <div className="mt-16 mb-20">
          <h3 className="mb-8 text-2xl font-bold text-center text-gray-800">Additional Global Competitions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 tablet:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: 'WRO', description: 'World Robot Olympiad', icon: '🏆' },
              { name: 'WSRO', description: 'World School Robot Olympiad', icon: '🥇' },
              { name: 'FTC', description: 'FIRST Tech Challenge', icon: '🤖' },
              { name: 'VEX', description: 'VEX Robotics Competition', icon: '⚙️' },
              { name: 'Codeavour', description: 'AI & Coding Competition', icon: '💻' },
              { name: 'iCode', description: 'International Coding Challenge', icon: '🔥' }
            ].map((comp, index) => (
              <div key={index} className="group bg-gradient-to-br from-white/5 to-white/10 p-6 rounded-2xl backdrop-blur-sm border border-gray-100 hover:border-blue-400/50 transition-all duration-300 hover:-translate-y-2 text-center">
                <div className="text-4xl mb-4">{comp.icon}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{comp.name}</h3>
                <p className="text-gray-600 text-sm">{comp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Competition Tuition & Preparation */}
        <div id="competitions-tuition" className="mt-16 bg-blue-50 py-16 rounded-3xl">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full">Tuition Services</span>
              <h3 className="text-3xl font-bold mb-4 text-gray-800">Competition Preparation Tuition</h3>
              <p className="text-gray-600 text-lg">
                Professional tuition and coaching services to prepare you for success in any robotics or programming competition.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 tablet:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Tuition Card 1 */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-center mb-3">One-on-One Coaching</h4>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Personalized learning plans</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Expert coaches from top institutions</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Flexible scheduling options</span>
                  </li>
                </ul>
                <div className="text-center font-bold text-lg mb-4">₹2,500 per session</div>
                <a href="#tuition-details" className="block w-full text-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Learn More
                </a>
              </div>

              {/* Tuition Card 2 */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-center mb-3">Group Training</h4>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Small groups (4-6 students)</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Collaborative problem solving</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Weekly 2-hour sessions</span>
                  </li>
                </ul>
                <div className="text-center font-bold text-lg mb-4">₹1,800 per session</div>
                <a href="#tuition-details" className="block w-full text-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Learn More
                </a>
              </div>

              {/* Tuition Card 3 */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-center mb-3">Competition Bootcamp</h4>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Intensive weekend training</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Competition simulation</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>All materials included</span>
                  </li>
                </ul>
                <div className="text-center font-bold text-lg mb-4">₹8,500 per weekend</div>
                <a href="#tuition-details" className="block w-full text-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Learn More
                </a>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <a href="#contact" className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
                Book a Free Consultation
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Partners section */}
        <div className="mt-20">
          <h3 className="mb-8 text-xl font-bold text-center text-gray-800">Our Competition Partners</h3>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
            {/* NASA */}
            <div className="flex items-center justify-center p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" viewBox="0 0 110.3 91.3">
                  <path style={{fill:'#0b3d91'}} d="M50.4 91.3c-1.8 0-3.6-.1-5.5-.3l.4-1.8c1.8.2 3.6.3 5.4.3 19.2 0 36.5-10.9 44.7-28.4-8.1 14.1-23.3 23.7-40.7 23.7C25 84.8 1.4 61.1 1.4 31.5c0-1.1 0-2.3.1-3.4C2.3 52.9 23.2 74 48.8 74c28.3 0 40.1-13.2 40.1-13.2-7.6 18.2-25.3 30.5-45.3 30.5H43l.1-1.6h.1c27.2 0 49.3-22.1 49.3-49.3 0-2.3-.2-4.7-.5-7-3-23-22.4-40.8-46.1-40.8-2 0-4 .1-5.9.4L39.4.2c2-.1 4-.2 6-.2C71.3 0 92.5 18.9 95.9 43.4c.4 2.6.6 5.2.6 7.9 0 25.7-20.9 46.6-46.7 46.6"/>
                  <path style={{fill:'#0b3d91'}} d="M39.1 52.4s-1.6-1.5-2.2-4.2c-.6-2.6.6-5.4.6-5.4-4.4-1.1-8 .9-8 .9s1.2 3.2 3.8 5c2.6 1.9 5.8 3.7 5.8 3.7zM84.4 49.4c-.6 4.8-3 8.4-3 8.4s4.6-1.2 7.8-5.4c1.5-2 3.2-6 3.2-6s-7.1-1.9-8 3z"/>
                  <path style={{fill:'#fc3d21'}} d="M16.5 58.6L16.4 62h.9L17 58.6h2.1l.4 3.3h.9l-.2-3.3h1.2l-.1 3.3h.9l.5-3.3h4.1l-.5 3.3h.9l.7-3.3h1.3l-.3 3.3h.9l.1-3.3h4.1l-.1 3.3h.9l.3-3.3H38l-.2 3.3h.9l.5-3.3h1.2l-.5 3.3h.9l.3-3.3h4l-.3 3.3h.9l.5-3.3h1.2l-.5 3.3h.9l.3-3.3h4.1l-.3 3.3h.9l.5-3.3h1.2l-.5 3.3h.9l.3-3.3h4.1l-.3 3.3h.9l.5-3.3h1.2l-.5 3.3h.9l.3-3.3h4l-.3 3.3h.9l.5-3.3h1.2l-.5 3.3h.9l.3-3.3h4.1l-.3 3.3h.9l.5-3.3h1.2l-.5 3.3h.9l.3-3.3h2.1l-.3 3.3h.9l.3-3.3 1.6.1L82 62h.9l-.1-3.4z"/>
                </svg>
                <span className="text-sm font-bold text-center mt-2">National Aeronautics and<br />Space Administration</span>
              </div>
            </div>
            {/* FIRST Robotics */}
            <div className="flex items-center justify-center p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" viewBox="0 0 64 64">
                  <style>{`.st0{fill:#0066B3;}`}</style>
                  <g>
                    <path className="st0" d="M50.1,28.8v10.6h-3.8v-3.8H17.7v3.8h-3.8V28.8H8.5v3.8H4.7v3.8h3.8v3.8h5.4v-7.6h36.1v7.6h5.4v-3.8h3.8v-3.8   h-3.8v-3.8H50.1z"/>
                    <path className="st0" d="M24,24l2.9-3.2l2.9,3.2l-2.9-9.1L24,24z M28,24.9l3.8-0.8l1.5,3.8l1.7-9.5L28,24.9z M34.1,24.9l3.8,0.8   l-7-6.6l1.7,9.5L34.1,24.9z M38.8,26.5l3.2,2.2l-8.7-2.9l6,7.3L38.8,26.5z M42.6,29.4l2.1,3.3l-8.5,1.2l8.9,2.6L42.6,29.4z    M44.6,33.7l0.6,3.9l-7-5.3l10,6.7L44.6,33.7z M45,38.5v4l-4.4-8l9.6,9.5L45,38.5z M44.6,43.3l-0.9,3.8l-1.3-9.4l7.7,11.1   L44.6,43.3z M43.1,47.9l-1.8,3.5l1.9-9.3l5.1,11.9L43.1,47.9z M40.7,52l-2.5,2.9l4.9-8.4l2.2,11.8L40.7,52z M37.6,55.5l-3.2,2   7.4-6.8l-0.9,11L37.6,55.5z M33.8,58l-3.8,0.9l9.2-4.5l-3.9,9.5L33.8,58z M29.4,59.1l-3.8-0.3l10.3-1.8l-6.5,7.2L29.4,59.1z    M25.2,58.7l-3.6-1.4l10.6,0.9l-8.5,4.4L25.2,58.7z M21.2,56.9l-3.1-2.4l10,3.7l-9.9,1.3L21.2,56.9z M17.7,53.8l-2.4-3.1   l8.7,6.2L16,58.1L17.7,53.8z M15,50l-1.4-3.6l6.9,8.1l-8.5-2L15,50z M13.2,45.8l-0.4-3.8l4.7,9.4l-7.5-5.3L13.2,45.8z M12.6,41.4   l0.6-3.8l2.3,10l-6-7.6L12.6,41.4z M13.1,36.9l1.6-3.5l-0.3,9.9l-3.9-9.1L13.1,36.9z M15.2,32.7l2.4-3l-2.9,9.1l-1.6-10.1   L15.2,32.7z M18.2,29.2l3.1-2.3l-5.2,7.7l0.7-10.3L18.2,29.2z M21.9,26.5l3.5-1.3l-7.1,5.8l3-10L21.9,26.5z"/>
                  </g>
                </svg>
                <span className="text-sm font-bold text-center mt-2">FIRST Robotics<br />Competition</span>
              </div>
            </div>
            {/* VEX Robotics */}
            <div className="flex items-center justify-center p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" viewBox="0 0 250 82" fill="none">
                  <path d="M101.683 22.2924H89.9646V59.7076H101.683V22.2924Z" fill="black"/>
                  <path d="M118.736 59.7076V22.2924H107.017V59.7076H118.736Z" fill="black"/>
                  <path d="M172.915 45.3149V22.2924H161.196V59.7076H172.915V45.3149Z" fill="black"/>
                  <path d="M147.52 22.2924H135.802V59.7076H147.52V22.2924Z" fill="black"/>
                  <path d="M45.9569 59.7075H57.6758V22.2923H45.9569V59.7075Z" fill="black"/>
                  <path d="M19.1445 22.2924H7.42578V59.7076H19.1445V22.2924Z" fill="black"/>
                  <path d="M205.233 22.2924H193.514V59.7076H205.233V22.2924Z" fill="black"/>
                  <path d="M190.366 22.2924H178.647V59.7076H190.366V22.2924Z" fill="black"/>
                  <path d="M224.871 59.7076V22.2924H213.152V59.7076H224.871Z" fill="black"/>
                  <path d="M232.735 22.2924V59.7076H244.453V22.2924H232.735Z" fill="black"/>
                  <path d="M85.5921 22.2924H73.873V59.7076H85.5921V22.2924Z" fill="black"/>
                  <path d="M70.7285 22.2924H59.0098V59.7076H70.7285V22.2924Z" fill="black"/>
                  <path d="M131.213 22.2924H119.494V59.7076H131.213V22.2924Z" fill="black"/>
                  <path d="M158.056 22.2924H146.338V59.7076H158.056V22.2924Z" fill="black"/>
                  <path d="M41.3745 22.2924H29.6558V59.7076H41.3745V22.2924Z" fill="black"/>
                  <path d="M27.0191 22.2924H15.3003V59.7076H27.0191V22.2924Z" fill="black"/>
                </svg>
                <span className="text-sm font-bold text-center mt-2">VEX Robotics</span>
              </div>
            </div>
            {/* Sensors & PCB Design */}
            <div className="flex items-center justify-center p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="60" viewBox="0 0 100 60">
                  <g fill="#008000">
                    <path d="M10,10 L90,10 L90,50 L10,50 Z" fill="none" stroke="#008000" strokeWidth="2" />
                    <circle cx="25" cy="25" r="5" />
                    <circle cx="45" cy="25" r="5" />
                    <circle cx="65" cy="25" r="5" />
                    <circle cx="85" cy="25" r="5" />
                    <circle cx="25" cy="45" r="5" />
                    <circle cx="45" cy="45" r="5" />
                    <circle cx="65" cy="45" r="5" />
                    <circle cx="85" cy="45" r="5" />
                    <path d="M25,25 L45,25" stroke="#008000" strokeWidth="2" />
                    <path d="M45,25 L65,25" stroke="#008000" strokeWidth="2" />
                    <path d="M65,25 L85,45" stroke="#008000" strokeWidth="2" />
                    <path d="M25,45 L45,25" stroke="#008000" strokeWidth="2" />
                    <path d="M45,45 L65,25" stroke="#008000" strokeWidth="2" />
                  </g>
                </svg>
                <span className="text-sm font-bold text-center mt-2">Sensors & PCB<br />Design</span>
              </div>
            </div>
            {/* RoboCup */}
            <div className="flex items-center justify-center p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-blue-100 p-3">
                  <div className="rounded-full bg-blue-600 p-3">
                    <div className="text-2xl font-bold text-white">R</div>
                  </div>
                </div>
                <span className="text-sm font-bold text-center mt-2">RoboCup<br />International</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitionSection;