import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import CourseSection from './components/CourseSection'
import CompetitionSection from './components/CompetitionSection'
import EducatorsSection from './components/EducatorsSection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && 
            scrollPosition <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load

    // Add intersection observer for animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Header activeSection={activeSection} />
      <main>
        <Hero />
        <AboutSection />
        <CourseSection />
        <CompetitionSection />
        <EducatorsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatBot />
    </>
  )
}

export default App