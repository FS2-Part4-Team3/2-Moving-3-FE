import React, { createContext, useContext } from "react";
import type { InputContextType } from "@/interface/CommonComp/Headless/InputInterface";

const InputContext = createContext<InputContextType | undefined>(undefined);

export const InputWrapper = ({
  children,
  id,
  value,
  type = "text",
  onChange,
}: InputContextType & { children: React.ReactNode }) => {
  const contextValue = { id, value, type, onChange };

  return (
    <InputContext.Provider value={contextValue}>
      {children}
    </InputContext.Provider>
  );
};

const useInputContext = () => {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error("useInputContext must be used within an InputWrapper");
  }
  return context;
};

const Input = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input"> & { className?: string }) => {
  const { id, value, type, onChange } = useInputContext();
  return (
    <input
      id={id}
      value={value}
      type={type}
      onChange={onChange}
      className={className}
      {...props}
    />
  );
};

const Label = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"label"> & { className?: string }) => {
  const { id } = useInputContext();
  return (
    <label htmlFor={id} className={className} {...props}>
      {children}
    </label>
  );
};

InputWrapper.Input = Input;
InputWrapper.Label = Label;
