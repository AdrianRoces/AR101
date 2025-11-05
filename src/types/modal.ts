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

export interface SigninModalProps extends ModalProps {
  onOpenSignup: () => void;
}

export interface SignupModalProps extends ModalProps {
  onOpenSignin: () => void;
}