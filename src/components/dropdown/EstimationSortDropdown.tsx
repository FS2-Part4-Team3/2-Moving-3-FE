import Image from 'next/image';
import { useState } from 'react';
import arrow from '@/../public/assets/common/dropdown/chevron-down.svg';

export default function EstimationSortDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  return (
    <div>
      <div>
        <p>전체</p>
        <Image src={arrow} alt="arrow" width={36} height={36} />
      </div>
      <div>
        <p>전체</p>
        <p>확정한 견적서</p>
      </div>
    </div>
  );
}
