import { useState, useEffect } from 'react';
import TopNavbar from '../components/layout/homepagelayout/topnavbar';
import Footer from '../components/layout/footer';
import BackToTopButton from '../components/ui/BackToTopButton';

interface GuidePageProps {
  isLoggedIn: boolean;
  onOpenSignup: () => void;
  onOpenSignin: () => void;
}

export default function GuidePage({ isLoggedIn, onOpenSignup, onOpenSignin }: GuidePageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGetStarted = () => {
    // Navigate to homepage and open signup
    window.location.href = '/';
    // The signup modal will be opened from the homepage
    // We'll need to pass a parameter or use state management to auto-open signup
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopNavbar 
        isLoggedIn={isLoggedIn}
        onOpenSignup={onOpenSignup}
        onOpenSignin={onOpenSignin}
        isGuidePage={true}
      />

      {/* Hero Section - Same as homepage but half height and 2 columns */}
      <section 
        id="home" 
        className="h-[50vh] min-h-[500px] sm:min-h-[400px] relative pt-16"
        style={{
          backgroundImage: "url('/images/heroimage.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="relative z-10 flex items-center h-full px-4 sm:px-8 lg:px-24">
          <div className={`max-w-7xl w-full transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {/* Mobile Layout: Logo + Label on top, content below */}
            <div className="lg:hidden flex flex-col items-center text-center space-y-6">
              {/* Logo and SENTRYGAS label */}
              <div className="flex flex-col items-center space-y-4">
                <div className="w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
                  <img 
                    src="/images/logo.png" 
                    alt="SentriGas Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#2DD4BF]">
                  SENTRY<span className="text-[#F59E0B]">GAS</span>
                </h1>
              </div>

              {/* System Guide content */}
              <div className="flex flex-col items-center space-y-4">
                <span className="text-2xl sm:text-3xl text-[#06B6D4] font-bold">
                  System Guide
                </span>

                <h2 className="text-lg sm:text-xl font-semibold text-gray-200">
                  Smart Gas Safety Monitoring System
                </h2>

                <p className="text-gray-200 leading-relaxed max-w-2xl text-sm sm:text-base italic">
                  The quick and easy guide to your device's status and control.
                </p>

                {/* Get Started Button */}
                <button 
                  onClick={handleGetStarted}
                  className="px-8 py-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-500 transition-all duration-300 text-base relative overflow-hidden group hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] mt-4"
                >
                  <span className="relative z-10">GET STARTED</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </button>
              </div>
            </div>

            {/* Desktop Layout: 2 columns with logo + label on left */}
            <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Column - Logo with SENTRYGAS label below */}
              <div className="flex flex-col items-center lg:items-start space-y-2 lg:space-y-0 lg:ml-24 mt-[-70px]">
                <div className="w-60 h-60 flex items-center justify-center">
                  <img 
                    src="/images/logo.png" 
                    alt="SentriGas Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h1 className="text-4xl xl:text-5xl font-bold text-[#2DD4BF] text-center lg:text-left">
                  SENTRY<span className="text-[#F59E0B]">GAS</span>
                </h1>
              </div>

              {/* Right Column - System Guide content */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 lg:space-y-6">
                <span className="text-3xl xl:text-4xl text-[#06B6D4] font-bold">
                  System Guide
                </span>

                <h2 className="text-xl lg:text-2xl font-semibold text-gray-200">
                  Smart Gas Safety Monitoring System
                </h2>

                <p className="text-gray-200 leading-relaxed max-w-2xl text-lg italic">
                  The quick and easy guide to your device's status and control.
                </p>

                {/* Get Started Button */}
                <button 
                  onClick={handleGetStarted}
                  className="px-8 py-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-500 transition-all duration-300 text-base relative overflow-hidden group hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] mt-2"
                >
                  <span className="relative z-10">GET STARTED</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section - 2 Column Layout */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Left Column - WiFi Setup Guide */}
            <div className="bg-white rounded-lg shadow-lg p-5 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-teal-500">
                WIFI SETUP Guide
              </h2>
              <p className="text-gray-700 mb-6 text-base leading-relaxed">
                This is what you need to do when the LED is "Purple Blinking" (WiFi Manager Portal Active) to connect to your WiFi.
              </p>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Connect to the Device Hotspot
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-base">
                      In your phone/laptop settings, find and connect to the WiFi named "SentryGas".
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Go to the Configuration Portal
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-base">
                      A pop-up/browser window should appear.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Select WiFi and Save Credentials
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-base">
                      From the list, select your WiFi (SSID) and enter the correct Password. Click Save.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Check the Device Connection Status
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-base">
                      You will see the "Saving Credentials" message while attempting to connect. Wait for the process to finish.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">5</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Connection Success!
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-base">
                      Once the LED turns "Steady Green", the device is "Safe & Connected".
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - LED Status Meanings */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-5 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-teal-500">
                  LED Status Meanings
                </h2>

                <div className="space-y-6">
                  {/* Red Blinking */}
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Red Blinking
                      </h3>
                      <p className="text-gray-700 leading-relaxed font-medium text-base">
                        HAZARD CONFIRMED
                      </p>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        Critical hazard detected in immediate emergency state. Take action.
                      </p>
                    </div>
                  </div>

                  {/* Purple Blinking */}
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <div className="w-6 h-6 bg-purple-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Purple Blinking
                      </h3>
                      <p className="text-gray-700 leading-relaxed font-medium text-base">
                        WIFIMANAGER PORTAL ACTIVE
                      </p>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        Ready for WiFi setup. Required connection via hotspot.
                      </p>
                    </div>
                  </div>

                  {/* Steady Blue */}
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Steady Blue
                      </h3>
                      <p className="text-gray-700 leading-relaxed font-medium text-base">
                        MANUAL CONTROL
                      </p>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        Device & connected and under manual server control.
                      </p>
                    </div>
                  </div>

                  {/* Steady Green */}
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Steady Green
                      </h3>
                      <p className="text-gray-700 leading-relaxed font-medium text-base">
                        SAFE & CONNECTED
                      </p>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        Device is properly connected to WiFi and operating normally.
                      </p>
                    </div>
                  </div>

                  {/* Other Purple Uses */}
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Other Purple Uses
                      </h3>
                      <p className="text-gray-700 leading-relaxed font-medium text-base">
                        SAFE & CONNECTED
                      </p>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        Steady: Brief "startup" phase<br />
                        Brief Flash: After "Reset Action" release.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Red Button Action - Below LED Status */}
              <div className="bg-white rounded-lg shadow-lg p-5 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-red-500">
                  RED BUTTON Action
                </h2>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <h3 className="text-lg font-bold text-red-800 mb-2">
                    HOW TO RESET (HOLD)
                  </h3>
                  <p className="text-red-700 text-base font-semibold leading-relaxed">
                    "HOLD THE RED BUTTON" to initiate the WIFI CREDENTIAL RESET or WIFI DISCONNECT.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Back to Top Button */}
      {showBackToTop && <BackToTopButton onClick={scrollToTop} />}
    </div>
  );
}