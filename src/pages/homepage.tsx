import { useState } from 'react';
import TopNavbar from '../components/layout/topnavbar';
import SignupModal from '../components/ui/SignupModal';
import SigninModal from '../components/ui/SigninModal';

interface HomepageProps {
  onAuthSuccess: (data: any) => void;
  isLoggedIn: boolean;
}

export default function Homepage({ onAuthSuccess, isLoggedIn }: HomepageProps) {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isSigninOpen, setIsSigninOpen] = useState(false);

  const handleGoogleAuth = () => {
    console.log('Google auth clicked');
  };

  const handleGetStarted = () => {
    setIsSignupOpen(true);
  };

  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopNavbar 
        isLoggedIn={isLoggedIn} 
        onOpenSignup={() => setIsSignupOpen(true)}
        onOpenSignin={() => setIsSigninOpen(true)}
      />

      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-3xl w-full rounded-xl p-10">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Temporary image container */}
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center shadow-md">
              <span className="text-gray-600 text-sm">LOGO</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-teal-600">
              SENTRI <span className="text-orange-400">GAS</span>
            </h1>

            <h2 className="text-sm font-semibold text-gray-800">
              IoT-Enabled Smart Alarm with Automated Shut-off for Enhanced Gas Safety
            </h2>

            <p className="text-sm text-gray-700 max-w-2xl">
              SentryGas is a smart safety device that protects homes and businesses from gas leaks. It continuously monitors gas levels, sounds an alarm when danger is detected, and can automatically shut off the gas to prevent fires or explosions. With instant smartphone alerts, users stay informed and safe even when away. Reliable and easy to use, SentryGas provides peace of mind for everyday gas safety.
            </p>

            <button 
              onClick={handleGetStarted}
              className="mt-4 px-6 py-2 bg-teal-400 text-white font-semibold rounded-md hover:bg-teal-500 transition-colors"
            >
              GET STARTED
            </button>
          </div>
        </div>
      </main>

      {/* Modals */}
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onAuthSuccess={onAuthSuccess}
        onGoogleAuth={handleGoogleAuth}
        onOpenSignin={() => {
          setIsSignupOpen(false);
          setIsSigninOpen(true);
        }}
      />

      <SigninModal
        isOpen={isSigninOpen}
        onClose={() => setIsSigninOpen(false)}
        onAuthSuccess={onAuthSuccess}
        onGoogleAuth={handleGoogleAuth}
        onOpenSignup={() => {
          setIsSigninOpen(false);
          setIsSignupOpen(true);
        }}
      />
    </div>
  );
}