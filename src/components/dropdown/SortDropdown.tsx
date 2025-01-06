import Image from "next/image";
import arrow from "@/../public/assets/common/dropdown/chevron-down_gray.svg";
import { useState } from "react";
import sortMenu from "@/constants/sortMenu";

export default function SortDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  return (
    <div>
      <div
        className="flex items-center gap-[0.2rem] py-[0.6rem] pr-[0.6rem] pl-[0.8rem]"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <p className="font-semibold text-[1.2rem] leading-[2rem] text-center text-black-400">
          리뷰 많은 순
        </p>
        <Image src={arrow} alt="arrow" width={20} height={20} />
      </div>
      {isDropdownOpen && (
        <div className="absolute bg-white w-auto rounded-[0.8rem] border border-line-100 w-[9.1rem]">
          {sortMenu.map((item, index) => (
            <div
              key={index}
              className="w-[9.1rem] h-[3.2rem] py-[0.6rem] pr-[0.6rem] pl-[0.8rem] gap-[0.2rem]"
            >
              <p className="font-medium text-[1.2rem] leading-[1.8rem] text-black-400">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      )}
      <div>
        <p>드롭다운 오픈시 밑에 요소가 밀리는지 확인하는 용도</p>
      </div>
    </div>
  );
}
