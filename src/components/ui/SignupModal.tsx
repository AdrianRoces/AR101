import { useState } from 'react';
import Modal from './Modal';
import type { ModalProps, AuthFormData, FormErrors } from '../../types/modal';

interface SignupModalProps extends ModalProps {
  onOpenSignin: () => void;
}

export default function SignupModal({ isOpen, onClose, onAuthSuccess, onGoogleAuth, onOpenSignin }: SignupModalProps) {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '' // We'll keep this for type consistency but not use it
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call for passwordless signup
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll consider any valid email as successful signup
      const userData = {
        email: formData.email,
        name: formData.email.split('@')[0], // Simple name extraction for demo
        token: 'demo-token-' + Date.now()
      };
      
      console.log('Signup success with data:', userData);
      onAuthSuccess?.(userData);
      onClose();
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onGoogleAuth?.();
      // After successful Google auth, this will be called
      const userData = {
        email: 'google-user@example.com',
        name: 'Google User',
        token: 'google-token-' + Date.now()
      };
      onAuthSuccess?.(userData);
      onClose();
    } catch (error) {
      console.error('Google sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        {/* Header */}
        <h2 className="text-4xl font-bold text-amber-500 mb-8">Sign up</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-gray-600 text-center mb-4">
            Enter your email to create an account with a magic link
          </p>

          {/* Email Input */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              aria-label="Email"
              aria-invalid={!!errors.email}
              disabled={isLoading}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-amber-500 text-white font-bold rounded-full hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-4"
          >
            {isLoading ? 'Sending magic link...' : 'Send magic link'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-[1px] bg-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">or</span>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

        {/* Google Sign Up */}
        <button
          onClick={handleGoogleSignUp}
          disabled={isLoading}
          className="w-full h-12 border border-gray-300 rounded-full flex items-center justify-center space-x-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <GoogleIcon />
          <span>Sign up with Google</span>
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <button
            onClick={() => {
              onClose();
              onOpenSignin();
            }}
            className="text-amber-500 font-semibold hover:underline focus:outline-none focus:underline"
            disabled={isLoading}
          >
            Sign in
          </button>
        </p>
      </div>
    </Modal>
  );
}

// Google Icon SVG
const GoogleIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);