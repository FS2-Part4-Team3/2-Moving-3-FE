'use client';

import { ModalWrapper } from "../common/headless/Modal";
import MovingTypeChips from "../chips/MovingTypeChips";
import { useEffect, useState } from "react";
import AddressFormat, { DateFormat } from "@utils/Format";
import { InputWrapper } from "../common/headless/Input";
import { ModalSmallWrapper } from "../common/headless/ModalSmall";
import type { RejectQuotationModalProps } from "@/interfaces/Modal/RejectQuotationModalInterface";

export default function RejectQuotationModal({
  onClose,
}: RejectQuotationModalProps) {
  const [reason, setReason] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    setIsDisabled(!(reason.length >= 10));
  }, [reason]);

  return (
    <>
      <div className="sm:hidden md:block">
        <ModalWrapper onClose={onClose}>
          <ModalWrapper.Header>요청 반려</ModalWrapper.Header>
          <ModalWrapper.Content>
            <div className="flex flex-col gap-[3.2rem]">
              <div className="flex flex-col lg:gap-[2.4rem] sm:gap-[2rem]">
                {/* <MovingTypeChips type={userData.type} /> */}
                <MovingTypeChips type="SMALL" />
                <div className="flex flex-col rounded-[0.8rem] lg:border border-line-100 lg:py-[2.4rem] lg:px-[1.8rem] sm:py-[1rem] lg:gap-[1.6rem] sm:gap-[1.2rem]">
                  {/* <p>{userData.owner}</p> */}
                  <p className="font-semibold lg:text-[2.4rem] sm:text-[1.4rem] lg:leading-[3.2rem] sm:leading-[2.4rem] text-black-300">
                    홍길동 고객님
                  </p>
                  <div className="flex flex-col lg:gap-[1.4rem] sm:gap-[0.8rem]">
                    <div className="flex lg:gap-[1.2rem] sm:gap-[0.8rem] items-center">
                      <p className="rounded-[0.4rem] lg:py-[0.4rem] sm:py-[0.2rem] px-[0.6rem] bg-background-400 lg:font-normal sm:font-medium lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-gray-500">
                        이사일
                      </p>
                      {/* <p>{userData.date}</p> */}
                      <p className="font-medium lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-black-300">
                        {DateFormat('2025-01-01T12:00:00Z')}
                      </p>
                    </div>
                    <div className="flex lg:gap-[1.6rem] sm:gap-[1.4rem] items-center">
                      <div className="flex lg:gap-[1.2rem] sm:gap-[0.8rem] items-center">
                        <p className="rounded-[0.4rem] lg:py-[0.4rem] sm:py-[0.2rem] px-[0.6rem] bg-background-400 font-normal lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-gray-500">
                          출발
                        </p>
                        {/* <p>{userData.fromAddress}</p> */}
                        <p className="font-medium lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-black-300">
                          {AddressFormat('서울 중구 삼일대로 343')}
                        </p>
                      </div>
                      <div className="h-[1.6rem] border border-line-200" />
                      <div className="flex lg:gap-[1.2rem] sm:gap-[0.8rem] items-center">
                        <p className="rounded-[0.4rem] lg:py-[0.4rem] sm:py-[0.2rem] px-[0.6rem] bg-background-400 font-normal lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-gray-500">
                          도착
                        </p>
                        {/* <p>{userData.toAddress}</p> */}
                        <p className="font-medium lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-black-300">
                          {AddressFormat('서울 중구 청계천로 100')}
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
          <ModalWrapper.Footer isDisabled={isDisabled}>반려하기</ModalWrapper.Footer>
        </ModalWrapper>
      </div>
      <div className="sm:block md:hidden">
        <ModalSmallWrapper onClose={onClose}>
          <ModalSmallWrapper.Header>요청 반려</ModalSmallWrapper.Header>
          <ModalSmallWrapper.Content>
            <div className="flex flex-col gap-[3.2rem]">
              <div className="flex flex-col gap-[2rem]">
                {/* <MovingTypeChips type={userData.type} /> */}
                <MovingTypeChips type="SMALL" />
                <div className="flex flex-col rounded-[0.8rem] py-[1rem] gap-[1.2rem]">
                  {/* <p>{userData.owner}</p> */}
                  <p className="font-semibold text-[1.4rem] leading-[2.4rem] text-black-300">홍길동 고객님</p>
                  <div className="flex flex-col gap-[0.8rem]">
                    <div className="flex gap-[0.8rem] items-center">
                      <p className="rounded-[0.4rem] py-[0.2rem] px-[0.6rem] bg-background-400 font-medium text-[1.4rem] leading-[2.4rem] text-gray-500">
                        이사일
                      </p>
                      {/* <p>{userData.date}</p> */}
                      <p className="font-medium text-[1.4rem] leading-[2.4rem] text-black-300">
                        {DateFormat('2025-01-01T12:00:00Z')}
                      </p>
                    </div>
                    <div className="flex gap-[1.4rem] items-center">
                      <div className="flex gap-[0.8rem] items-center">
                        <p className="rounded-[0.4rem] py-[0.2rem] px-[0.6rem] bg-background-400 font-normal text-[1.4rem] leading-[2.4rem] text-gray-500">
                          출발
                        </p>
                        {/* <p>{userData.fromAddress}</p> */}
                        <p className="font-medium text-[1.4rem] leading-[2.4rem] text-black-300">
                          {AddressFormat('서울 중구 삼일대로 343')}
                        </p>
                      </div>
                      <div className="h-[1.6rem] border border-line-200" />
                      <div className="flex gap-[0.8rem] items-center">
                        <p className="rounded-[0.4rem] py-[0.2rem] px-[0.6rem] bg-background-400 font-normal text-[1.4rem] leading-[2.4rem] text-gray-500">
                          도착
                        </p>
                        {/* <p>{userData.toAddress}</p> */}
                        <p className="font-medium text-[1.4rem] leading-[2.4rem] text-black-300">
                          {AddressFormat('서울 중구 청계천로 100')}
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
          <ModalSmallWrapper.Footer isDisabled={isDisabled}>반려하기</ModalSmallWrapper.Footer>
        </ModalSmallWrapper>
      </div>
    </>
  );
}
