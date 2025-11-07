import { useState, useEffect } from 'react';

interface TopNavbarProps {
  isLoggedIn?: boolean;
  isGuidePage?: boolean;
  onOpenSignup?: () => void;
  onOpenSignin?: () => void;
}

export default function TopNavbar({ 
  isLoggedIn = false,
  isGuidePage = false,
  onOpenSignup,
  onOpenSignin
}: TopNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);

      // Only set current section if not on guide page
      if (!isGuidePage) {
        const homeSection = document.getElementById('home');
        const hardwareSection = document.getElementById('hardware');
        const aboutSection = document.getElementById('about');

        const homeOffset = homeSection?.offsetTop || 0;
        const hardwareOffset = hardwareSection?.offsetTop || 0;
        const aboutOffset = aboutSection?.offsetTop || 0;

        if (scrollY < 100) {
          setCurrentSection('home');
        } else if (scrollY >= homeOffset && scrollY < hardwareOffset - 100) {
          setCurrentSection('home');
        } else if (scrollY >= hardwareOffset - 100 && scrollY < aboutOffset - 100) {
          setCurrentSection('hardware');
        } else if (scrollY >= aboutOffset - 100) {
          setCurrentSection('about');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isGuidePage]);

  const handleNavClick = (sectionId: string) => {
    if (isGuidePage) {
      // On guide page, navigate to homepage with hash
      window.location.href = `/#${sectionId}`;
    } else {
      // On homepage, smooth scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    if (isGuidePage) {
      // Navigate to homepage
      window.location.href = '/';
    } else {
      // Scroll to home section
      handleNavClick('home');
    }
  };

  const handleGuideClick = () => {
    if (isGuidePage) {
      // Already on guide page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to guide page
      window.location.href = '/guide';
    }
  };

  const handleAuthButtonClick = (authType: 'signup' | 'signin') => {
    if (isGuidePage) {
      // On guide page, navigate to homepage
      window.location.href = '/';
    } else {
      // On homepage, open the appropriate modal
      if (authType === 'signup') {
        onOpenSignup?.();
      } else {
        onOpenSignin?.();
      }
    }
  };

  const isInHomeSection = currentSection === 'home';
  // For guide page, always use light colors when not scrolled, dark when scrolled
  const shouldUseLightColors = isGuidePage 
    ? !isScrolled 
    : (isInHomeSection || !isScrolled);

  const isNavActive = (section: string) => currentSection === section;

  const getNavColors = (section: string) => {
    const isActive = isNavActive(section);
    const baseColors = shouldUseLightColors 
      ? 'text-white' 
      : 'text-gray-600';
    
    if (section === 'hardware' || section === 'guide') {
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

  // Custom colors for guide button
  const getGuideColors = () => {
    const isActive = isGuidePage;
    const baseColors = shouldUseLightColors 
      ? 'text-white' 
      : 'text-gray-600';
    
    const activeColor = shouldUseLightColors ? 'text-yellow-400' : 'text-yellow-500';
    const hoverColor = shouldUseLightColors ? 'hover:text-yellow-400' : 'hover:text-yellow-500';
    
    return {
      text: isActive ? activeColor : baseColors,
      hover: hoverColor,
      underline: shouldUseLightColors ? 'bg-yellow-400' : 'bg-yellow-500'
    };
  };

  const guideColors = getGuideColors();

  return (
    <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-[0_2px_10px_rgba(13,148,136,0.1)]' : 'bg-transparent'
    }`}>
      <div className="w-full px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center ml-2 sm:ml-4 md:ml-10">
            <img 
              src="/images/logo.png" 
              alt="SentriGas Logo" 
              className="h-12 sm:h-14 w-auto cursor-pointer"
              onClick={handleHomeClick}
            />
          </div>

          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={handleHomeClick}
              className={`font-medium transition-all duration-200 relative group ${
                shouldUseLightColors ? 'text-white hover:text-teal-300' : 'text-gray-600 hover:text-teal-600'
              }`}
            >
              Home
              <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-200 w-0 group-hover:w-full ${
                shouldUseLightColors ? 'bg-teal-300' : 'bg-teal-600'
              }`}></span>
            </button>

            {!isGuidePage && (
              <>
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
              </>
            )}

            <button 
              onClick={handleGuideClick}
              className={`font-medium transition-all duration-200 relative group ${
                guideColors.text
              } ${guideColors.hover}`}
            >
              Guide
              <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-200 ${
                isGuidePage ? 'w-full' : 'w-0 group-hover:w-full'
              } ${guideColors.underline}`}></span>
            </button>
          </nav>

          <div className="flex items-center mr-2 sm:mr-4 md:mr-10">
            <div className="hidden md:block">
              {isLoggedIn ? (
                <button className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                  shouldUseLightColors 
                    ? 'text-white bg-teal-500 hover:bg-teal-600' 
                    : 'text-white bg-teal-600 hover:bg-teal-700'
                }`}>
                  Account
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  {/* Sign Up button */}
                  <button 
                    onClick={() => handleAuthButtonClick('signup')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      shouldUseLightColors
                        ? 'bg-amber-500 text-white hover:bg-amber-600'
                        : 'bg-amber-500 text-white hover:bg-amber-600'
                    }`}
                  >
                    SIGN UP
                  </button>
                  
                  {/* Login button */}
                  <button 
                    onClick={() => handleAuthButtonClick('signin')}
                    className={`px-4 py-2 border text-sm font-medium rounded-md transition-colors ${
                      shouldUseLightColors
                        ? 'border-teal-200 text-teal-200 hover:bg-teal-800 hover:bg-opacity-20'
                        : 'border-teal-300 text-teal-600 hover:bg-teal-50'
                    }`}
                  >
                    LOGIN
                  </button>
                </div>
              )}
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
                onClick={handleHomeClick}
                className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:text-teal-600 hover:bg-gray-50 transition-colors"
              >
                Home
              </button>

              {!isGuidePage && (
                <>
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
                </>
              )}

              <button 
                onClick={handleGuideClick}
                className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                  isGuidePage
                    ? 'text-yellow-500 bg-yellow-50 border-l-2 border-yellow-500'
                    : 'text-gray-700 hover:text-yellow-500 hover:bg-gray-50'
                }`}
              >
                Guide
              </button>
              <div className="pt-2 border-t border-gray-200">
                {isLoggedIn ? (
                  <button className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:text-teal-600 hover:bg-gray-50 transition-colors">
                    Account
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button 
                      onClick={() => handleAuthButtonClick('signup')}
                      className="w-full text-left px-3 py-2 rounded-md bg-amber-500 text-white hover:bg-amber-600 transition-colors"
                    >
                      SIGN UP
                    </button>
                    <button 
                      onClick={() => handleAuthButtonClick('signin')}
                      className="w-full text-left px-3 py-2 rounded-md border border-teal-300 text-teal-600 hover:bg-teal-50 transition-colors"
                    >
                      LOGIN
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}