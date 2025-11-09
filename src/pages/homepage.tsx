import { useState, useEffect, useRef } from 'react';
import TopNavbar from '../components/layout/homepagelayout/topnavbar';
import SignupModal from '../components/ui/SignupModal';
import SigninModal from '../components/ui/SigninModal';
import HardwareSection from '../components/homepage/hardware/HardwareSection';
import AboutCover from '../components/homepage/about/AboutCover';
import MissionSection from '../components/homepage/about/MissionSection';
import TeamMemberCard from '../components/homepage/about/TeamMemberCard';
import BackToTopButton from '../components/ui/BackToTopButton';
import Footer from '../components/layout/footer';

interface HomepageProps {
  onAuthSuccess: (data: any) => void;
  onLogout: () => void;
  isLoggedIn: boolean;
  userData: any;
  autoOpenSignup?: boolean;
  onAutoOpenSignupComplete?: () => void;
}

export default function Homepage({ 
  onAuthSuccess, 
  autoOpenSignup = false, 
  onAutoOpenSignupComplete 
}: HomepageProps) {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isSigninOpen, setIsSigninOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleTeamCards, setVisibleTeamCards] = useState<boolean[]>([]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const teamSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    // Initialize all team cards as not visible
    setVisibleTeamCards(new Array(12).fill(false));

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Auto open signup modal if coming from guide page
    if (autoOpenSignup) {
      setIsSignupOpen(true);
      onAutoOpenSignupComplete?.();
    }
  }, [autoOpenSignup, onAutoOpenSignupComplete]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && teamSectionRef.current) {
            // When team section comes into view, animate cards one by one
            setTimeout(() => {
              setVisibleTeamCards(prev => {
                const newState = [...prev];
                newState.forEach((_, index) => {
                  setTimeout(() => {
                    setVisibleTeamCards(current => {
                      const updated = [...current];
                      updated[index] = true;
                      return updated;
                    });
                  }, index * 100); // 100ms delay between each card
                });
                return newState;
              });
            }, 200);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    if (teamSectionRef.current) {
      observer.observe(teamSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleGetStarted = () => {
    setIsSignupOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const aboutData = {
    cover: {
      title: "ABOUT US",
      description: [
        "SentriGas is an IoT smart alarm that actively monitors for LPG leaks. It ensures safety by automatically isolating the gas supply and dispatching notifications instantly."
      ],
      backgroundImage: "/images/cover.jfif"
    },
    mission: {
      title: "OUR MISSION",
      description: [
        "To monitor LPG leaks in real time, automatically turn off the gas supply, and notify users immediately via email and the web in order to reduce risks and prevent disaster."
      ],
      imageUrl: "/images/posa.jpg"
    },
    team: [
      // First row (5 cards)
      {
        id: 1,
        name: "Matias, Dominiq James B.",
        role: "Project Manager",
        imageUrl: "/images/matias.jpg",
        isLarge: true
      },
      {
        id: 2,
        name: "Argomido Jr., Marlito N.",
        role: "Lead Documentation Specialist",
        imageUrl: "/images/argomido.png"
      },
      {
        id: 3,
        name: "Pitel, John Kenneth P.",
        role: "Backend Developer & UI/UX Designer",
        imageUrl: "/images/pitel.jpg"
      },
      {
        id: 4,
        name: "Roces, Adrian A.",
        role: "Frontend Developer & UI/UX Designer",
        imageUrl: "/images/roces.jpg"
      },
      {
        id: 5,
        name: "Bacquial, Princess Ann S.",
        role: "UI/UX Designer & Documentation",
        imageUrl: "/images/bacquial.jpg"
      },
      // Second row (5 cards) - Alphabetical documentation
      {
        id: 6,
        name: "Amistoso, Josmar C.",
        role: "Technical Documentation",
        imageUrl: "/images/amistoso.jpg"
      },
      {
        id: 7,
        name: "Bendico, Liester",
        role: "Technical Documentation",
        imageUrl: "/images/bendico.png"
      },
      {
        id: 8,
        name: "Decolongon, Marc Andrae P.",
        role: "Technical Documentation",
        imageUrl: "/images/decolongon.jpeg"
      },
      {
        id: 9,
        name: "Gueriña, Brianah Nicole",
        role: "Technical Documentation",
        imageUrl: "/images/gerina.jpg"
      },
      {
        id: 10,
        name: "Paano, Khylle A.",
        role: "Technical Documentation",
        imageUrl: "/images/paano.jpg"
      },
      // Third row (2 cards) - Alphabetical documentation
      {
        id: 11,
        name: "Payang, Chester Kirby V.",
        role: "Technical Documentation",
        imageUrl: "/images/payang.png"
      },
      {
        id: 12,
        name: "Valle, Ruzzel A.",
        role: "Technical Documentation",
        imageUrl: "/images/valle.png"
      }
    ]
  };

  // First 10 team members for the 5x2 grid
  const firstTenTeamMembers = aboutData.team.slice(0, 10);
  // Last 2 team members for special placement
  const lastTwoTeamMembers = aboutData.team.slice(10);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopNavbar 
        isLoggedIn={false}
        onOpenSignup={() => setIsSignupOpen(true)}
        onOpenSignin={() => setIsSigninOpen(true)}
      />

      <section 
        id="home" 
        className="min-h-screen relative pt-16"
        style={{
          backgroundImage: "url('/images/heroimage.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="relative z-10 flex items-center min-h-screen px-4 sm:px-8 lg:p-24">
          <div className={`max-w-3xl w-full transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="flex flex-col items-start space-y-6 sm:space-y-8 text-left">
              <div className="w-60 h-60 sm:w-48 sm:h-48 flex items-center justify-center ml-[-50px] mt-[-200px] sm:mt-[-120px]">
                <img 
                  src="/images/logo.png" 
                  alt="SentriGas Logo" 
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2DD4BF]">
                  SENTRI<span className="text-[#F59E0B]">GAS</span>
                </h1>

                <h2 className="text-lg sm:text-xl font-semibold text-gray-200">
                  Smart Gas Safety Monitoring System
                </h2>

                <p className="text-gray-200 leading-relaxed max-w-2xl text-sm sm:text-base">
                  SentriGas provides real-time gas leak detection with automatic shut-off and instant alerts. 
                  Protect your home or business with our reliable IoT-enabled safety solution.
                </p>
              </div>

              <button 
                onClick={handleGetStarted}
                className="px-6 py-3 sm:px-8 sm:py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-500 transition-all duration-300 text-sm sm:text-base relative overflow-hidden group hover:shadow-[0_0_20px_rgba(45,212,191,0.3)]"
              >
                <span className="relative z-10">GET STARTED</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-30 bg-white">
        <HardwareSection />

        <section id="about" className="relative">
          <AboutCover 
            title={aboutData.cover.title}
            description={aboutData.cover.description}
            backgroundImage={aboutData.cover.backgroundImage}
          />

          <div className="py-12 sm:py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <MissionSection 
                title={aboutData.mission.title}
                description={aboutData.mission.description}
                imageUrl={aboutData.mission.imageUrl}
              />
            </div>
          </div>

          <div className="py-12 sm:py-20 bg-gray-50" ref={teamSectionRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-16">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">OUR TEAM</h3>
                <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                  Meet the dedicated professionals behind SentriGas who are committed to revolutionizing gas safety.
                </p>
              </div>

              {/* First 10 team members in 1 column on mobile, 5 columns on large screens */}
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center px-2 sm:px-0 mb-12">
                {firstTenTeamMembers.map((member, index) => (
                  <div
                    key={member.id}
                    className={`transition-all duration-500 transform ${
                      visibleTeamCards[index] 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-8 scale-95'
                    } ${member.isLarge ? 'w-full max-w-[220px]' : 'w-full max-w-[200px]'}`}
                    style={{
                      transitionDelay: visibleTeamCards[index] ? `${index * 100}ms` : '0ms'
                    }}
                  >
                    {member.isLarge ? (
                      // Slightly bigger PM card
                      <div className="bg-white rounded-lg shadow-lg p-0 text-left transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in-up relative overflow-hidden group w-full mx-auto">
                        <div className="w-full aspect-square overflow-hidden">
                          {member.imageUrl ? (
                            <img 
                              src={member.imageUrl} 
                              alt={member.name}
                              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                              <span className="text-white font-semibold text-xs sm:text-sm">Team Member</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="p-4">
                          <div className="text-teal-600 font-semibold mb-2 text-sm uppercase tracking-wide line-clamp-2">
                            {member.role}
                          </div>
                          
                          <div className="text-gray-900 font-bold text-base leading-tight line-clamp-2">
                            {member.name}
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-teal-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
                      </div>
                    ) : (
                      // Normal team member card
                      <TeamMemberCard
                        name={member.name}
                        role={member.role}
                        imageUrl={member.imageUrl}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Last 2 team members centered below - 1 column on mobile */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 px-2 sm:px-0">
                {lastTwoTeamMembers.map((member, index) => (
                  <div
                    key={member.id}
                    className={`w-full max-w-[200px] transition-all duration-500 transform ${
                      visibleTeamCards[index + 10] 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-8 scale-95'
                    }`}
                    style={{
                      transitionDelay: visibleTeamCards[index + 10] ? `${(index + 10) * 100}ms` : '0ms'
                    }}
                  >
                    <TeamMemberCard
                      name={member.name}
                      role={member.role}
                      imageUrl={member.imageUrl}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />

        {/* Back to Top Button */}
        {showBackToTop && <BackToTopButton onClick={scrollToTop} />}
      </div>

      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onAuthSuccess={onAuthSuccess}
        onGoogleAuth={() => console.log('Google auth clicked')}
        onOpenSignin={() => {
          setIsSignupOpen(false);
          setIsSigninOpen(true);
        }}
      />

      <SigninModal
        isOpen={isSigninOpen}
        onClose={() => setIsSigninOpen(false)}
        onAuthSuccess={onAuthSuccess}
        onGoogleAuth={() => console.log('Google auth clicked')}
        onOpenSignup={() => {
          setIsSigninOpen(false);
          setIsSignupOpen(true);
        }}
      />
    </div>
  );
}