'use client';

import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import AddressFormat, { DateFormat } from '@utils/Format';
import { postDetailEstimationData } from '@/api/EstimationService';
import type { RejectQuotationModalProps } from '@/interfaces/Modal/RejectQuotationModalInterface';
import MovingTypeChips from '../chips/MovingTypeChips';
import { InputWrapper } from '../common/headless/Input';
import { ModalWrapper } from '../common/headless/Modal';
import { ModalSmallWrapper } from '../common/headless/ModalSmall';

export default function RejectQuotationModal({ onClose, data }: RejectQuotationModalProps) {
  const [reason, setReason] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    setIsDisabled(!(reason.length >= 10));
  }, [reason]);

  const rejectQuoteMutation = useMutation({
    mutationFn: async () => {
      try {
        const res = await postDetailEstimationData(data.id, true, reason, '0');
        alert('반려 되었습니다.');
      } catch (error: any) {
        alert(error.data.message || '반려에 실패했습니다. 다시 시도해주세요.');
      }
    },
  });

  const handleSubmit = () => {
    rejectQuoteMutation.mutate();
    onClose();
  };

  return (
    <>
      <div className="sm:hidden md:block">
        <ModalWrapper onClose={onClose}>
          <ModalWrapper.Header>요청 반려</ModalWrapper.Header>
          <ModalWrapper.Content>
            <div className="flex flex-col gap-[3.2rem]">
              <div className="flex flex-col lg:gap-[2.4rem] sm:gap-[2rem]">
                <MovingTypeChips type={data.serviceType} />
                {data.isSpecificRequest && <MovingTypeChips type="APPOINTMENT" />}
                <div className="flex flex-col rounded-[0.8rem] lg:border border-line-100 lg:py-[2.4rem] lg:px-[1.8rem] sm:py-[1rem] lg:gap-[1.6rem] sm:gap-[1.2rem]">
                  <p className="font-semibold lg:text-[2.4rem] sm:text-[1.4rem] lg:leading-[3.2rem] sm:leading-[2.4rem] text-black-300">
                    {data.owner.name} 고객님
                  </p>
                  <div className="flex flex-col lg:gap-[1.4rem] sm:gap-[0.8rem]">
                    <div className="flex lg:gap-[1.2rem] sm:gap-[0.8rem] items-center">
                      <p className="rounded-[0.4rem] lg:py-[0.4rem] sm:py-[0.2rem] px-[0.6rem] bg-background-400 lg:font-normal sm:font-medium lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-gray-500">
                        이사일
                      </p>
                      <p className="font-medium lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-black-300">
                        {DateFormat(data.date)}
                      </p>
                    </div>
                    <div className="flex lg:gap-[1.6rem] sm:gap-[1.4rem] items-center">
                      <div className="flex lg:gap-[1.2rem] sm:gap-[0.8rem] items-center">
                        <p className="rounded-[0.4rem] lg:py-[0.4rem] sm:py-[0.2rem] px-[0.6rem] bg-background-400 font-normal lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-gray-500">
                          출발
                        </p>
                        <p className="font-medium lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-black-300">
                          {AddressFormat(data.fromAddress)}
                        </p>
                      </div>
                      <div className="h-[1.6rem] border border-line-200" />
                      <div className="flex lg:gap-[1.2rem] sm:gap-[0.8rem] items-center">
                        <p className="rounded-[0.4rem] lg:py-[0.4rem] sm:py-[0.2rem] px-[0.6rem] bg-background-400 font-normal lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-gray-500">
                          도착
                        </p>
                        <p className="font-medium lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-black-300">
                          {AddressFormat(data.toAddress)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <InputWrapper value={reason}>
                  <div className="flex flex-col gap-[1.6rem] w-full">
                    <InputWrapper.Label className="font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] text-black-300">
                      반려 사유를 입력해 주세요
                    </InputWrapper.Label>
                    <div className="py-[1.4rem] lg:px-[2.4rem] sm:px-[1.4rem] bg-background-200 rounded-[1.6rem]">
                      <textarea
                        onChange={e => setReason(e.target.value)}
                        className="resize-none w-full h-[16rem] overflow-x-auto bg-background-200 font-normal lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] placeholder-gray-300 focus:outline-none"
                        placeholder="최소 10자 이상 입력해주세요"
                      />
                    </div>
                  </div>
                </InputWrapper>
              </div>
            </div>
          </ModalWrapper.Content>
          <ModalWrapper.Footer isDisabled={isDisabled} onClick={handleSubmit}>
            반려하기
          </ModalWrapper.Footer>
        </ModalWrapper>
      </div>
      <div className="sm:block md:hidden">
        <ModalSmallWrapper onClose={onClose}>
          <ModalSmallWrapper.Header>요청 반려</ModalSmallWrapper.Header>
          <ModalSmallWrapper.Content>
            <div className="flex flex-col gap-[3.2rem]">
              <div className="flex flex-col gap-[2rem]">
                <MovingTypeChips type={data.serviceType} />
                {data.isSpecificRequest && <MovingTypeChips type="APPOINTMENT" />}
                <div className="flex flex-col rounded-[0.8rem] py-[1rem] gap-[1.2rem]">
                  <p className="font-semibold text-[1.4rem] leading-[2.4rem] text-black-300">{data.owner.name} 고객님</p>
                  <div className="flex flex-col gap-[0.8rem]">
                    <div className="flex gap-[0.8rem] items-center">
                      <p className="rounded-[0.4rem] py-[0.2rem] px-[0.6rem] bg-background-400 font-medium text-[1.4rem] leading-[2.4rem] text-gray-500">
                        이사일
                      </p>
                      <p className="font-medium text-[1.4rem] leading-[2.4rem] text-black-300">{DateFormat(data.date)}</p>
                    </div>
                    <div className="flex gap-[1.4rem] items-center">
                      <div className="flex gap-[0.8rem] items-center">
                        <p className="rounded-[0.4rem] py-[0.2rem] px-[0.6rem] bg-background-400 font-normal text-[1.4rem] leading-[2.4rem] text-gray-500">
                          출발
                        </p>
                        <p className="font-medium text-[1.4rem] leading-[2.4rem] text-black-300">
                          {AddressFormat(data.fromAddress)}
                        </p>
                      </div>
                      <div className="h-[1.6rem] border border-line-200" />
                      <div className="flex gap-[0.8rem] items-center">
                        <p className="rounded-[0.4rem] py-[0.2rem] px-[0.6rem] bg-background-400 font-normal text-[1.4rem] leading-[2.4rem] text-gray-500">
                          도착
                        </p>
                        <p className="font-medium text-[1.4rem] leading-[2.4rem] text-black-300">
                          {AddressFormat(data.toAddress)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <InputWrapper value={reason}>
                  <div className="flex flex-col gap-[1.6rem] w-full">
                    <InputWrapper.Label className="font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] text-black-300">
                      반려 사유를 입력해 주세요
                    </InputWrapper.Label>
                    <div className="py-[1.4rem] lg:px-[2.4rem] sm:px-[1.4rem] bg-background-200 rounded-[1.6rem]">
                      <textarea
                        onChange={e => setReason(e.target.value)}
                        className="resize-none w-full h-[16rem] overflow-x-auto bg-background-200 font-normal lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] placeholder-gray-300 focus:outline-none"
                        placeholder="최소 10자 이상 입력해주세요"
                      />
                    </div>
                  </div>
                </InputWrapper>
              </div>
            </div>
          </ModalSmallWrapper.Content>
          <ModalSmallWrapper.Footer isDisabled={isDisabled} onClick={handleSubmit}>
            반려하기
          </ModalSmallWrapper.Footer>
        </ModalSmallWrapper>
      </div>
    </>
  );
}
