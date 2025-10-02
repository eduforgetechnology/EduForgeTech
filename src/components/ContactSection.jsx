import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Check, Loader2 } from 'lucide-react';
import useImagePreloader from '../utils/useImagePreloader';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });
  
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);
  
  // Preload map after a delay to prioritize more important content
  useImagePreloader(['https://maps.googleapis.com/maps/api/staticmap?center=28.53524608245446,77.20175841503493&zoom=15&size=600x400&key=AIzaSyD4iE2xVSpkLLOXoyqT-RuPwURN3ddScAI'], 2000);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ isSubmitting: true, isSubmitted: false, error: null });
    
    // Send data to Formspree
    fetch("https://formspree.io/f/myznjpne", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (response.ok) {
          setFormStatus({
            isSubmitting: false,
            isSubmitted: true,
            error: null
          });
          
          // Reset form after successful submission
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
          });
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setFormStatus({
          isSubmitting: false,
          isSubmitted: false,
          error: "Failed to send message. Please try again later."
        });
      });
  };

  const contactInfo = [
    {
      icon: <Mail className="text-blue-600" />,
      title: "Email",
      details: "lokesh.sharma@eduforge.in",
      link: "mailto:lokesh.sharma@eduforge.in"
    },
    {
      icon: <Phone className="text-blue-600" />,
      title: "Phone",
      details: "+91 7505581796",
      link: "tel:+917505581796"
    },
    {
      icon: <MapPin className="text-blue-600" />,
      title: "Address",
      details: "31, Begampur, Malviya Nagar, Delhi NCR, India, PIN 110017",
      link: "https://maps.google.com/?q=31+Begampur+Malviya+Nagar+New+Delhi+110017"
    },
    {
      icon: <Clock className="text-blue-600" />,
      title: "Office Hours",
      details: "10AM-7PM IST, Monday-Saturday",
      link: null
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full">Contact Us</span>
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            Have questions about our courses, competitions, or anything else? We're here to help! Reach out to us using the form below or through our contact information.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Contact information */}
          <div className="lg:col-span-1">
            <div className="p-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white h-full">
              <h3 className="mb-6 text-2xl font-bold">Contact Information</h3>
              <p className="mb-8">
                We'd love to hear from you! Fill out the form and we'll be in touch as soon as possible.
              </p>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="p-3 mr-4 bg-white bg-opacity-20 rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      {item.link ? (
                        <a href={item.link} className="block mt-1 hover:underline">
                          {item.details}
                        </a>
                      ) : (
                        <p className="mt-1">{item.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex mt-12 space-x-4">
                <a 
                  href="https://facebook.com/eduforge"
                  className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
                  target="_blank" 
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
                <a 
                  href="https://twitter.com/eduforge"
                  className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
                  target="_blank" 
                  rel="noreferrer"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com/company/eduforge"
                  className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
                  target="_blank" 
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                  </svg>
                </a>
                <a 
                  href="https://instagram.com/eduforge"
                  className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
                  target="_blank" 
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact form */}
          <div className="p-8 bg-white border border-gray-100 shadow-md rounded-xl lg:col-span-2">
            {formStatus.isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                <div className="p-4 mb-4 bg-green-100 rounded-full">
                  <Check size={40} className="text-green-600" />
                </div>
                <h3 className="mb-2 text-2xl font-bold">Message Sent!</h3>
                <p className="mb-6 text-gray-600">
                  Thank you for contacting us! We'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setFormStatus({...formStatus, isSubmitted: false})}
                  className="px-6 py-2 text-blue-600 transition-colors border-2 border-blue-600 rounded-md hover:bg-blue-50"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {formStatus.error && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                    <p>{formStatus.error}</p>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-700">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Course Inquiry"
                    />
                    <input type="hidden" name="_subject" value={formData.subject} />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                </div>
                
                {/* Honeypot field to prevent spam */}
                <div className="hidden">
                  <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" />
                </div>
                
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={formStatus.isSubmitting}
                    className="inline-flex items-center justify-center px-6 py-3 text-white transition-all rounded-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-70"
                  >
                    {formStatus.isSubmitting ? (
                      <>
                        <Loader2 size={18} className="mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        
        {/* Map - lazy loaded */}
        <div className="mt-16 overflow-hidden rounded-xl shadow-md">
          <div className="relative h-[400px] w-full bg-gray-100">
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <iframe
              ref={mapRef}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.3215525861104!2d77.20175841503493!3d28.53524608245446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1e9c2dc74c05%3A0xf2b9d79042c4a7a0!2sMalviya%20Nagar%2C%20New%20Delhi%2C%20Delhi%20110017!5e0!3m2!1sen!2sin!4v1633174730852!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0, opacity: mapLoaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
              allowFullScreen=""
              loading="lazy"
              title="EduForge Location in Delhi NCR"
              onLoad={() => setMapLoaded(true)}
            ></iframe>
          </div>
        </div>
        
        {/* FAQ section */}
        <div className="mt-20">
          <h3 className="mb-8 text-2xl font-bold text-center">Frequently Asked Questions</h3>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                question: "How do I enroll in a course?",
                answer: "You can enroll in a course by navigating to the course page and clicking on the 'Enroll Now' button. Follow the instructions to complete your registration and payment."
              },
              {
                question: "Are there any prerequisites for courses?",
                answer: "Prerequisites vary by course. Basic courses typically don't require prior knowledge, while advanced courses may require specific skills or completion of prerequisite courses."
              },
              {
                question: "Do you offer financial aid or scholarships?",
                answer: "Yes, we offer scholarships and financial aid options for eligible students. Please contact our admissions team for more information and application details."
              },
              {
                question: "Can I switch courses after enrollment?",
                answer: "Course transfers are possible within the first week of enrollment. Please contact our student support team to discuss your specific situation."
              }
            ].map((faq, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-xl">
                <h4 className="mb-3 text-lg font-bold">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;