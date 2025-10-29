import Logo from '../ui/Logo';
import AuthButtons from '../ui/AuthButtons';
import type { AuthButtonsProps } from '../../types';

interface ExtendedAuthButtonsProps extends AuthButtonsProps {
  onOpenSignup: () => void;
  onOpenSignin: () => void;
}

export default function TopNavbar({ 
  isLoggedIn = false, 
  onOpenSignup, 
  onOpenSignin 
}: ExtendedAuthButtonsProps) {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: logo container with 20px margin */}
          <div className="flex-shrink-0 flex items-center ml-[20px]">
            <Logo />
          </div>

          {/* Center: nav links */}
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="text-gray-700 hover:text-teal-600 font-medium">About</a>
            <a href="#contact" className="text-gray-700 hover:text-teal-600 font-medium">Contact</a>
            <a href="#terms" className="text-gray-700 hover:text-teal-600 font-medium">Terms of Use</a>
          </nav>

          {/* Right: auth buttons with 20px margin */}
          <div className="flex items-center mr-[20px]">
            <AuthButtons 
              isLoggedIn={isLoggedIn} 
              onOpenSignup={onOpenSignup}
              onOpenSignin={onOpenSignin}
            />
          </div>
        </div>
      </div>
    </header>
  );
}