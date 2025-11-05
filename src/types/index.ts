export interface AuthButtonsProps {
  isLoggedIn?: boolean;
  onOpenSignup: () => void;
  onOpenSignin: () => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: (data: any) => void;
  onGoogleAuth?: () => void;
}

export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}