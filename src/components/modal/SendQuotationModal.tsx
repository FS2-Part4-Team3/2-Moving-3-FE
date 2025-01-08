"use server";

import { getUserData } from "@/api/DriverService";
import { ModalWrapper } from "../common/headless/Modal";
import MovingTypeChips from "../chips/MovingTypeChips";
import { useEffect, useState } from "react";
import type { SendQuotationModalData } from "@/interfaces/Modal/SendQuotationModalInterface";

export default function SendQuotationModal() {
  const handleCloseModal = () => {};

  return (
    <ModalWrapper onClose={handleCloseModal}>
      <ModalWrapper.Header>견적 보내기</ModalWrapper.Header>
      <ModalWrapper.Content>
        <div className="flex flex-col gap-[3.2rem]">
          <div>
            {/* <MovingTypeChips type={userData.type} /> */}
            <MovingTypeChips type="SMALL" />
            <div>
              {/* <p>{userData.owner}</p> */}
              <p>홍길동</p>
              <div>
                <div>
                  <p>이사일</p>
                  {/* <p>{userData.date}</p> */}
                  <p>2025-01-01T12:00:00Z</p>
                </div>
                <div>
                  <div>
                    <p>출발</p>
                    {/* <p>{userData.fromAddress}</p> */}
                    <p>서울 중구 삼일대로 343</p>
                  </div>
                  <div>
                    <p>도착</p>
                    {/* <p>{userData.toAddress}</p> */}
                    <p>서울 중구 청계천로 100</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
      </ModalWrapper.Content>
      <ModalWrapper.Footer isDisabled={false}>견적 보내기</ModalWrapper.Footer>
    </ModalWrapper>
  );
}
