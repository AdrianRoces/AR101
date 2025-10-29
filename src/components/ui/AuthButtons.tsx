import type { AuthButtonsProps } from '../../types';

interface ExtendedAuthButtonsProps extends AuthButtonsProps {
  onOpenSignup: () => void;
  onOpenSignin: () => void;
}

export default function AuthButtons({ 
  isLoggedIn = false, 
  onOpenSignup, 
  onOpenSignin 
}: ExtendedAuthButtonsProps) {
  if (isLoggedIn) {
    return (
      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700">
        Account
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      {/* Sign Up button on the left */}
      <button 
        onClick={onOpenSignup}
        className="px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-md hover:bg-amber-600 transition-colors"
      >
        SIGN UP
      </button>
      {/* Login button on the right */}
      <button 
        onClick={onOpenSignin}
        className="px-4 py-2 border border-teal-300 text-teal-600 text-sm font-medium rounded-md hover:bg-teal-50 transition-colors"
      >
        LOGIN
      </button>
    </div>
  );
}