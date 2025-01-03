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
        <div className="w-fit">
          <div className="flex items-center rounded-[0.4rem] py-[0.4rem] px-[0.5rem] gap-[0.4rem] bg-blue-100">
            <Image
              src={small_mov}
              alt="logo"
              width={24}
              height={24}
              className="lg:block sm:hidden"
            />
            <Image
              src={small_mov}
              alt="logo"
              width={20}
              height={20}
              className="lg:hidden sm:block"
            />
            <p className="font-semibold lg:text-[1.6rem] md:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem] text-blue-300 md:block sm:hidden">
              소형이사
            </p>
          </div>
        </div>
      )}
      {type === "home" && (
        <div className="w-fit">
          <div className="flex items-center rounded-[0.4rem] py-[0.4rem] px-[0.5rem] gap-[0.4rem] bg-blue-100">
            <Image src={home_mov} alt="logo" width={24} height={24} />
            <p className="font-semibold lg:text-[1.6rem] md:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem] text-blue-300 md:block sm:hidden">
              가정이사
            </p>
          </div>
        </div>
      )}
      {type === "company" && (
        <div className="w-fit">
          <div className="flex items-center rounded-[0.4rem] py-[0.4rem] px-[0.5rem] gap-[0.4rem] bg-blue-100">
            <Image src={company_mov} alt="logo" width={24} height={24} />
            <p className="font-semibold lg:text-[1.6rem] md:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem] text-blue-300 md:block sm:hidden">
              사무실이사
            </p>
          </div>
        </div>
      )}
      {type === "appointment" && (
        <div className="w-fit">
          <div className="flex items-center rounded-[0.4rem] py-[0.4rem] px-[0.5rem] gap-[0.4rem] bg-red-100">
            <Image src={appointment} alt="logo" width={24} height={24} />
            <p className="font-semibold lg:text-[1.6rem] md:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem] text-red-200 md:block sm:hidden">
              지정 견적 요청
            </p>
          </div>
        </div>
      )}
      {type === "waiting" && (
        <div className="w-fit">
          <div className="flex items-center rounded-[0.4rem] py-[0.4rem] px-[0.5rem] gap-[0.4rem] bg-[#F2F3F8]">
            <p className="font-semibold lg:text-[1.6rem] md:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem] text-blue-400 md:block sm:hidden">
              견적 대기
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
