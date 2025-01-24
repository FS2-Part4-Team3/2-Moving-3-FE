'use client';

import Image from 'next/image';
import { createContext, useContext } from 'react';
import close from '@/../public/assets/common/icon_X.svg';
import type { ModalContextType } from '@/interfaces/CommonComp/HeadlessInterface';
import { ButtonWrapper } from './Button';

const ModalSmallContext = createContext<ModalContextType | undefined>(undefined);

export const ModalSmallWrapper = ({ children, onClose }: ModalContextType & { children: React.ReactNode }) => {
  const contextValue = { onClose };

  return (
    <ModalSmallContext.Provider value={contextValue}>
      <div className="fixed inset-0 flex items-end justify-center bg-[#000000] bg-opacity-50">
        <div className="bg-white px-[2.4rem] pt-[3.2rem] pb-[4rem] rounded-t-[3.2rem] w-full lg:gap-[4rem] gap-[2.6rem] flex flex-col">
          {children}
        </div>
      </div>
    </ModalSmallContext.Provider>
  );
};

const useModalContext = () => {
  const context = useContext(ModalSmallContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalWrapper');
  }
  return context;
};

const ModalHeader = ({ children }: { children: React.ReactNode }) => {
  const { onClose } = useModalContext();
  return (
    <div className="flex justify-between items-center">
      <p className="text-black-400 font-bold text-[1.8rem] leading-[2.6rem]">{children}</p>
      <Image src={close} alt="close" onClick={onClose} className="lg:hidden sm:block cursor-pointer" width={24} height={24} />
    </div>
  );
};

const ModalFooter = ({
  children,
  isDisabled,
  onClick,
}: {
  children: React.ReactNode;
  isDisabled: boolean;
  onClick?: () => void;
}) => {
  return (
    <ButtonWrapper id="modal-button" onClick={onClick}>
      <ButtonWrapper.Button
        className="w-full h-[5.4rem] rounded-[1.6rem] p-[1.6rem] font-semibold text-[1.6rem] leading-[2.6rem] text-white flex items-center justify-center"
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

ModalSmallWrapper.Header = ModalHeader;
ModalSmallWrapper.Footer = ModalFooter;
ModalSmallWrapper.Content = ModalContent;
