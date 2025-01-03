"use client";

import arrow_down from "@/../public/assets/common/dropdown/chevron-down.svg";
import Image from "next/image";
import { useState } from "react";
import clicked_arrow from "@/../public/assets/common/dropdown/chevron-down-clicked.svg";
import regionsDropdown from "@/constants/regionsDropdown";
import movingTypeDropdown from "@/constants/movingTypeDropdown";

export default function RegionServiceDropdown() {
  const [regionDropdownOpen, setRegionDropdownOpen] = useState<boolean>(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] =
    useState<boolean>(false);

  return (
    <div className="w-[32.8rem] flex lg:flex-col lg:gap-[3.2rem] sm:gap-[1.2rem]">
      <div className="lg:block sm:hidden">
        <div className="border-b border-line-200 py-[1.6rem] px-[1rem] flex justify-between items-center">
          <p className="font-medium text-[2rem] leading-[3.2rem] text-black">
            필터
          </p>
          <p className="font-medium text-[1.6rem] leading-[2.6rem] text-gray-300 cursor-pointer">
            초기화
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-[1.6rem] relative">
        <p className="font-semibold text-[1.8rem] leading-[2.6rem] text-black-400 lg:block sm:hidden">
          지역을 선택해주세요
        </p>
        <div
          className={`lg:w-full lg:h-[6.4rem] sm:w-[8rem] sm:h-[3.6rem] lg:rounded-[1.6rem] sm:rounded-[0.8rem] border lg:py-[1.6rem] lg:px-[2.4rem] sm:py-[0.6rem] sm:pr-[1rem] sm:pl-[1.4rem] flex items-center justify-between cursor-pointer mb-[0.8rem] ${
            regionDropdownOpen
              ? "border-blue-300 bg-blue-50"
              : "border-gray-100"
          }`}
          onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}
        >
          <p
            className={`font-medium lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] ${
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
            className="lg:block sm:hidden"
          />
          <Image
            src={regionDropdownOpen ? clicked_arrow : arrow_down}
            alt="arrow"
            width={20}
            height={20}
            className="lg:hidden sm:block"
          />
        </div>
        {regionDropdownOpen && (
          <div className="absolute w-auto border border-line-200 top-full lg:rounded-[1.6rem] sm:rounded-[0.8rem] pr-[0.5rem] py-[0.6rem] z-[2]">
            <div className="flex bg-white lg:h-[32rem] sm:h-[18rem] overflow-y-auto">
              <div className="flex flex-col lg:w-[16.4rem] sm:w-[7.5rem]">
                {regionsDropdown
                  .slice(0, Math.ceil(regionsDropdown.length / 2))
                  .map((region, index) => (
                    <div
                      key={index}
                      className="lg:py-[1.6rem] lg:px-[2.4rem] sm:py-[0.6rem] sm:px-[1.4rem] font-medium lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-black-400 border-r border-line-200"
                    >
                      {region.name}
                    </div>
                  ))}
              </div>
              <div className="flex flex-col lg:w-[16.4rem] sm:w-[7.5rem]">
                {regionsDropdown
                  .slice(
                    Math.ceil(regionsDropdown.length / 2),
                    regionsDropdown.length
                  )
                  .map((region, index) => (
                    <div
                      key={index}
                      className="lg:py-[1.6rem] lg:px-[2.4rem] sm:py-[0.6rem] sm:px-[1.4rem] font-medium lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-black-400"
                    >
                      {region.name}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-[1.6rem] relative">
        <p className="font-semibold text-[1.8rem] leading-[2.6rem] text-black-400 lg:block sm:hidden">
          어떤 서비스가 필요하세요?
        </p>
        <div
          className={`lg:w-full lg:h-[6.4rem] sm:w-[9rem] sm:h-[3.6rem] lg:rounded-[1.6rem] sm:rounded-[0.8rem] border lg:py-[1.6rem] lg:px-[2.4rem] sm:py-[0.6rem] sm:pr-[1rem] sm:pl-[1.4rem] flex items-center justify-between cursor-pointer mb-[0.8rem] ${
            serviceDropdownOpen
              ? "border-blue-300 bg-blue-50"
              : "border-gray-100"
          }`}
          onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
        >
          <p
            className={`font-medium lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] ${
              serviceDropdownOpen ? "text-blue-300" : "text-black-400"
            }`}
          >
            서비스
          </p>
          <Image
            src={serviceDropdownOpen ? clicked_arrow : arrow_down}
            alt="arrow"
            width={36}
            height={36}
            className="lg:block sm:hidden"
          />
          <Image
            src={serviceDropdownOpen ? clicked_arrow : arrow_down}
            alt="arrow"
            width={20}
            height={20}
            className="lg:hidden sm:block"
          />
        </div>
        {serviceDropdownOpen && (
          <div className="absolute lg:w-full sm:w-auto bg-white border border-line-200 top-full lg:rounded-[1.6rem] sm:rounded-[0.8rem] pr-[0.5rem] py-[0.6rem] flex z-[1]">
            <div className="flex flex-col lg:w-[16.4rem] sm:w-auto">
              {movingTypeDropdown.map((movingType, index) => (
                <div
                  key={index}
                  className="lg:py-[1.6rem] lg:px-[2.4rem] sm:py-[0.6rem] sm:px-[1.4rem] font-medium lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-black-400"
                >
                  {movingType.type}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
