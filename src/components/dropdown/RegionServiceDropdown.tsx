"use client";

import arrow_down from "@/../public/assets/common/dropdown/chevron-down.svg";
import Image from "next/image";
import { useState } from "react";
import clicked_arrow from "@/../public/assets/common/dropdown/chevron-down-clicked.svg";
import regionsDropdown from "@/constants/regionsDropdown";

export default function RegionServiceDropdown() {
  const [regionDropdownOpen, setRegionDropdownOpen] = useState<boolean>(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] =
    useState<boolean>(false);

  return (
    <div className="w-[32.8rem] flex flex-col gap-[3.2rem]">
      <div className="border-b border-line-200 py-[1.6rem] px-[1rem] flex justify-between items-center">
        <p className="font-medium text-[2rem] leading-[3.2rem] text-black">
          필터
        </p>
        <p className="font-medium text-[1.6rem] leading-[2.6rem] text-gray-300 cursor-pointer">
          초기화
        </p>
      </div>
      <div className="flex flex-col gap-[1.6rem] relative">
        <p className="font-semibold text-[1.8rem] leading-[2.6rem] text-black-400">
          지역을 선택해주세요
        </p>
        <div
          className={`w-full h-[6.4rem] rounded-[1.6rem] border py-[1.6rem] px-[2.4rem] flex items-center justify-between cursor-pointer mb-[0.8rem] ${
            regionDropdownOpen
              ? "border-blue-300 bg-blue-50"
              : "border-gray-100"
          }`}
          onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}
        >
          <p
            className={`font-medium text-[1.8rem] leading-[2.6rem] ${
              regionDropdownOpen ? "text-blue-300" : "text-black-400"
            }`}
          >
            지역
          </p>
          <Image
            src={regionDropdownOpen ? clicked_arrow : arrow_down}
            alt="arrow"
            width={36}
            height={36}
          />
        </div>
        {regionDropdownOpen && (
          <div className="absolute w-full bg-white border border-line-200 top-full rounded-[1.6rem] pr-[0.5rem] py-[0.6rem]">
            <div className="flex h-[32rem] overflow-y-auto">
              <div className="flex flex-col w-[16.4rem]">
                {regionsDropdown
                  .slice(0, Math.ceil(regionsDropdown.length / 2))
                  .map((region, index) => (
                    <div
                      key={index}
                      className="py-[1.6rem] px-[2.4rem] font-medium text-[1.8rem] leading-[2.6rem] text-black-400 border-r border-line-200"
                    >
                      {region.name}
                    </div>
                  ))}
              </div>
              <div className="flex flex-col w-[16.4rem]">
                {regionsDropdown
                  .slice(
                    Math.ceil(regionsDropdown.length / 2),
                    regionsDropdown.length
                  )
                  .map((region, index) => (
                    <div
                      key={index}
                      className="py-[1.6rem] px-[2.4rem] font-medium text-[1.8rem] leading-[2.6rem] text-black-400"
                    >
                      {region.name}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-[1.6rem]">
        <p className="font-semibold text-[1.8rem] leading-[2.6rem] text-black-400">
          어떤 서비스가 필요하세요?
        </p>
        <div
          className="w-full h-[6.4rem] rounded-[1.6rem] border border-gray-100 py-[1.6rem] px-[2.4rem] flex items-center justify-between cursor-pointer"
          onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
        >
          <p className="font-medium text-[1.8rem] leading-[2.6rem] text-black-400">
            서비스
          </p>
          <Image src={arrow_down} alt="arrow" width={36} height={36} />
        </div>
      </div>
    </div>
  );
}
