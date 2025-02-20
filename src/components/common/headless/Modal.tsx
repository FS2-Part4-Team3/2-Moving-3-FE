'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { createContext, useContext, useState } from 'react';
import close from '@/../public/assets/common/icon_X.svg';
import type { ModalContextType } from '@/interfaces/CommonComp/HeadlessInterface';
import { ButtonWrapper } from './Button';

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 80, damping: 10 } },
  exit: { opacity: 0, scale: 0.8, transition: { type: 'spring', stiffness: 80, damping: 10, duration: 0.3 } },
};

export const ModalWrapper = ({ children, onClose, className = '' }: ModalContextType & { children: React.ReactNode }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsClosing(true);
  };

  return isVisible ? (
    <ModalContext.Provider value={{ onClose: handleClose }}>
      <div className="fixed inset-0 flex items-center justify-center bg-[#000000] bg-opacity-50">
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
          className={`bg-white dark:bg-dark-p px-[2.4rem] pt-[3.2rem] pb-[4rem] rounded-[3.2rem] w-auto lg:gap-[4rem] sm:gap-[2.6rem] flex flex-col ${className}`}
        >
          {children}
        </motion.div>
      </div>
    </ModalContext.Provider>
  ) : null;
};

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalWrapper');
  }
  return context;
};

const ModalHeader = ({ children }: { children: React.ReactNode }) => {
  const { onClose } = useModalContext();
  return (
    <div className="flex justify-between items-center">
      <p className="text-black-400 dark:text-dark-t lg:font-semibold sm:font-bold lg:text-[2.4rem] sm:text-[1.8rem] lg:leading-[3.2rem] sm:leading-[2.6rem]">
        {children}
      </p>
      <Image src={close} alt="close" onClick={onClose} className="lg:block sm:hidden cursor-pointer" width={36} height={36} />
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
        className="lg:w-[56rem] lg:h-[6.4rem] sm:w-[32.7rem] sm:h-[5.4rem] rounded-[1.6rem] p-[1.6rem] font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] text-white flex items-center justify-center"
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

ModalWrapper.Header = ModalHeader;
ModalWrapper.Footer = ModalFooter;
ModalWrapper.Content = ModalContent;
