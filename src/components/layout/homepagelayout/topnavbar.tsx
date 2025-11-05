import AuthButtons from '../../ui/AuthButtons';
import type { AuthButtonsProps } from '../../../types';
import { useState, useEffect } from 'react';

export default function TopNavbar({ 
  isLoggedIn = false, 
  onOpenSignup, 
  onOpenSignin 
}: AuthButtonsProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);

      const homeSection = document.getElementById('home');
      const hardwareSection = document.getElementById('hardware');
      const aboutSection = document.getElementById('about');

      const homeOffset = homeSection?.offsetTop || 0;
      const hardwareOffset = hardwareSection?.offsetTop || 0;
      const aboutOffset = aboutSection?.offsetTop || 0;

      // Fix: Check if we're at the very top of the page first
      if (scrollY < 100) {
        setCurrentSection('home');
      } else if (scrollY >= homeOffset && scrollY < hardwareOffset - 100) {
        setCurrentSection('home');
      } else if (scrollY >= hardwareOffset - 100 && scrollY < aboutOffset - 100) {
        setCurrentSection('hardware');
      } else if (scrollY >= aboutOffset - 100) {
        setCurrentSection('about');
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Set initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const isInHomeSection = currentSection === 'home';
  const shouldUseLightColors = isInHomeSection || !isScrolled;

  // Helper function to determine if a nav item is active
  const isNavActive = (section: string) => currentSection === section;

  // Helper function to get colors for each section
  const getNavColors = (section: string) => {
    const isActive = isNavActive(section);
    const baseColors = shouldUseLightColors 
      ? 'text-white' 
      : 'text-gray-600';
    
    if (section === 'hardware') {
      const activeColor = shouldUseLightColors ? 'text-yellow-400' : 'text-yellow-500';
      const hoverColor = shouldUseLightColors ? 'hover:text-yellow-400' : 'hover:text-yellow-500';
      return {
        text: isActive ? activeColor : baseColors,
        hover: hoverColor,
        underline: shouldUseLightColors ? 'bg-yellow-400' : 'bg-yellow-500'
      };
    } else {
      const activeColor = shouldUseLightColors ? 'text-teal-300' : 'text-teal-600';
      const hoverColor = shouldUseLightColors ? 'hover:text-teal-300' : 'hover:text-teal-600';
      return {
        text: isActive ? activeColor : baseColors,
        hover: hoverColor,
        underline: shouldUseLightColors ? 'bg-teal-300' : 'bg-teal-600'
      };
    }
  };

  return (
    <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-[0_2px_10px_rgba(13,148,136,0.1)]' : 'bg-transparent'
    }`}>
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center ml-10">
            <img 
              src="/src/assets/images/logo.png" 
              alt="SentriGas Logo" 
              className="h-14 w-auto"
            />
          </div>

          <nav className="hidden md:flex space-x-12">
            <button 
              onClick={() => handleNavClick('home')}
              className={`font-medium transition-all duration-200 relative group ${
                getNavColors('home').text
              } ${getNavColors('home').hover}`}
            >
              Home
              <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-200 ${
                isNavActive('home') ? 'w-full' : 'w-0 group-hover:w-full'
              } ${getNavColors('home').underline}`}></span>
            </button>
            <button 
              onClick={() => handleNavClick('hardware')}
              className={`font-medium transition-all duration-200 relative group ${
                getNavColors('hardware').text
              } ${getNavColors('hardware').hover}`}
            >
              Hardware
              <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-200 ${
                isNavActive('hardware') ? 'w-full' : 'w-0 group-hover:w-full'
              } ${getNavColors('hardware').underline}`}></span>
            </button>
            <button 
              onClick={() => handleNavClick('about')}
              className={`font-medium transition-all duration-200 relative group ${
                getNavColors('about').text
              } ${getNavColors('about').hover}`}
            >
              About
              <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-200 ${
                isNavActive('about') ? 'w-full' : 'w-0 group-hover:w-full'
              } ${getNavColors('about').underline}`}></span>
            </button>
          </nav>

          <div className="flex items-center mr-10">
            <div className="hidden md:block">
              <AuthButtons 
                isLoggedIn={isLoggedIn} 
                onOpenSignup={onOpenSignup}
                onOpenSignin={onOpenSignin}
              />
            </div>

            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-teal-600 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-b-lg border-t border-gray-200">
            <div className="px-4 py-3 space-y-3">
              <button 
                onClick={() => handleNavClick('home')}
                className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                  isNavActive('home') 
                    ? 'text-teal-600 bg-teal-50 border-l-2 border-teal-600' 
                    : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => handleNavClick('hardware')}
                className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                  isNavActive('hardware') 
                    ? 'text-yellow-500 bg-yellow-50 border-l-2 border-yellow-500' 
                    : 'text-gray-700 hover:text-yellow-500 hover:bg-gray-50'
                }`}
              >
                Hardware
              </button>
              <button 
                onClick={() => handleNavClick('about')}
                className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                  isNavActive('about') 
                    ? 'text-teal-600 bg-teal-50 border-l-2 border-teal-600' 
                    : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                }`}
              >
                About
              </button>
              <div className="pt-2 border-t border-gray-200">
                <AuthButtons 
                  isLoggedIn={isLoggedIn} 
                  onOpenSignup={onOpenSignup}
                  onOpenSignin={onOpenSignin}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}