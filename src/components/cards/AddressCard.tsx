"use client";

import { useState } from "react";
import AddressModal from "../modal/AddressModal";
import type { AddressCardProps } from "@/interfaces/Card/AddressCardInterface";

export default function AddressCard({ regions, setRegions }: AddressCardProps) {
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isArrivalModalOpen, setIsArrivalModalOpen] = useState(false);

  return (
    <>
      <div className="lg:w-[62.4rem] h-[29.7rem] p-[3.2rem] flex flex-col gap-[2.1rem] rounded-[3.2rem] rounded-tr-none border-none bg-white">
        <div className="flex flex-col gap-[1.6rem]">
          <span className="lg:text-[1.8rem] font-medium text-black-400">
            출발지
          </span>
          <div
            onClick={() => setIsStartModalOpen(true)}
            className="lg:w-[56rem] lg:h-[6.4rem] rounded-[1.6rem] border border-blue-300 px-[2.4rem] py-[1.6rem] text-[2rem] font-semibold text-blue-300 cursor-pointer"
          >
            {regions.start ? regions.start : "출발지 선택하기"}
          </div>
        </div>
        <div className="flex flex-col gap-[1.6rem]">
          <span className="lg:text-[1.8rem] font-medium text-black-400">
            도착지
          </span>
          <div
            onClick={() => setIsArrivalModalOpen(true)}
            className="lg:w-[56rem] lg:h-[6.4rem] rounded-[1.6rem] border border-blue-300 px-[2.4rem] py-[1.6rem] text-[2rem] font-semibold text-blue-300 cursor-pointer"
          >
            {regions.arrival ? regions.arrival : "도착지 선택하기"}
          </div>
        </div>
      </div>
      {isStartModalOpen && (
        <AddressModal
          handleModalClose={() => setIsStartModalOpen(false)}
          isStartModalOpen={isStartModalOpen}
          setRegions={setRegions}
        />
      )}
      {isArrivalModalOpen && (
        <AddressModal
          handleModalClose={() => setIsArrivalModalOpen(false)}
          isArrivalModalOpen={isArrivalModalOpen}
          setRegions={setRegions}
        />
      )}
    </>
  );
}
