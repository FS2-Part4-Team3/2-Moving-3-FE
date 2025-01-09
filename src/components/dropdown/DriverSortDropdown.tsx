"use client";

import arrow from "@/../public/assets/common/dropdown/chevron-down.svg";
import Image from "next/image";
import menu from "@/constants/driverSortMenu";
import { useState } from "react";

export default function DriverSortDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <div
        className="py-[0.8rem] px-[1rem] gap-[1rem] flex items-center cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <p className="font-medium text-[1.4rem] leading-[2.4rem] text-black-400">
          {selectedMenu || "이사 빠른 순"}
        </p>
        <Image src={arrow} alt="arrow" width={20} height={20} />
      </div>
      {isDropdownOpen && (
        <div className="absolute rounded-[0.8rem] border border-line-100 w-fit bg-white">
          {menu.map((item, index) => (
            <div
              key={index}
              className="py-[0.8rem] px-[1rem] gap-[1rem] cursor-pointer"
              onClick={() => handleMenuClick(item.name)}
            >
              <p className="font-medium text-[1.4rem] leading-[2.4rem] text-black-400">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
