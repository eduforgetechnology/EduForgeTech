
export const extractCourseData = () => {
 
  return [
    {
      id: 1,
      title: "Introduction to Python",
      category: "Programming",
      description: "Learn Python programming fundamentals with hands-on projects.",
      duration: "8 weeks",
      level: "Beginner",
      price: "$299",
      topics: ["Python syntax", "Data structures", "Functions", "OOP", "File handling"]
    },
    {
      id: 2,
      title: "Advanced Robotics Framework",
      category: "Robotics",
      description: "Design and build complex robotic systems using industry-standard frameworks.",
      duration: "12 weeks",
      level: "Advanced",
      price: "$799",
      topics: ["Kinematics", "Sensors integration", "Motion planning", "Computer vision", "Control systems"]
    },
    {
      id: 3,
      title: "AI for Beginners",
      category: "Artificial Intelligence",
      description: "Introduction to AI concepts, machine learning fundamentals, and practical applications.",
      duration: "10 weeks",
      level: "Intermediate",
      price: "$499",
      topics: ["Machine learning basics", "Neural networks", "Natural language processing", "Computer vision", "AI ethics"]
    },
    {
      id: 4,
      title: "Electronics and PCB Design",
      category: "Electronics",
      description: "Learn to design and fabricate printed circuit boards for electronic projects.",
      duration: "8 weeks",
      level: "Intermediate",
      price: "$399",
      topics: ["Circuit theory", "Component selection", "Schematic capture", "PCB layout", "Prototyping"]
    }
  ];
};

// Function to extract competition information
export const extractCompetitionData = () => {
  return [
    {
      id: 1,
      title: "Annual Robotics Challenge",
      date: "November 15-20, 2025",
      description: "Design and program robots to complete a series of challenges and obstacles.",
      prizes: "$5,000 in prizes",
      eligibility: "Open to all age groups with separate categories",
      registration: "Open until November 1, 2025"
    },
    {
      id: 2,
      title: "Code Jam Hackathon",
      date: "December 5-7, 2025",
      description: "48-hour coding challenge to build innovative solutions for real-world problems.",
      prizes: "Internship opportunities and $3,000 in prizes",
      eligibility: "College students and recent graduates",
      registration: "Open until November 25, 2025"
    },
    {
      id: 3,
      title: "Young Inventors Competition",
      date: "January 10, 2026",
      description: "Showcase creative technology solutions and inventions developed by young minds.",
      prizes: "Scholarships and mentorship opportunities",
      eligibility: "Students aged 13-18",
      registration: "Open until December 15, 2025"
    }
  ];
};

// Function to extract educator information
export const extractEducatorData = () => {
  return [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Artificial Intelligence",
      background: "Former AI researcher at Google with 10+ years of industry experience",
      courses: ["AI for Beginners", "Machine Learning Applications"]
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      specialty: "Robotics Engineering",
      background: "Robotics PhD from MIT and founder of two robotics startups",
      courses: ["Advanced Robotics Framework", "Embedded Systems Design"]
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      specialty: "Software Development",
      background: "Senior developer with 15+ years experience at Microsoft and Amazon",
      courses: ["Introduction to Python", "Web Application Development"]
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Electronics",
      background: "Electronics engineer with 20+ patents in circuit design",
      courses: ["Electronics and PCB Design", "Digital Signal Processing"]
    }
  ];
};

// Function to generate a response based on website content
export const generateContentBasedResponse = (query) => {
  const lowerQuery = query.toLowerCase();
  
  // Course-specific queries
  if (lowerQuery.includes('python') || (lowerQuery.includes('programming') && lowerQuery.includes('course'))) {
    const pythonCourse = extractCourseData().find(c => c.title.includes('Python'));
    return `Our "${pythonCourse.title}" course is an ${pythonCourse.level}-level ${pythonCourse.duration} program priced at ${pythonCourse.price}. It covers ${pythonCourse.topics.join(', ')}, and includes hands-on projects. Would you like to know more or register?`;
  }
  
  if (lowerQuery.includes('robotics') || lowerQuery.includes('robot')) {
    const roboticsCourse = extractCourseData().find(c => c.title.includes('Robotics'));
    return `Our "${roboticsCourse.title}" is an ${roboticsCourse.level}-level course that runs for ${roboticsCourse.duration}. The course costs ${roboticsCourse.price} and covers ${roboticsCourse.topics.join(', ')}. It's taught by Prof. Michael Chen, who has a Robotics PhD from MIT.`;
  }
  
  if (lowerQuery.includes('ai') || lowerQuery.includes('artificial intelligence') || lowerQuery.includes('machine learning')) {
    const aiCourse = extractCourseData().find(c => c.title.includes('AI'));
    return `Our "${aiCourse.title}" course is ${aiCourse.duration} long and costs ${aiCourse.price}. It's taught by Dr. Sarah Johnson, former AI researcher at Google, and covers topics like ${aiCourse.topics.join(', ')}.`;
  }
  
  // Competition-specific queries
  if (lowerQuery.includes('robotics challenge') || (lowerQuery.includes('robot') && lowerQuery.includes('competition'))) {
    const competition = extractCompetitionData().find(c => c.title.includes('Robotics'));
    return `The "${competition.title}" is scheduled for ${competition.date}. ${competition.description} There's ${competition.prizes} to be won! Registration is ${competition.registration}.`;
  }
  
  if (lowerQuery.includes('hackathon') || lowerQuery.includes('code jam')) {
    const hackathon = extractCompetitionData().find(c => c.title.includes('Code Jam'));
    return `Our "${hackathon.title}" is a ${hackathon.description} It's scheduled for ${hackathon.date} with ${hackathon.prizes}. It's open to ${hackathon.eligibility} and registration is ${hackathon.registration}.`;
  }
  
  // Instructor-specific queries
  if (lowerQuery.includes('instructor') || lowerQuery.includes('teacher') || lowerQuery.includes('professor')) {
    const instructors = extractEducatorData();
    return `We have expert instructors including ${instructors.map(i => i.name).join(', ')}. They have backgrounds from companies like Google, Microsoft, and Amazon, and institutions like MIT. Would you like to know about a specific instructor?`;
  }
  
  // Return null if no specific content-based response was generated
  return null;
};

// Function to analyze user query and extract main topics
export const analyzeUserQuery = (query) => {
  const lowerQuery = query.toLowerCase();
  
  // Define categories and their keywords
  const categories = {
    courses: ['course', 'class', 'learn', 'study', 'curriculum', 'program'],
    pricing: ['price', 'cost', 'fee', 'expensive', 'cheap', 'discount', 'payment'],
    schedule: ['time', 'schedule', 'when', 'date', 'duration', 'long', 'start'],
    registration: ['register', 'sign up', 'join', 'enroll', 'apply'],
    requirements: ['require', 'need', 'prerequisite', 'necessary', 'equipment'],
    instructors: ['instructor', 'teacher', 'professor', 'expert', 'taught by', 'who teaches']
  };
  
  // Check which categories are mentioned in the query
  const matchedCategories = [];
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      matchedCategories.push(category);
    }
  }
  
  return {
    matchedCategories,
    hasSpecificCourse: extractCourseData().some(course => 
      lowerQuery.includes(course.title.toLowerCase()) || 
      lowerQuery.includes(course.category.toLowerCase())
    ),
    hasSpecificCompetition: extractCompetitionData().some(comp => 
      lowerQuery.includes(comp.title.toLowerCase())
    )
  };
};