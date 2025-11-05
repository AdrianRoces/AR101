import type { AuthButtonsProps } from '../../types';

interface ExtendedAuthButtonsProps extends AuthButtonsProps {
  onOpenSignup: () => void;
  onOpenSignin: () => void;
  isTransparent?: boolean;
}

export default function AuthButtons({ 
  isLoggedIn = false, 
  onOpenSignup, 
  onOpenSignin,
  isTransparent = false
}: ExtendedAuthButtonsProps) {
  if (isLoggedIn) {
    return (
      <button className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
        isTransparent 
          ? 'text-white bg-teal-500 hover:bg-teal-600' 
          : 'text-white bg-teal-600 hover:bg-teal-700'
      }`}>
        Account
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      {/* Sign Up button */}
      <button 
        onClick={onOpenSignup}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          isTransparent
            ? 'bg-amber-500 text-white hover:bg-amber-600'
            : 'bg-amber-500 text-white hover:bg-amber-600'
        }`}
      >
        SIGN UP
      </button>
      
      {/* Login button */}
      <button 
        onClick={onOpenSignin}
        className={`px-4 py-2 border text-sm font-medium rounded-md transition-colors ${
          isTransparent
            ? 'border-teal-200 text-teal-200 hover:bg-teal-800 hover:bg-opacity-20'
            : 'border-teal-300 text-teal-600 hover:bg-teal-50'
        }`}
      >
        LOGIN
      </button>
    </div>
  );
}