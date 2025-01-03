import small_mov from "@/../public/assets/chips/ic_small_moving.svg";
import home_mov from "@/../public/assets/chips/ic_home_moving.svg";
import company_mov from "@/../public/assets/chips/ic_company_moving.svg";
import appointment from "@/../public/assets/chips/ic_appointment.svg";
import type { MovingTypeChipsProps } from "@/interfaces/chip/MovingTypeChipInterface";
import Image from "next/image";

export default function MovingTypeChips({ type }: MovingTypeChipsProps) {
  return (
    <div>
      {type === "small" && (
        <div className="lg:block sm:hidden">
          <Image src={small_mov} alt="logo" width={24} height={24} />
          <p>소형이사</p>
        </div>
      )}
      {type === "home" && (
        <div className="lg:block sm:hidden">
          <Image src={home_mov} alt="logo" width={24} height={24} />
          <p>가정이사</p>
        </div>
      )}
      {type === "company" && (
        <div className="lg:block sm:hidden">
          <Image src={company_mov} alt="logo" width={24} height={24} />
          <p>사무실이사</p>
        </div>
      )}
      {type === "appointment" && (
        <div className="lg:block sm:hidden">
          <Image src={appointment} alt="logo" width={24} height={24} />
          <p>지정 견적 요청</p>
        </div>
      )}
      {type === "waiting" && (
        <div className="lg:block sm:hidden">
          <p>견적 대기</p>
        </div>
      )}
    </div>
  );
}
