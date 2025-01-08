"use client";

import DriverSortDropdown from "@/components/dropdown/DriverSortDropdown";
import MovingTypeFilterDropdown from "@/components/dropdown/MovingTypeFilterDropdown";
import { useState } from "react";

export default function ReceiveQuoteMovingTypeClient() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="flex lg:justify-start sm:justify-between lg:px-0 sm:px-[1rem]">
      <MovingTypeFilterDropdown onClick={() => setIsModalOpen(!isModalOpen)} />
      <div className="lg:hidden sm:block">
        <DriverSortDropdown />
      </div>
    </div>
  );
}
