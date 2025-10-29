export interface AuthButtonsProps {
  isLoggedIn?: boolean;
}

export interface ExtendedAuthButtonsProps extends AuthButtonsProps {
  onOpenSignup: () => void;
  onOpenSignin: () => void;
}