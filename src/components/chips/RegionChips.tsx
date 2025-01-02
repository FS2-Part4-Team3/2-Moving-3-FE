"use client";

import { useState } from "react";
import regions from "../../../constants/regions";

export function RegionChips() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleSelect = (regionName: string) => {
    setSelectedRegion(regionName);
  };

  return (
    <div className="w-[41.6rem] grid grid-cols-5 gap-6">
      {regions.map((region) => (
        <div
          onClick={() => handleSelect(region.name)}
          key={region.name}
          className={`flex justify-center items-center w-[7.2rem] h-[4.6rem] text-[1.8rem] font-normal border rounded-[10rem] cursor-pointer ${
            selectedRegion === region.name
              ? "bg-blue-50 text-blue-300 border-blue-300"
              : "bg-background-100 text-blue-400 border-gray-100"
          }`}
        >
          {region.name}
        </div>
      ))}
    </div>
  );
}
