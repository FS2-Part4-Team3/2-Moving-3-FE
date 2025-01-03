"use client";

import { createContext, useContext } from "react";
import close from "@/../public/assets/common/icon_X.svg";
import Image from "next/image";
import type { ModalContextType } from "@/interfaces/CommonComp/HeadlessInterface";
import { ButtonWrapper } from "./Button";

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalWrapper = ({
  children,
  onClose,
}: ModalContextType & { children: React.ReactNode }) => {
  const contextValue = { onClose };

  return (
    <ModalContext.Provider value={contextValue}>
      <div className="fixed inset-0 flex items-center justify-center bg-[#000000] bg-opacity-50">
        <div className="bg-gray-50 px-[2.4rem] pt-[3.2rem] pb-[4rem] rounded-[3.2rem] w-auto gap-[4rem] flex flex-col">
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
};

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalWrapper");
  }
  return context;
};

const ModalHeader = ({ children }: { children: React.ReactNode }) => {
  const { onClose } = useModalContext();
  return (
    <div className="flex justify-between items-center">
      <p className="text-black-400 font-semibold text-[2.4rem] leading-[3.2rem]">
        {children}
      </p>
      <Image
        src={close}
        alt="close"
        onClick={onClose}
        className="lg:block sm:hidden cursor-pointer"
        width={32}
        height={32}
      />
      <Image
        src={close}
        alt="close"
        onClick={onClose}
        className="lg:hidden sm:block cursor-pointer"
        width={24}
        height={24}
      />
    </div>
  );
};

const ModalFooter = ({
  children,
  isDisabled,
}: {
  children: React.ReactNode;
  isDisabled: boolean;
}) => {
  const { onClose } = useModalContext();

  return (
    <ButtonWrapper id="modal-button" onClick={onClose}>
      <ButtonWrapper.Button
        className="lg:w-[56rem] lg:h-[6.4rem] sm:w-[32.7rem] sm:h-[5.4rem] rounded-[1.6rem] p-[1.6rem] font-semibold text-[2rem] leading-[3.2rem] text-gray-50 flex items-center justify-center"
        disabled={isDisabled}
      >
        {children}
      </ButtonWrapper.Button>
    </ButtonWrapper>
  );
};

const ModalContent = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

ModalWrapper.Header = ModalHeader;
ModalWrapper.Footer = ModalFooter;
ModalWrapper.Content = ModalContent;
