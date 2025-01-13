import { createContext, useContext } from 'react';
import type { ButtonContextType } from '@/interfaces/CommonComp/HeadlessInterface';

const ButtonContext = createContext<ButtonContextType | undefined>(undefined);

export const ButtonWrapper = ({ children, id, onClick, type }: ButtonContextType & { children: React.ReactNode }) => {
  const contextValue = { id, onClick, type };

  return <ButtonContext.Provider value={contextValue}>{children}</ButtonContext.Provider>;
};

const useButtonContext = () => {
  const context = useContext(ButtonContext);
  if (!context) {
    throw new Error('useButtonContext must be used within a ButtonWrapper');
  }
  return context;
};

const Button = ({
  className,
  disabled = false,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'button'> & {
  className?: string;
  disabled?: boolean;
}) => {
  const { id, onClick } = useButtonContext();

  return (
    <button
      id={id}
      onClick={disabled ? undefined : onClick}
      className={`${className} ${disabled ? 'cursor-not-allowed bg-gray-100' : 'bg-blue-300'}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

ButtonWrapper.Button = Button;
