'use client';

import Image from 'next/image';
import { useState } from 'react';
import writing from '@/../public/assets/common/ic_writing.svg';
import type { ReceiveQuoteCardProps } from '@/interfaces/Card/ReceiveQuoteCardInterface';
import AddressFormat, { DateFormat, timeAgoFormat } from '@/utils/Format';
import MovingTypeChips from '../chips/MovingTypeChips';
import { ButtonWrapper } from '../common/headless/Button';
import RejectQuotationModal from '../modal/RejectQuotationModal';
import SendQuotationModal from '../modal/SendQuotationModal';
import ReceiveQuoteCardSkeleton from '../skeleton/ReceiveQuoteCardSkeleton';

export default function ReceiveQuoteCard({ data }: ReceiveQuoteCardProps) {
  const [sendQuote, setSendQuote] = useState<boolean>(false);
  const [rejectQuote, setRejectQuote] = useState<boolean>(false);

  const handleRejectClose = () => {
    setRejectQuote(!rejectQuote);
  };

  const handleSendQuoteClose = () => {
    setSendQuote(!sendQuote);
  };

  return (
    // <div className="flex flex-col w-full border border-line-100 lg:pt-[2rem] lg:pb-[2.4rem] lg:px-[2.4rem] sm:py-[1.6rem] sm:px-[1.4rem] shadow-[-0.2rem_-0.2rem_1rem_rgba(220,220,220,0.14)] rounded-[1.6rem] gap-[1.6rem] dark:shadow dark:bg-dark-p">
    //   <div className="flex w-full justify-between items-center">
    //     <div className="flex lg:gap-[1.2rem] sm:gap-[0.8rem]">
    //       <MovingTypeChips type={data.serviceType} />
    //       {data.isSpecificRequest && <MovingTypeChips type="APPOINTMENT" />}
    //     </div>
    //     <p className="font-normal text-[1.4rem] leading-[2.4rem] text-gray-500 dark:text-dark-t">
    //       {timeAgoFormat(data.updatedAt)}
    //     </p>
    //   </div>
    //   <div className="flex flex-col lg:gap-[1.8rem] md:gap-[1.4rem] sm:gap-[1rem]">
    //     <p className="font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] text-black-300 dark:text-dark-t">
    //       {data.owner.name} 고객님
    //     </p>
    //     <div className="w-full border border-line-200 md:block sm:hidden" />
    //     <div className="flex md:flex-row sm:flex-col lg:gap-[1.6rem] md:gap-[1.4rem] items-center sm:gap-[1rem]">
    //       <div className="flex lg:gap-[1.2rem] sm:gap-[0.8rem] items-center md:w-auto sm:w-full md:justify-center sm:justify-start">
    //         <p className="rounded-[0.4rem] py-[0.4rem] px-[0.6rem] bg-background-400 w-fit h-fit font-normal lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-gray-500">
    //           이사일
    //         </p>
    //         <p className="font-medium lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-black-300 dark:text-dark-t">
    //           {DateFormat(data.date)}
    //         </p>
    //       </div>
    //       <div className="h-[1.6rem] border border-line-200 md:block sm:hidden" />
    //       <div className="w-full border border-line-200 md:hidden sm:block" />
    //       <div className="md:hidden sm:flex sm:gap-[1.4rem] sm:items-center sm:justify-start w-full">
    //         <div className="flex lg:gap-[1.2rem] sm:gap-[0.8rem] items-center">
    //           <p className="rounded-[0.4rem] py-[0.4rem] px-[0.6rem] bg-background-400 w-fit h-fit font-normal lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-gray-500">
    //             출발
    //           </p>
    //           <p className="font-medium lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-black-300 dark:text-dark-t">
    //             {AddressFormat(data.fromAddress)}
    //           </p>
    //         </div>
    //         <div className="h-[1.6rem] border border-line-200" />
    //         <div className="flex lg:gap-[1.2rem] sm:gap-[0.8rem] items-center">
    //           <p className="rounded-[0.4rem] py-[0.4rem] px-[0.6rem] bg-background-400 w-fit h-fit font-normal lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-gray-500">
    //             도착
    //           </p>
    //           <p className="font-medium lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-black-300 dark:text-dark-t">
    //             {AddressFormat(data.toAddress)}
    //           </p>
    //         </div>
    //       </div>

    //       <div className="sm:hidden md:flex gap-[1.6rem] items-center">
    //         <div className="flex lg:gap-[1.2rem] md:gap-[0.8rem] items-center">
    //           <p className="rounded-[0.4rem] py-[0.4rem] px-[0.6rem] bg-background-400 w-fit h-fit font-normal lg:text-[1.8rem] md:text-[1.4rem] lg:leading-[2.6rem] md:leading-[2.4rem] text-gray-500">
    //             출발
    //           </p>
    //           <p className="font-medium lg:text-[1.8rem] md:text-[1.4rem] lg:leading-[2.6rem] md:leading-[2.4rem] text-black-300 dark:text-dark-t">
    //             {AddressFormat(data.fromAddress)}
    //           </p>
    //         </div>
    //         <div className="h-[1.6rem] border border-line-200" />
    //         <div className="flex lg:gap-[1.2rem] sm:gap-[0.8rem] items-center">
    //           <p className="rounded-[0.4rem] py-[0.4rem] px-[0.6rem] bg-background-400 w-fit h-fit font-normal lg:text-[1.8rem] md:text-[1.4rem] lg:leading-[2.6rem] md:leading-[2.4rem] text-gray-500">
    //             도착
    //           </p>
    //           <p className="font-medium lg:text-[1.8rem] md:text-[1.4rem] lg:leading-[2.6rem] md:leading-[2.4rem] text-black-300 dark:text-dark-t">
    //             {AddressFormat(data.toAddress)}
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="w-full flex md:flex-row sm:flex-col lg:gap-[1.1rem] sm:gap-[0.6rem]">
    //     <ButtonWrapper id="send-quote-button" onClick={() => setSendQuote(!sendQuote)}>
    //       <ButtonWrapper.Button className="w-full md:h-[6.4rem] sm:h-fit rounded-[1.6rem] p-[1.6rem] flex items-center justify-center gap-[1rem] font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] text-white">
    //         견적 보내기
    //         <Image src={writing} alt="writing" width={24} height={24} />
    //       </ButtonWrapper.Button>
    //     </ButtonWrapper>
    //     <ButtonWrapper id="return-button" onClick={() => setRejectQuote(!rejectQuote)}>
    //       <ButtonWrapper.Button
    //         disabled={!data.isSpecificRequest}
    //         className={`w-full md:h-[6.4rem] sm:h-fit rounded-[1.6rem] p-[1.6rem] flex items-center justify-center py-[1.6rem] px-[2.4rem]  ${data.isSpecificRequest ? 'bg-white border border-blue-300 text-blue-300' : 'bg-gray-100 text-white'}  font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem]`}
    //       >
    //         반려
    //       </ButtonWrapper.Button>
    //     </ButtonWrapper>
    //   </div>
    //   {sendQuote && <SendQuotationModal onClose={handleSendQuoteClose} data={data} />}
    //   {rejectQuote && <RejectQuotationModal onClose={handleRejectClose} data={data} />}
    // </div>
    <ReceiveQuoteCardSkeleton />
  );
}
