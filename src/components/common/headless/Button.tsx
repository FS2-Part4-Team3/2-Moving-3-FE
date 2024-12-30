import { createContext, useContext } from "react";
import type { ButtonContextType } from "@/interface/CommonComp/HeadlessInterface";

const ButtonContext = createContext<ButtonContextType | undefined>(undefined);

export const ButtonWrapper = ({
  children,
  id,
  label,
  onClick,
}: ButtonContextType & { children: React.ReactNode }) => {
  const contextValue = { id, label, onClick };

  return (
    <ButtonContext.Provider value={contextValue}>
      {children}
    </ButtonContext.Provider>
  );
};

const useButtonContext = () => {
  const context = useContext(ButtonContext);
  if (!context) {
    throw new Error("useButtonContext must be used within a ButtonWrapper");
  }
  return context;
};

const Button = ({
  className,
  disabled = false,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & {
  className?: string;
  disabled?: boolean;
}) => {
  const { id, label, onClick } = useButtonContext();

  return (
    <button
      id={id}
      aria-label={label}
      onClick={disabled ? undefined : onClick}
      className={`${className} ${disabled ? "cursor-not-allowed" : ""}`}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
};

ButtonWrapper.Button = Button;
