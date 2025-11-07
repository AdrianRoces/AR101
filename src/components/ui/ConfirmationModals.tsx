import { useEffect } from 'react';

export type ConfirmationType = 'success' | 'error' | 'warning' | 'info';
export type ActionType = 'signup' | 'signin' | 'update' | 'delete';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ConfirmationType;
  action: ActionType;
  title?: string;
  message?: string;
  autoCloseDelay?: number;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  type,
  action,
  title,
  message,
  autoCloseDelay = 3000
}: ConfirmationModalProps) {
  // Auto-close for success messages
  useEffect(() => {
    if (isOpen && type === 'success' && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [isOpen, type, autoCloseDelay, onClose]);

  if (!isOpen) return null;

  // Default titles and messages based on type and action
  const getDefaultContent = () => {
    switch (type) {
      case 'success':
        switch (action) {
          case 'signup':
            return {
              title: 'Welcome to SentriGas!',
              message: 'Your account has been created successfully. Check your email for the magic link.'
            };
          case 'signin':
            return {
              title: 'Welcome Back!',
              message: 'You have successfully signed in. Check your email for the magic link.'
            };
          case 'update':
            return {
              title: 'Profile Updated!',
              message: 'Your account information has been updated successfully.'
            };
          default:
            return {
              title: 'Success!',
              message: 'Action completed successfully.'
            };
        }
      case 'error':
        switch (action) {
          case 'signup':
            return {
              title: 'Sign Up Failed',
              message: 'Unable to create your account. Please try again.'
            };
          case 'signin':
            return {
              title: 'Sign In Failed',
              message: 'Unable to sign in. Please check your email and try again.'
            };
          case 'update':
            return {
              title: 'Update Failed',
              message: 'Unable to update your profile. Please try again.'
            };
          default:
            return {
              title: 'Error',
              message: 'Something went wrong. Please try again.'
            };
        }
      case 'warning':
        return {
          title: 'Warning',
          message: 'Please check your information and try again.'
        };
      case 'info':
        return {
          title: 'Information',
          message: 'Please check your email for further instructions.'
        };
      default:
        return {
          title: 'Notification',
          message: 'Action completed.'
        };
    }
  };

  const defaultContent = getDefaultContent();
  const finalTitle = title || defaultContent.title;
  const finalMessage = message || defaultContent.message;

  // Styles based on type
  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          icon: '✅',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          buttonColor: 'bg-green-500 hover:bg-green-600'
        };
      case 'error':
        return {
          icon: '❌',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          buttonColor: 'bg-red-500 hover:bg-red-600'
        };
      case 'warning':
        return {
          icon: '⚠️',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800',
          buttonColor: 'bg-yellow-500 hover:bg-yellow-600'
        };
      case 'info':
        return {
          icon: 'ℹ️',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
          buttonColor: 'bg-blue-500 hover:bg-blue-600'
        };
      default:
        return {
          icon: '💡',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-800',
          buttonColor: 'bg-gray-500 hover:bg-gray-600'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8 border-2 ${styles.bgColor} ${styles.borderColor}`}>
        {/* Header */}
        <div className="flex items-center justify-center mb-4">
          <span className="text-4xl mr-3">{styles.icon}</span>
          <h2 className={`text-xl md:text-2xl font-bold ${styles.textColor}`}>
            {finalTitle}
          </h2>
        </div>

        {/* Message */}
        <div className="text-center mb-6">
          <p className={`text-base md:text-lg ${styles.textColor} leading-relaxed`}>
            {finalMessage}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className={`px-6 py-3 text-white font-semibold rounded-lg transition-colors ${styles.buttonColor}`}
          >
            {type === 'success' && autoCloseDelay > 0 ? 'OK' : 'Close'}
          </button>
        </div>

        {/* Auto-close progress bar for success messages */}
        {type === 'success' && autoCloseDelay > 0 && (
          <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-green-500 h-1 rounded-full transition-all duration-300 ease-out"
              style={{ 
                width: '100%',
                animation: `shrink ${autoCloseDelay}ms linear forwards`
              }}
            />
            <style>
              {`
                @keyframes shrink {
                  from { width: 100%; }
                  to { width: 0%; }
                }
              `}
            </style>
          </div>
        )}
      </div>
    </div>
  );
}