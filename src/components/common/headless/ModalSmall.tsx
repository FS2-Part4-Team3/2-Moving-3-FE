'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { createContext, useContext, useState } from 'react';
import close from '@/../public/assets/common/icon_X.svg';
import type { ModalContextType } from '@/interfaces/CommonComp/HeadlessInterface';
import { ButtonWrapper } from './Button';

const ModalSmallContext = createContext<ModalContextType | undefined>(undefined);

const modalVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: { y: '0%', opacity: 1, transition: { type: 'tween', duration: 0.4 } },
  exit: { y: '100%', opacity: 0, transition: { type: 'tween', duration: 0.4 } },
};

export const ModalSmallWrapper = ({ children, onClose }: ModalContextType & { children: React.ReactNode }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsClosing(true);
  };

  return isVisible ? (
    <ModalSmallContext.Provider value={{ onClose: handleClose }}>
      <div className="fixed inset-0 flex items-end justify-center bg-[#000000] bg-opacity-50">
        <motion.div
          initial="hidden"
          animate={isClosing ? 'exit' : 'visible'}
          variants={modalVariants}
          onAnimationComplete={() => {
            if (isClosing) {
              setIsVisible(false);
              onClose();
            }
          }}
          className="bg-white dark:bg-dark-p px-[2.4rem] pt-[3.2rem] pb-[4rem] rounded-t-[3.2rem] w-full lg:gap-[4rem] gap-[2.6rem] flex flex-col"
        >
          {children}
        </motion.div>
      </div>
    </ModalSmallContext.Provider>
  ) : null;
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
      <p className="text-black-400 dark:text-dark-t font-bold text-[1.8rem] leading-[2.6rem]">{children}</p>
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
  const { onClose } = useModalContext();

  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }
    onClose();
  };
  return (
    <ButtonWrapper id="modal-button" onClick={handleButtonClick}>
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
  return <div className="text-black-400">{children}</div>;
};

ModalSmallWrapper.Header = ModalHeader;
ModalSmallWrapper.Footer = ModalFooter;
ModalSmallWrapper.Content = ModalContent;
