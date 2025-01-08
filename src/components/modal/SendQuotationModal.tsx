"use client";

import { getUserData } from "@/api/DriverService";
import { ModalWrapper } from "../common/headless/Modal";
import MovingTypeChips from "../chips/MovingTypeChips";
import { useEffect, useState } from "react";
import type { SendQuotationModalData } from "@/interfaces/Modal/SendQuotationModalInterface";
import AddressFormat, { DateFormat } from "@/utils/Format";
import { InputWrapper } from "../common/headless/Input";

export default function SendQuotationModal() {
  const handleCloseModal = () => {};

  const [price, setPrice] = useState<number>();
  const [comment, setComment] = useState<string>("");

  return (
    <ModalWrapper onClose={handleCloseModal}>
      <ModalWrapper.Header>견적 보내기</ModalWrapper.Header>
      <ModalWrapper.Content>
        <div className="flex flex-col gap-[3.2rem]">
          <div className="flex flex-col gap-[2.4rem]">
            {/* <MovingTypeChips type={userData.type} /> */}
            <MovingTypeChips type="SMALL" />
            <div className="flex flex-col rounded-[0.8rem] border border-line-100 py-[2.4rem] px-[1.8rem] gap-[1.6rem]">
              {/* <p>{userData.owner}</p> */}
              <p className="font-semibold text-[2.4rem] leading-[3.2rem] text-black-300">
                홍길동 고객님
              </p>
              <div className="flex flex-col gap-[1.4rem]">
                <div className="flex gap-[1.2rem]">
                  <p className="rounded-[0.4rem] py-[0.4rem] px-[0.6rem] bg-background-400 font-normal text-[1.8rem] leading-[2.6rem] text-gray-500">
                    이사일
                  </p>
                  {/* <p>{userData.date}</p> */}
                  <p className="font-medium text-[1.8rem] leading-[2.6rem] text-black-300">
                    {DateFormat("2025-01-01T12:00:00Z")}
                  </p>
                </div>
                <div className="flex gap-[1.6rem]">
                  <div className="flex gap-[1.2rem] items-center justify-center">
                    <p className="rounded-[0.4rem] py-[0.4rem] px-[0.6rem] bg-background-400 font-normal text-[1.8rem] leading-[2.6rem] text-gray-500">
                      출발
                    </p>
                    {/* <p>{userData.fromAddress}</p> */}
                    <p className="font-medium text-[1.8rem] leading-[2.6rem] text-black-300">
                      {AddressFormat("서울 중구 삼일대로 343")}
                    </p>
                  </div>
                  <div className="h-[1.6rem] border border-line-200" />
                  <div className="flex gap-[1.2rem] items-center justify-center">
                    <p className="rounded-[0.4rem] py-[0.4rem] px-[0.6rem] bg-background-400 font-normal text-[1.8rem] leading-[2.6rem] text-gray-500">
                      도착
                    </p>
                    {/* <p>{userData.toAddress}</p> */}
                    <p className="font-medium text-[1.8rem] leading-[2.6rem] text-black-300">
                      {AddressFormat("서울 중구 청계천로 100")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <InputWrapper
              value={price || ""}
              onChange={(e) => setPrice(Number(e.target.value))}
            >
              <InputWrapper.Label>견적가를 입력해 주세요</InputWrapper.Label>
              <InputWrapper.Input placeholder="견적가 입력" />
            </InputWrapper>
          </div>
          <div />
          <div>
            <InputWrapper
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            >
              <InputWrapper.Label>코멘트를 입력해 주세요</InputWrapper.Label>
              <InputWrapper.Input placeholder="최소 10자 이상 입력해주세요" />
            </InputWrapper>
          </div>
        </div>
      </ModalWrapper.Content>
      <ModalWrapper.Footer isDisabled={false}>견적 보내기</ModalWrapper.Footer>
    </ModalWrapper>
  );
}
