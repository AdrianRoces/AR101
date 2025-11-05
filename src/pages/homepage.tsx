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
}

export default function Homepage({ onAuthSuccess }: HomepageProps) {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isSigninOpen, setIsSigninOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleTeamCards, setVisibleTeamCards] = useState<boolean[]>([]);
  
  const teamSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    // Initialize all team cards as not visible
    setVisibleTeamCards(new Array(12).fill(false));
  }, []);

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
      backgroundImage: "/images/ESP32DevelopmentBoard.jpg"
    },
    mission: {
      title: "OUR MISSION",
      description: [
        "To monitor LPG leaks in real time, automatically turn off the gas supply, and notify users immediately via email and the web in order to reduce risks and prevent disaster."
      ],
      imageUrl: "/images/ESP32DevelopmentBoard.jpg"
    },
    team: [
      {
        id: 1,
        name: "DECOLONGON",
        role: "CEO & Founder",
        imageUrl: "/images/decolongon.jpeg"
      },
      {
        id: 2,
        name: "Roces, Adrian A.",
        role: "CTO",
        imageUrl: "/images/pfp.jpg"
      },
      {
        id: 3,
        name: "PRINCESS",
        role: "Lead Engineer",
        imageUrl: "/images/princess.jpg"
      },
      {
        id: 4,
        name: "Emily Davis",
        role: "Product Manager",
        imageUrl: "/images/matias.jpg"
      },
      {
        id: 5,
        name: "David Wilson",
        role: "Hardware Specialist",
        imageUrl: "/images/argomido.png"
      },
      {
        id: 6,
        name: "Lisa Brown",
        role: "Software Developer",
        imageUrl: "/images/posa.jpg"
      },
      {
        id: 7,
        name: "Robert Taylor",
        role: "IoT Architect",
        imageUrl: "/images/posa.jpg"
      },
      {
        id: 8,
        name: "Jennifer Martinez",
        role: "UX Designer",
        imageUrl: "/images/posa.jpg"
      },
      {
        id: 9,
        name: "James Anderson",
        role: "Safety Engineer",
        imageUrl: "/images/posa.jpg"
      },
      {
        id: 10,
        name: "Maria Garcia",
        role: "Data Analyst",
        imageUrl: "/images/posa.jpg"
      },
      {
        id: 11,
        name: "Thomas Lee",
        role: "Operations Manager",
        imageUrl: "/images/posa.jpg"
      },
      {
        id: 12,
        name: "Amanda White",
        role: "Marketing Director",
        imageUrl: "/images/posa.jpg"
      }
    ]
  };

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
              <div className="w-32 h-32 sm:w-48 sm:h-48 flex items-center justify-center mt-[-60px] sm:mt-[-120px]">
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
        {/* Hardware Section - Remove animation wrapper to make it visible */}
        <HardwareSection />

        <section id="about" className="relative">
          {/* About Cover - Remove animation wrapper */}
          <AboutCover 
            title={aboutData.cover.title}
            description={aboutData.cover.description}
            backgroundImage={aboutData.cover.backgroundImage}
          />

          {/* Mission Section - Remove animation wrapper */}
          <div className="py-12 sm:py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <MissionSection 
                title={aboutData.mission.title}
                description={aboutData.mission.description}
                imageUrl={aboutData.mission.imageUrl}
              />
            </div>
          </div>

          {/* Team Section with scroll-triggered animations */}
          <div className="py-12 sm:py-20 bg-gray-50" ref={teamSectionRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-16">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">OUR TEAM</h3>
                <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                  Meet the dedicated professionals behind SentriGas who are committed to revolutionizing gas safety.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center px-2 sm:px-0">
                {aboutData.team.map((member, index) => (
                  <div
                    key={member.id}
                    className={`transition-all duration-500 transform ${
                      visibleTeamCards[index] 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-8 scale-95'
                    }`}
                    style={{
                      transitionDelay: visibleTeamCards[index] ? `${index * 100}ms` : '0ms'
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

        {/* Footer - Remove animation wrapper */}
        <Footer />

        <BackToTopButton onClick={scrollToTop} />
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