import Image from "next/image";
import arrow from "@/../public/assets/common/dropdown/chevron-down.svg";

export default function SortDropdown() {
  return (
    <div>
      <div>
        <p>리뷰 많은순</p>
        <Image src={arrow} alt="arrow" width={20} height={20} />
      </div>
      <div>
        <p>리뷰 많은순</p>
        <p>평점 높은순</p>
        <p>경력 높은순</p>
        <p>확정 많은순</p>
      </div>
      <div>
        <p>드롭다운 오픈시 밑에 요소가 밀리는지 확인하는 용도</p>
      </div>
    </div>
  );
}
