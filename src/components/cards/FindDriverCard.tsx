import type { FindDriverCardProps } from "@/interfaces/Card/FindDriverCardInterface";
import MovingTypeChips from "../chips/MovingTypeChips";
import Image from "next/image";
import star from "@/../public/assets/driver/ic_star.svg";
import like from "@/../public/assets/driver/ic_like.svg";

export default function FindDriverCard({ data }: FindDriverCardProps) {
  return (
    <div
      className="w-[95.5rem] h-[23rem] rounded-[1.6rem] border-0.5 border-line-100 py-[2rem] px-[2.4rem] flex flex-col gap-[1.6rem]"
      style={{ boxShadow: "-2px -2px 10px rgba(220, 220, 220, 0.3)" }}
    >
      <div className="flex gap-[1.2rem]">
        {data.serviceType.map((item: string, index) => (
          <MovingTypeChips
            key={index}
            type={
              item as "SMALL" | "HOME" | "OFFICE" | "APPOINTMENT" | "WAITING"
            }
          />
        ))}
      </div>
      <p className="font-semibold text-[2.4rem] leading-[3.2rem] text-black-300">
        {data.introduce}
      </p>
      <div className="flex items-start w-full rounded-[0.6rem] border border-line-100 py-[1.6rem] px-[1.8rem] gap-[2.4rem]">
        <Image
          src={data.image}
          alt="driver-profile"
          width={56}
          height={56}
          className="border-2 border-blue-400 rounded-full"
        />
        <div className="flex flex-col w-full gap-[0.8rem]">
          <p className="font-semibold text-[1.8rem] leading-[2.6rem] text-black-300">
            {data.name} 기사님
          </p>
          <div className="flex items-center w-full gap-[1.6rem]">
            <div className="flex items-center justify-center gap-[0.6rem]">
              <Image src={star} alt="start" width={24} height={24} />
              <p className="font-medium text-[1.6rem] leading-[2.6rem] text-black-300">
                {data.score}
              </p>
              <p className="font-medium text-[1.6rem] leading-[2.6rem] text-gray-300">
                ({data.reviewCount})
              </p>
            </div>
            <div className="h-[1.4rem] border border-line-200" />
            <div className="flex gap-[0.6rem]">
              <p className="font-medium text-[1.6rem] leading-[2.6rem] text-gray-300">
                경력
              </p>
              <p className="font-medium text-[1.6rem] leading-[2.6rem] text-black-300">
                {data.career}년
              </p>
            </div>
            <div className="h-[1.4rem] border border-line-200" />
            <div className="flex gap-[0.6rem]">
              <p className="font-medium text-[1.6rem] leading-[2.6rem] text-black-300">
                {data.applyCount}건
              </p>
              <p className="font-medium text-[1.6rem] leading-[2.6rem] text-gray-300">
                확정
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-[0.4rem] justify-center items-center">
          <Image src={like} alt="like" width={24} height={24} />
          <p className="font-medium text-[1.8rem] leading-[2.6rem] text-blue-400">
            {data.favoriteCount}
          </p>
        </div>
      </div>
    </div>
  );
}
