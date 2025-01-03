"use client";

import type { ProfileChipProps } from "@/interface/chip/ProfileChipInterface";
import { useState } from "react";

export function ProfileChips({ regions, movingTypes }: ProfileChipProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedMovingType, setSelectedMovingType] = useState<string | null>(
    null
  );
  // const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const handleRegionSelect = (regionName: string) => {
    //toDo: user 정보 넣기
    // if(user.role === driver) {
    //    if(selectedRegions.includes(regionName)){
    //     setSelectedRegions(selectedRegions.filter((r) => r != regionName));
    //    } else {
    //     setSelectedRegions([...selectedRegions, regionName])
    //    }
    //   }
    setSelectedRegion(regionName);
  };

  const handleMovingTypeSelect = (movingType: string) => {
    setSelectedMovingType(movingType);
  };

  return (
    <>
      <div className="w-[41.6rem] grid grid-cols-5 gap-6">
        {regions &&
          regions.map((region) => (
            <div
              onClick={() => handleRegionSelect(region.name)}
              key={region.name}
              className={`flex justify-center items-center w-[7.2rem] h-[4.6rem] text-[1.8rem] font-normal border rounded-[10rem] cursor-pointer ${
                selectedRegion === region.name
                  ? "bg-blue-50 text-blue-300 border-blue-300"
                  : "bg-background-100 text-blue-400 border-gray-100" //toDo: 유저 정보 입력 후 다수의 지역 선택 시 css 반영
              }`}
            >
              {region.name}
            </div>
          ))}
      </div>
      <div className="w-[34.8rem] flex justify-between">
        {movingTypes &&
          movingTypes.map((movingType) => (
            <div
              onClick={() => handleMovingTypeSelect(movingType.type)}
              key={movingType.type}
              className={`flex justify-center items-center w-[10.3rem] h-[4.6rem] text-[1.8rem] font-normal border rounded-[10rem] cursor-pointer ${
                selectedMovingType === movingType.type
                  ? "bg-blue-50 text-blue-300 border-blue-300"
                  : "bg-background-100 text-blue-400 border-gray-100"
              }`}
            >
              {movingType.type}
            </div>
          ))}
      </div>
    </>
  );
}
