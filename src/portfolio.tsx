import React, { useState, useEffect, useRef } from 'react';
import { Globe, Code, Server, Shield, ExternalLink, Mail, Linkedin, Menu, X, Github } from 'lucide-react';
import profilePhoto from './assets/images/profile-photo.png';
import logoMogo from './assets/images/logos/logo-mogo.png';
import logoMoka from './assets/images/logos/logo-moka.png';
import logoSblive from './assets/images/logos/logo-sblive.svg';
import logoFlash from './assets/images/logos/logo-flash.jpg';
import logo500 from './assets/images/logos/logo-500.jpg';
import logoOozou from './assets/images/logos/logo-oozou.png';
// Project screenshots
import screenshotMogoTrade from './assets/images/projects/screenshot-mogo-trade.png';
import screenshotMoka from './assets/images/projects/screenshot-moka.png';
import screenshotMogoMoney from './assets/images/projects/screenshot-mogo-money.png';
import screenshotSblive from './assets/images/projects/screenshot-sblive.png';
import screenshotFlashfunders from './assets/images/projects/screenshot-flashfunders.png'

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Refs for sections to observe
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  
  useEffect(() => {
    // Set loaded state after initial render
    setIsLoaded(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['home', 'aboutme', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && 
            scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    // Set up intersection observers for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in-view');
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Animation styles
  const fadeIn = {
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'opacity 0.6s ease, transform 0.6s ease'
  };
  
  // Custom animation styles
  const customStyles = {
    '@keyframes float': {
      '0%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-10px)' },
      '100%': { transform: 'translateY(0px)' }
    },
    '@keyframes pulse': {
      '0%': { opacity: 0.6 },
      '50%': { opacity: 1 },
      '100%': { opacity: 0.6 }
    },
    '@keyframes slideInLeft': {
      '0%': { transform: 'translateX(-50px)', opacity: 0 },
      '100%': { transform: 'translateX(0)', opacity: 1 }
    },
    '@keyframes slideInRight': {
      '0%': { transform: 'translateX(50px)', opacity: 0 },
      '100%': { transform: 'translateX(0)', opacity: 1 }
    },
    '@keyframes fadeInUp': {
      '0%': { transform: 'translateY(40px)', opacity: 0 },
      '100%': { transform: 'translateY(0)', opacity: 1 }
    },
    '@keyframes fadeOut': {
      '0%': { opacity: 1 },
      '100%': { opacity: 0, visibility: 'hidden' }
    },
    '@keyframes slideInDown': {
      '0%': { transform: 'translateY(-50px)', opacity: 0 },
      '100%': { transform: 'translateY(0)', opacity: 1 }
    },
    '@keyframes slideInUp': {
      '0%': { transform: 'translateY(50px)', opacity: 0 },
      '100%': { transform: 'translateY(0)', opacity: 1 }
    },
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' }
    },
    '.animate-in-view': {
      opacity: 1,
      transform: 'translateY(0)',
      transition: 'opacity 0.8s ease, transform 0.8s ease'
    },
    '.animate-on-scroll': {
      opacity: 0,
      transform: 'translateY(40px)'
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen overflow-hidden">
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
          }
          
          @keyframes slideInLeft {
            0% { transform: translateX(-50px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          
          @keyframes slideInRight {
            0% { transform: translateX(50px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          
          @keyframes fadeInUp {
            0% { transform: translateY(30px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          
          @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; visibility: hidden; }
          }
          
          @keyframes slideInDown {
            0% { transform: translateY(-50px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          
          @keyframes slideInUp {
            0% { transform: translateY(50px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          .animate-in-view {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
          
          .animate-on-scroll {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s ease, transform 0.8s ease;
          }
          
          .stagger-animation > * {
            opacity: 0;
            transform: translateY(20px);
          }
          
          .stagger-animation > *:nth-child(1) { animation: fadeInUp 0.5s 0.1s forwards; }
          .stagger-animation > *:nth-child(2) { animation: fadeInUp 0.5s 0.2s forwards; }
          .stagger-animation > *:nth-child(3) { animation: fadeInUp 0.5s 0.3s forwards; }
          .stagger-animation > *:nth-child(4) { animation: fadeInUp 0.5s 0.4s forwards; }
          .stagger-animation > *:nth-child(5) { animation: fadeInUp 0.5s 0.5s forwards; }
          .stagger-animation > *:nth-child(6) { animation: fadeInUp 0.5s 0.6s forwards; }
          
          .animated-border-box {
            position: relative;
            z-index: 1;
          }
          
          .animated-border-box::before {
            content: '';
            position: absolute;
            inset: 0;
            border: 2px solid transparent;
            background: linear-gradient(90deg, #6b21a8, #9333ea, #6b21a8) border-box;
            border-radius: 0.5rem;
            mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            opacity: 0;
            z-index: -1;
            transition: opacity 0.3s ease;
          }
          
          .animated-border-box:hover::before {
            opacity: 1;
          }
          
          .floating {
            animation: float 5s ease-in-out infinite;
          }
          
          .text-glow {
            text-shadow: 0 0 10px rgba(147, 51, 234, 0.7);
          }
          
          .logo-shine {
            position: relative;
            overflow: hidden;
          }
          
          .logo-shine::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
              to right,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.3) 50%,
              rgba(255, 255, 255, 0) 100%
            );
            transform: rotate(30deg);
            animation: shine 4s infinite;
          }
          
          @keyframes shine {
            0% { transform: translateX(-100%) rotate(30deg); }
            20%, 100% { transform: translateX(100%) rotate(30deg); }
          }
        `}
      </style>
    
      {/* Header/Navigation */}
      <header className="fixed w-full bg-gray-900/90 backdrop-blur-md z-50 border-b border-purple-500/20" style={{
        transform: `translateY(${scrollY > 100 ? 0 : 0}px)`,
        transition: 'transform 0.3s ease',
      }}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-purple-400 relative overflow-hidden" style={{
            animation: isLoaded ? 'slideInLeft 0.8s ease forwards' : 'none'
          }}>
            EAK<span className="text-white">ZANG</span>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500" style={{
              transform: 'scaleX(0)',
              transformOrigin: 'left',
              animation: isLoaded ? 'slideInRight 1s 0.5s forwards' : 'none'
            }}></div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {['Home', 'About Me', 'Experience', 'Projects', 'Contact'].map((item, index) => {
                const sectionId = item.toLowerCase().replace(/\s+/g, '');
                return (
                  <li key={index} style={{
                    opacity: 0,
                    animation: isLoaded ? `fadeInUp 0.5s ${0.2 + index * 0.1}s forwards` : 'none'
                  }}>
                    <a 
                      href={`#${sectionId === 'home' ? '' : sectionId}`}
                      className="relative inline-block hover:text-purple-400 transition-colors group"
                      style={{
                        color: activeSection === (sectionId === 'home' ? 'home' : sectionId) ? '#a855f7' : ''
                      }}
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                      {activeSection === (sectionId === 'home' ? 'home' : sectionId) && (
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-400"></span>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-b border-purple-500/20">
            <nav className="px-4 py-4">
              <ul className="space-y-4">
                {['Home', 'About Me', 'Experience', 'Projects', 'Contact'].map((item, index) => {
                  const sectionId = item.toLowerCase().replace(/\s+/g, '');
                  return (
                    <li key={index}>
                      <a 
                        href={`#${sectionId === 'home' ? '' : sectionId}`}
                        className={`block hover:text-purple-400 transition-colors ${
                          activeSection === (sectionId === 'home' ? 'home' : sectionId) ? 'text-purple-400' : ''
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-purple-600 opacity-10" 
               style={{animation: 'float 10s ease-in-out infinite'}}></div>
          <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-indigo-600 opacity-10" 
               style={{animation: 'float 14s ease-in-out infinite'}}></div>
          <div className="absolute bottom-40 left-[30%] w-20 h-20 rounded-full bg-blue-600 opacity-10" 
               style={{animation: 'float 12s ease-in-out infinite'}}></div>
          <div className="absolute top-[60%] right-[20%] w-24 h-24 rounded-full bg-purple-800 opacity-10" 
               style={{animation: 'float 16s ease-in-out infinite'}}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-2/3">
              <div style={{
                opacity: 0,
                transform: 'translateY(20px)',
                animation: isLoaded ? 'fadeInUp 0.8s 0.2s forwards' : 'none'
              }}>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Hi! I'm <span className="text-purple-400 text-glow">Eak Zangkaew</span>
                </h1>
              </div>
              
              <div style={{
                opacity: 0,
                transform: 'translateY(20px)',
                animation: isLoaded ? 'fadeInUp 0.8s 0.4s forwards' : 'none'
              }}>
                <h2 className="text-xl md:text-2xl text-gray-300 mb-6">
                  A dedicated Full-Stack with over 15 years of experience in developing 
                  scalable and robust frontend and backend systems.
                </h2>
              </div>
              
              <div style={{
                opacity: 0,
                transform: 'translateY(20px)',
                animation: isLoaded ? 'fadeInUp 0.8s 0.6s forwards' : 'none'
              }}>
                <p className="text-gray-400 mb-8">
                  Explore my projects and learn more about my expertise in creating 
                  efficient and secure solutions across financial services, equity crowdfunding, and sports tech industries.
                </p>
              </div>
              
              <div className="flex space-x-4" style={{
                opacity: 0,
                transform: 'translateY(20px)',
                animation: isLoaded ? 'fadeInUp 0.8s 0.8s forwards' : 'none'
              }}>
                <a 
                  href="#contact" 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md flex items-center space-x-2 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:translate-y-[-3px]"
                >
                  <span>Talk with me</span>
                  <ExternalLink size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a 
                  href="#projects" 
                  className="border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-6 py-3 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:translate-y-[-3px]"
                >
                  View Projects
                </a>
              </div>
            </div>
            
            <div className="md:w-1/3 flex justify-center" style={{
              opacity: 0,
              animation: isLoaded ? 'fadeInUp 1s 0.5s forwards' : 'none'
            }}>
              <div className="relative floating">
                {/* Animated glow effect */}
                <div className="absolute inset-0 rounded-full bg-purple-500 blur-2xl opacity-20" 
                     style={{animation: 'pulse 3s ease-in-out infinite'}}></div>
                     
                {/* Circular border with animation */}
                <div className="absolute inset-4 rounded-full border-2 border-purple-400 opacity-30" 
                     style={{animation: 'spin 20s linear infinite'}}></div>
                
                {/* Circular dots around the profile */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30) * (Math.PI / 180);
                  const size = i % 3 === 0 ? 4 : 2;
                  const radius = 140;
                  const x = radius * Math.cos(angle);
                  const y = radius * Math.sin(angle);
                  
                  return (
                    <div 
                      key={i}
                      className="absolute rounded-full bg-purple-400" 
                      style={{
                        width: `${size}px`, 
                        height: `${size}px`,
                        left: `calc(50% + ${x}px - ${size/2}px)`,
                        top: `calc(50% + ${y}px - ${size/2}px)`,
                        animation: `pulse ${2 + (i % 3)}s ease-in-out infinite ${i * 0.2}s`
                      }}
                    ></div>
                  );
                })}
                
                <div className="w-64 h-64 rounded-full border-4 border-purple-500 overflow-hidden relative z-10 shadow-lg shadow-purple-500/30">
                  <img 
                    src={profilePhoto}
                    alt="Eak Zangkaew" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Company Logos Section */}
          <div className="mt-24 mb-4 animate-on-scroll">
            <div className="bg-white py-12 px-6 rounded-xl shadow-xl relative overflow-hidden">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-5 bg-repeat" style={{
                backgroundImage: 'radial-gradient(circle, #6b21a8 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}></div>
              
              {/* Section title */}
              <div className="text-center mb-10">
                <h3 className="text-gray-800 text-xl font-medium mb-2">Trusted by innovative companies</h3>
                <div className="w-24 h-1 bg-purple-400 mx-auto"></div>
              </div>
              
              {/* Logos container */}
              <div className="max-w-5xl mx-auto">
                <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4 md:gap-16">
                  {[
                    { name: 'MOGO', image: logoMogo, width: 120 },
                    { name: 'Moka', image: logoMoka, width: 100 },
                    { name: 'SBLive', image: logoSblive, width: 130 },
                    { name: 'FLASH', image: logoFlash, width: 110 },
                    { name: '500', image: logo500, width: 100 },
                    { name: 'Oozou', image: logoOozou, width: 120 }
                  ].map((logo, index) => (
                    <div 
                      key={logo.name} 
                      className="logo-container transition-all duration-500"
                      style={{
                        opacity: 0,
                        animation: `fadeInUp 0.4s ${0.2 + index * 0.1}s forwards`
                      }}
                    >
                      <div className="group relative">
                        {/* Logo image */}
                        <img 
                          src={logo.image}
                          alt={`${logo.name} logo`}
                          className="h-12 object-contain transition-all duration-500 group-hover:opacity-100 opacity-70"
                          style={{
                            maxWidth: logo.width,
                          }}
                        />
                        
                        {/* Hover effect - subtle indicator line */}
                        <div className="absolute left-0 right-0 bottom-0 mx-auto w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="aboutme" className="py-20 bg-gray-800 relative">
        {/* Background animation elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-purple-900 opacity-5" 
               style={{animation: 'float 15s ease-in-out infinite'}}></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-indigo-800 opacity-5" 
               style={{animation: 'float 12s ease-in-out infinite 2s'}}></div>
        </div>
      
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="mb-16 text-center animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block relative">
              About Me
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500" 
                style={{
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.6s ease',
                  animation: 'slideInRight 0.8s 0.3s forwards'
                }}></span>
            </h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto mt-4" style={{
              transform: 'scaleX(0)',
              transformOrigin: 'center',
              animation: 'slideInRight 0.6s 0.5s forwards'
            }}></div>
          </div>

          <div className="bg-gray-900 rounded-xl p-8 mb-12 shadow-xl shadow-purple-900/10 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 to-indigo-900/10"></div>
            
            <div className="relative">
              <div className="animate-on-scroll">
                <h3 className="text-2xl font-bold mb-4 text-purple-300">Eak Zangkkaew – Senior Full-Stack Software Engineer</h3>
                <p className="text-lg mb-6">
                  With over 15 years of experience in designing and developing scalable, high-performance software solutions, 
                  I blend deep technical expertise with a keen eye for user experience. I specialize in full-stack development—from 
                  crafting intuitive, responsive front-end interfaces using modern frameworks (React, React Native, etc.) to 
                  architecting robust back-end systems with Node.js, Ruby on Rails, and cloud-native technologies. My passion 
                  lies in transforming complex challenges into elegant, user-centered products.
                </p>
                <p className="text-lg mb-6 text-purple-300 relative pl-6 border-l-2 border-purple-500">
                  I am a passionate and results-driven engineer focused on developing high-performance 
                  solutions across the entire technology stack. I specialize in Node.js, Ruby on Rails, and modern 
                  front-end frameworks, with a proven track record of delivering secure and scalable applications.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                {[
                  {
                    icon: <Code size={24} />,
                    title: "Full-Stack Development",
                    description: "Expertise in building end-to-end solutions using Node.js, Ruby on Rails, TypeScript, and modern JavaScript frameworks."
                  },
                  {
                    icon: <Globe size={24} />,
                    title: "Front-End & UX Design",
                    description: "Skilled in React, React Native, and responsive design principles that prioritize accessibility, usability, and performance."
                  },
                  {
                    icon: <Server size={24} />,
                    title: "Cloud & DevOps",
                    description: "Proficient with AWS, Docker, Kubernetes, and CI/CD pipelines to deliver scalable, secure, and efficient deployments."
                  },
                  {
                    icon: <Shield size={24} />,
                    title: "AI & Data Integration",
                    description: "Experience integrating generative AI (FinChat.io) to enhance product capabilities and streamline data-driven decision making."
                  }
                ].map((skill, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-800 p-6 rounded-lg animated-border-box hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-500"
                    style={{
                      opacity: 0,
                      transform: 'translateY(30px)',
                      animation: `fadeInUp 0.5s ${0.3 + index * 0.2}s forwards`
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-500/40 transition-colors duration-300">
                        <div className="text-purple-400" style={{transition: 'transform 0.3s ease', animation: 'bounce 3s ease-in-out infinite'}}>
                          {skill.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold">{skill.title}</h3>
                    </div>
                    <p className="text-gray-400">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Animated counter stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-on-scroll">
                {[
                  { number: "15+", label: "Years Experience" },
                  { number: "20+", label: "Projects Completed" },
                  { number: "4+", label: "Industries" },
                  { number: "5+", label: "Tech Specialties" }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4 relative">
                    <div className="absolute inset-0 bg-purple-900/5 rounded-lg transform rotate-3"></div>
                    <div className="relative">
                      <div className="text-4xl font-bold text-purple-400 mb-2">{stat.number}</div>
                      <div className="text-gray-400">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience Section */}
      <section id="experience" className="py-20 relative">
        {/* Background animation elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-[15%] w-72 h-72 rounded-full bg-gradient-to-r from-purple-900 to-indigo-900 opacity-5" 
               style={{animation: 'float 18s ease-in-out infinite'}}></div>
          <div className="absolute top-[60%] right-[10%] w-48 h-48 rounded-full bg-gradient-to-r from-blue-900 to-cyan-900 opacity-5" 
               style={{animation: 'float 15s ease-in-out infinite 2s'}}></div>
        </div>
      
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="mb-16 text-center animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block relative">
              Professional Experience
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500" 
                style={{
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.6s ease',
                  animation: 'slideInRight 0.8s 0.3s forwards'
                }}></span>
            </h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto mt-4" style={{
              transform: 'scaleX(0)',
              transformOrigin: 'center',
              animation: 'slideInRight 0.6s 0.5s forwards'
            }}></div>
          </div>

          {/* Experience Cards */}
          <div className="space-y-12">
            {/* Mogo Experience */}
            <div className="animate-on-scroll bg-gray-800 rounded-xl overflow-hidden shadow-xl relative">
              <div className="h-2 bg-gradient-to-r from-purple-600 to-indigo-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-30" style={{
                  transform: 'translateX(-100%)',
                  animation: 'shine 3s infinite 1s'
                }}></div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-purple-300">
                  Mogo – Transforming Financial Services
                </h3>
                <h4 className="text-xl text-gray-300 mb-4">Senior Software Engineer</h4>
                
                <p className="text-gray-300 mb-6">
                  At Mogo, I lead the development of mission-critical applications spanning trading, lending, and investment platforms. 
                  I've driven projects that integrate advanced AI for institutional research, enhanced system efficiency through cloud 
                  and DevOps best practices, and championed UX improvements to ensure a seamless user journey.
                </p>
                
                <div className="mb-6">
                  <h5 className="text-purple-400 font-semibold mb-3">Key Contributions:</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start text-gray-300">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span><strong>MogoTrade & Moka Platforms:</strong> Architecting and scaling full-stack solutions with Node.js, Ruby, TypeScript, and AWS.</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span><strong>AI Integration:</strong> Leading the integration of FinChat's generative AI to streamline financial analysis and decision-making.</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span><strong>DevOps and Cloud Optimization:</strong> Enhancing CI/CD pipelines, infrastructure automation, and maintaining high uptime with robust security standards.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* SBLive & FlashFunders Experience */}
            <div className="animate-on-scroll bg-gray-800 rounded-xl overflow-hidden shadow-xl relative">
              <div className="h-2 bg-gradient-to-r from-blue-600 to-green-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-30" style={{
                  transform: 'translateX(-100%)',
                  animation: 'shine 3s infinite 1s'
                }}></div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-purple-300">
                  SBLive Sports
                </h3>
                <h4 className="text-xl text-gray-300 mb-4">Senior Software Engineer</h4>
                
                <p className="text-gray-300 mb-6">
                  As a Senior Software Engineer at SBLive Sports, I built scalable systems and designed microservices architectures to support millions of users. 
                  My contributions included migrating legacy systems, optimizing backend services, and ensuring seamless integration of regulatory 
                  and compliance requirements.
                </p>

                <div className="mb-6">
                  <h5 className="text-purple-400 font-semibold mb-3">Key Contributions:</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start text-gray-300">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span><strong>Scalable Architecture:</strong> Designed and implemented microservices in Go and Ruby, enabling the platform to handle high traffic and large spikes during major sports events.</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span><strong>Legacy Migration:</strong> Transitioned critical features from legacy PHP services to modern Go-based solutions, improving maintainability and performance.</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span><strong>Performance Optimization:</strong> Implemented caching, load balancing, and AWS-based tooling (EC2, RDS, DynamoDB) to reduce costs and deliver a consistently low-latency user experience.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* FlashFunders Experience */}
            <div className="animate-on-scroll bg-gray-800 rounded-xl overflow-hidden shadow-xl relative">
              <div className="h-2 bg-gradient-to-r from-teal-600 to-cyan-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-30" style={{
                  transform: 'translateX(-100%)',
                  animation: 'shine 3s infinite 1s'
                }}></div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-purple-300">
                  FlashFunders
                </h3>
                <h4 className="text-xl text-gray-300 mb-4">Software Engineer</h4>
                
                <p className="text-gray-300 mb-6">
                  At FlashFunders, I designed and developed user-friendly investment workflows for an equity crowdfunding platform 
                  that simplifies how startups raise capital and democratizes investor access. I worked with Ruby on Rails and React, 
                  ensuring regulatory compliance, secure transactions, and seamless integrations with third-party services like DocuSign.
                </p>
                
                <div className="mb-6">
                  <h5 className="text-purple-400 font-semibold mb-3">Key Contributions:</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start text-gray-300">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span><strong>Compliance & Security:</strong> Built secure investor flows that satisfied FINRA/SEC regulations and AML/KYC checks.</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span><strong>Microservices & Integrations:</strong> Utilized Ruby on Rails and Python microservices for background processing; integrated external APIs (e.g., FundAmerica) for automated escrow management.</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span><strong>Scalable Architecture:</strong> Migrated legacy components to a modern stack, reducing technical debt and boosting performance.</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span><strong>Test-Driven Development:</strong> Employed RSpec, Capybara, and CI/CD pipelines to maintain high code quality and reliability.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Mentorship & Leadership */}
            <div className="animate-on-scroll bg-gray-800 rounded-xl overflow-hidden shadow-xl relative">
              <div className="h-2 bg-gradient-to-r from-green-600 to-teal-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-30" style={{
                  transform: 'translateX(-100%)',
                  animation: 'shine 3s infinite 1s'
                }}></div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-purple-300">
                  Mentorship & Community Engagement
                </h3>
                
                <p className="text-gray-300 mb-6">
                  Beyond technical development, I have mentored budding engineers through my roles at Lighthouse Labs and as a volunteer mentor with ADPList. 
                  I help students and professionals navigate the full-stack development lifecycle—from front-end design to back-end logic—instilling 
                  best practices in UX, TDD, and agile methodologies.
                </p>
                
                <div className="mb-6">
                  <h5 className="text-purple-400 font-semibold mb-3">Lighthouse Labs:</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start text-gray-300">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span>Personalized guidance on coding challenges and project work.</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span>Code reviews, best practices training, and curriculum enhancements.</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <span className="text-purple-500 mr-2 mt-1">•</span>
                      <span>Support for students to build a strong foundation in both front-end and back-end development.</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h5 className="text-purple-400 font-semibold mb-3">ADPList Volunteer Mentor:</h5>
                  <p className="text-gray-300 mb-4">
                    I'm proud to volunteer as a mentor with ADPList, a non-profit organization dedicated to connecting mentors and mentees across the globe. Through this platform, I provide one-on-one sessions, career advice, and technical guidance to help aspiring developers and tech professionals advance their skills, navigate industry challenges, and grow their confidence.
                  </p>
                </div>

                {/* ADPList Reviews Widget */}
                <div className="mt-8 animate-on-scroll">
                  <h5 className="text-purple-400 font-semibold mb-4 relative inline-block">
                    <a href='https://adplist.org/mentors/eak-zangkaew' target='_blank'>What My Mentees Say</a>
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-500 to-teal-500" 
                      style={{
                        transform: 'scaleX(0)',
                        transformOrigin: 'left',
                        animation: 'slideInRight 0.8s 0.3s forwards'
                      }}></span>
                  </h5>
                  
                  <div className="relative overflow-hidden rounded-xl bg-gray-900/50 border border-purple-500/10 shadow-lg transform transition-all duration-500 hover:shadow-purple-500/20 hover:border-purple-500/30">
                    {/* Animated corner accents */}
                    <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden">
                      <div className="absolute top-0 left-0 w-16 h-1 bg-gradient-to-r from-green-500 to-transparent" style={{animation: 'slideInRight 1.5s ease-out forwards'}}></div>
                      <div className="absolute top-0 left-0 h-16 w-1 bg-gradient-to-b from-green-500 to-transparent" style={{animation: 'slideInDown 1.5s ease-out forwards'}}></div>
                    </div>
                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-1 bg-gradient-to-l from-green-500 to-transparent" style={{animation: 'slideInLeft 1.5s ease-out forwards'}}></div>
                      <div className="absolute top-0 right-0 h-16 w-1 bg-gradient-to-b from-green-500 to-transparent" style={{animation: 'slideInDown 1.5s ease-out forwards'}}></div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 overflow-hidden">
                      <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-green-500 to-transparent" style={{animation: 'slideInRight 1.5s ease-out forwards'}}></div>
                      <div className="absolute bottom-0 left-0 h-16 w-1 bg-gradient-to-t from-green-500 to-transparent" style={{animation: 'slideInUp 1.5s ease-out forwards'}}></div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden">
                      <div className="absolute bottom-0 right-0 w-16 h-1 bg-gradient-to-l from-green-500 to-transparent" style={{animation: 'slideInLeft 1.5s ease-out forwards'}}></div>
                      <div className="absolute bottom-0 right-0 h-16 w-1 bg-gradient-to-t from-green-500 to-transparent" style={{animation: 'slideInUp 1.5s ease-out forwards'}}></div>
                    </div>
                    
                    {/* Widget container with responsive height */}
                    <div className="p-4 md:p-6 relative z-10">
                      <div className="h-[400px] sm:h-[450px] md:h-[496px] w-full max-w-[650px] mx-auto rounded-lg overflow-hidden shadow-md transition-transform duration-500 hover:translate-y-[-5px]">
                        <iframe 
                          src="https://adplist.org/widgets/reviews?src=eak-zangkaew" 
                          title="Mentee Reviews" 
                          width="100%" 
                          height="100%" 
                          loading="lazy" 
                          className="border-0 bg-white rounded-lg"
                        ></iframe>
                      </div>
                      
                      {/* Subtle loading animation */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 rounded-xl z-20 opacity-0 animate-pulse" style={{
                        animation: 'fadeOut 1.5s forwards'
                      }}>
                        <div className="w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-green-500 border-l-transparent rounded-full animate-spin"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-[15%] w-72 h-72 rounded-full bg-gradient-to-r from-purple-900 to-indigo-900 opacity-5" 
               style={{animation: 'float 18s ease-in-out infinite'}}></div>
          <div className="absolute top-[60%] right-[10%] w-48 h-48 rounded-full bg-gradient-to-r from-blue-900 to-cyan-900 opacity-5" 
               style={{animation: 'float 15s ease-in-out infinite 2s'}}></div>
        </div>
      
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="mb-16 text-center animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block relative">
              Projects I've worked on
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500" 
                style={{
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.6s ease',
                  animation: 'slideInRight 0.8s 0.3s forwards'
                }}></span>
            </h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto mt-4" style={{
              transform: 'scaleX(0)',
              transformOrigin: 'center',
              animation: 'slideInRight 0.6s 0.5s forwards'
            }}></div>
          </div>

          {/* Project Cards */}
          <div className="space-y-16">
            {[
              {
                title: "Mogo Trade",
                description: "Financial trading platform that allows users to trade stocks and other securities with ease.",
                tech: "Node.js, TypeScript",
                website: "www.mogo.ca",
                screenshot: screenshotMogoTrade,
                achievements: [
                  "Enhanced the performance of data retrieval processes by optimizing database queries, resulting in a 30% reduction in response times.",
                  "Implemented robust security measures to protect sensitive user data and comply with financial regulations.",
                  "Contributed to the design and deployment of microservices architecture, facilitating seamless scalability."
                ],
                color: "from-purple-600 to-indigo-600"
              },
              {
                title: "Moka",
                description: "Financial app that helps users automate their savings and investments.",
                tech: "Node.js, TypeScript",
                website: "www.moka.ai",
                screenshot: screenshotMoka,
                achievements: [
                  "Developed a feature to automate round-up transactions, allowing users to save spare change effortlessly.",
                  "Implemented caching strategies that improved the app's performance and reduced server load by 25%.",
                  "Played a key role in transitioning the backend from a monolithic architecture to a microservices-based approach, enhancing maintainability and scalability."
                ],
                color: "from-indigo-600 to-blue-600"
              },
              {
                title: "Mogo Money Loan",
                description: "Personal loans platform with an easy-to-use online interface.",
                tech: "Ruby, Ruby on Rails",
                website: "mogo.ca/personal-loans-canada",
                screenshot: screenshotMogoMoney,
                achievements: [
                  "Developed and optimized algorithms for credit scoring and risk assessment, reducing loan approval times by 40%.",
                  "Ensured the system's compliance with financial regulations and industry standards through rigorous testing and validation processes.",
                  "Integrated third-party payment gateways to streamline loan disbursement and repayment processes."
                ],
                color: "from-blue-600 to-green-600"
              },
              {
                title: "SBLive Sport",
                description: "Platform providing real-time scores, news, and updates for high school sports.",
                tech: "Ruby, Ruby on Rails",
                website: "scorebooklive.com",
                screenshot: screenshotSblive,
                achievements: [
                  "Implemented real-time data streaming features to provide up-to-the-minute score updates and sports news.",
                  "Optimized data storage and retrieval processes, enhancing the platform's ability to handle high traffic volumes during peak times.",
                  "Collaborated with front-end developers to ensure seamless integration of backend services with the user interface."
                ],
                color: "from-green-600 to-teal-600"
              },
              {
                title: "FlashFunders",
                description: "An equity crowdfunding platform that simplifies how startups raise capital and democratizes investor access.",
                tech: "Ruby on Rails, React, Python",
                website: "flashfunders.com",
                screenshot: screenshotFlashfunders,
                achievements: [
                  "Compliance & Security: Built secure investor flows that satisfied FINRA/SEC regulations and AML/KYC checks.",
                  "Microservices & Integrations: Utilized Ruby on Rails and Python microservices for background processing; integrated external APIs (e.g., FundAmerica) for automated escrow management.",
                  "Scalable Architecture: Migrated legacy components to a modern stack, reducing technical debt and boosting performance.",
                  "Test-Driven Development: Employed RSpec, Capybara, and CI/CD pipelines to maintain high code quality and reliability."
                ],
                color: "from-teal-600 to-cyan-600"
              }
            ].map((project, index) => (
              <div
                key={index}
                className="animate-on-scroll bg-gray-800 rounded-xl overflow-hidden shadow-xl relative"
                style={{ 
                  transform: 'perspective(1000px) rotateY(0deg)',
                  transition: 'transform 0.6s ease, box-shadow 0.6s ease, translate 0.6s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateY(2deg)';
                  e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(139, 92, 246, 0.15)';
                  e.currentTarget.style.translate = '0 -5px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg)';
                  e.currentTarget.style.boxShadow = '';
                  e.currentTarget.style.translate = '0 0';
                }}
              >
                {/* Animated gradient border */}
                <div className={`h-2 bg-gradient-to-r ${project.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white opacity-30" style={{
                    transform: 'translateX(-100%)',
                    animation: 'shine 3s infinite 1s'
                  }}></div>
                </div>
                
                <div className="p-8">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                      <h3 className="text-2xl font-bold mb-3 text-glow text-purple-300">
                        {project.title}
                      </h3>
                      <div className="text-sm text-gray-400 mb-4">
                        <span className="text-purple-400">Technologies Used:</span> {project.tech}
                      </div>
                      <p className="text-gray-300 mb-4">
                        {project.description}
                      </p>
                      <div className="mb-4">
                        <span className="text-purple-400 text-sm">Website:</span>{" "}
                        <a 
                          href={`https://${project.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-purple-400 transition-colors relative group"
                        >
                          {project.website}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                      </div>
                      <div>
                        <h4 className="text-purple-400 text-sm mb-2">Key Achievements:</h4>
                        <ul className="space-y-2">
                          {project.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start text-gray-300">
                              <span className="text-purple-500 mr-2 mt-1">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="md:w-1/2">
                      <div className="bg-gray-900 rounded-lg p-4 h-full flex items-center justify-center overflow-hidden">
                        <img 
                          src={project.screenshot}
                          alt={`${project.title} screenshot`} 
                          className="rounded-lg shadow-lg transition-all duration-500 w-full h-full object-cover"
                          style={{
                            filter: 'brightness(0.8)',
                            transform: 'scale(1)',
                            transition: 'transform 0.5s ease, filter 0.5s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.filter = 'brightness(1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.filter = 'brightness(0.8)';
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-800 relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-gradient-to-r from-purple-900 to-indigo-900 opacity-10" 
               style={{animation: 'float 20s ease-in-out infinite'}}></div>
          <div className="absolute bottom-[10%] right-[5%] w-56 h-56 rounded-full bg-gradient-to-r from-indigo-900 to-purple-900 opacity-10" 
               style={{animation: 'float 18s ease-in-out infinite 2s'}}></div>
        </div>
      
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="mb-16 text-center animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block relative">
              Let's Connect
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500" 
                style={{
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.6s ease',
                  animation: 'slideInRight 0.8s 0.3s forwards'
                }}></span>
            </h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto mb-6 mt-4" style={{
              transform: 'scaleX(0)',
              transformOrigin: 'center',
              animation: 'slideInRight 0.6s 0.5s forwards'
            }}></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-on-scroll">
              Whether you're looking for innovative software solutions, expert guidance on full-stack development, 
              or a mentor to help you navigate the evolving tech landscape, I'd love to connect.
            </p>
          </div>

          <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl shadow-purple-900/10 relative">
            {/* Animated gradient border */}
            <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 opacity-30" 
                 style={{animation: 'pulse 3s infinite'}}></div>
            
            <div className="relative p-8 md:p-12">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12 animate-on-scroll">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Let's connect and create something amazing together!</h3>
                  <p className="text-gray-300">Reach out through any of these channels and I'll get back to you promptly.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Social Media Links */}
                  <div className="bg-gray-800/50 p-6 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 shadow-lg transform hover:-translate-y-1 hover:shadow-purple-500/20 animate-on-scroll" style={{animationDelay: '0.2s'}}>
                    <h4 className="text-purple-400 font-semibold mb-6 flex items-center">
                      <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3">
                        <Globe size={18} className="text-purple-400" />
                      </span>
                      Social Media
                    </h4>
                    <div className="space-y-5">
                      <a href="https://www.linkedin.com/in/eakkapan" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-purple-400 transition-all duration-300 group p-3 rounded-lg hover:bg-purple-500/10">
                        <span className="mr-4 p-2 bg-gray-800 rounded-full group-hover:bg-purple-500/20 transition-colors duration-300">
                          <Linkedin size={20} className="group-hover:scale-110 transition-transform duration-300" />
                        </span>
                        <div className="flex flex-col">
                          <span className="font-medium">LinkedIn</span>
                          <span className="text-sm text-gray-400 group-hover:text-purple-300">Connect professionally</span>
                        </div>
                        <span className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                          <ExternalLink size={16} />
                        </span>
                      </a>
                      
                      <a href="https://github.com/eakmotion" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-purple-400 transition-all duration-300 group p-3 rounded-lg hover:bg-purple-500/10">
                        <span className="mr-4 p-2 bg-gray-800 rounded-full group-hover:bg-purple-500/20 transition-colors duration-300">
                          <Github size={20} className="group-hover:scale-110 transition-transform duration-300" />
                        </span>
                        <div className="flex flex-col">
                          <span className="font-medium">GitHub</span>
                          <span className="text-sm text-gray-400 group-hover:text-purple-300">Explore my code</span>
                        </div>
                        <span className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                          <ExternalLink size={16} />
                        </span>
                      </a>
                      
                      <a href="https://adplist.org/mentors/eak-zangkaew" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-purple-400 transition-all duration-300 group p-3 rounded-lg hover:bg-purple-500/10">
                        <span className="mr-4 p-2 bg-gray-800 rounded-full group-hover:bg-purple-500/20 transition-colors duration-300">
                          <ExternalLink size={20} className="group-hover:scale-110 transition-transform duration-300" />
                        </span>
                        <div className="flex flex-col">
                          <span className="font-medium">ADPList</span>
                          <span className="text-sm text-gray-400 group-hover:text-purple-300">Schedule mentorship</span>
                        </div>
                        <span className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                          <ExternalLink size={16} />
                        </span>
                      </a>
                    </div>
                  </div>
                  
                  {/* Direct Contact */}
                  <div className="bg-gray-800/50 p-6 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 shadow-lg transform hover:-translate-y-1 hover:shadow-purple-500/20 animate-on-scroll" style={{animationDelay: '0.4s'}}>
                    <h4 className="text-purple-400 font-semibold mb-6 flex items-center">
                      <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3">
                        <Mail size={18} className="text-purple-400" />
                      </span>
                      Get in touch
                    </h4>
                    
                    <div className="space-y-5">
                      <a href="mailto:eakpun@gmail.com" className="flex items-center text-gray-300 hover:text-purple-400 transition-all duration-300 group p-3 rounded-lg hover:bg-purple-500/10">
                        <span className="mr-4 p-2 bg-gray-800 rounded-full group-hover:bg-purple-500/20 transition-colors duration-300">
                          <Mail size={20} className="group-hover:scale-110 transition-transform duration-300" />
                        </span>
                        <div className="flex flex-col">
                          <span className="font-medium">Email</span>
                          <span className="text-sm text-gray-400 group-hover:text-purple-300">eakpun@gmail.com</span>
                        </div>
                        <span className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                          <ExternalLink size={16} />
                        </span>
                      </a>
                      
                      <div className="p-5 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-lg border border-purple-500/10 mt-6">
                        <p className="text-gray-300 mb-4">
                          Looking for a mentor? I offer free 30-minute consultation sessions to discuss your project or career goals.
                        </p>
                        <a 
                          href="https://adplist.org/mentors/eak-zangkaew" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group"
                        >
                          <span>Schedule a session</span>
                          <ExternalLink size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Response Time Indicator */}
                <div className="mt-12 text-center animate-on-scroll" style={{animationDelay: '0.6s'}}>
                  <div className="inline-flex items-center bg-gray-800/70 px-6 py-3 rounded-full">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-gray-300">Typically responds within 24 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500">© Eak Zang 2024. All rights reserved.</p>
          
          {/* Scroll to top button */}
          <a 
            href="#" 
            className="inline-flex items-center mt-4 text-gray-400 hover:text-purple-400 transition-colors"
            style={{
              opacity: scrollY > 500 ? 1 : 0,
              transform: `translateY(${scrollY > 500 ? 0 : 20}px)`,
              transition: 'opacity 0.3s ease, transform 0.3s ease'
            }}
          >
            <span className="mr-2">Back to top</span>
            <span className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">↑</span>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;