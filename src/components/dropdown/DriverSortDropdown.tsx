import arrow from "@/../public/assets/common/dropdown/chevron-down.svg";
import Image from "next/image";
import menu from "@/constants/driverSortMenu";

export default function DriverSortDropdown() {
  return (
    <div>
      <div>
        <p>이사 빠른 순</p>
        <Image src={arrow} alt="arrow" width={20} height={20} />
      </div>
      <div>
        {menu.map((item, index) => (
          <div key={index}>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <div>
        <h1>테스트중입니다</h1>
      </div>
    </div>
  );
}
