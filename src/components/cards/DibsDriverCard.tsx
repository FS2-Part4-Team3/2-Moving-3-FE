"use client";

import type { DibsDriverCardProps } from "@/interfaces/Card/DibsDriverCardInterface";
import Image from "next/image";
import like from "@/../public/assets/driver/ic_like.svg";
import star from "@/../public/assets/driver/ic_star_yellow.svg";
import SmallMovingTypeChips from "../chips/SmallMovingTypeChips";

export default function DibsDriverCard({ data }: DibsDriverCardProps) {
  console.log(data);
  return (
    <div className="w-[32.7rem] flex flex-col rounded-[1.6rem] border border-line-100 py-[1.6rem] px-[1.4rem] gap-[1.4rem] shadow-[-0.2rem_-0.2rem_1rem_rgba(220,220,220,0.3)]">
      <div className="flex gap-[0.4rem]">
        {data.serviceType.map((item: string, index: number) => (
          <SmallMovingTypeChips
            key={index}
            type={
              item as "SMALL" | "HOME" | "OFFICE" | "APPOINTMENT" | "WAITING"
            }
          />
        ))}
      </div>
      <p className="font-semibold text-[1.4rem] leading-[2.4rem] text-black-300">
        {data.introduce}
      </p>
      <div className="w-full flex rounded-[0.6rem] border border-line-100 p-[1rem] gap-[1.2rem]">
        <div className="w-[4.6rem] h-[4.6rem]">
          <Image
            src={data.image}
            alt="profile"
            width={46}
            height={46}
            className="border-2 border-blue-400 rounded-full"
          />
        </div>
        <div className="w-full flex flex-col gap-[1.2rem]">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-[1.4rem] leading-[2.4rem] text-black-300">
              {data.name} 기사님
            </p>
            <div className="flex items-center gap-[0.2rem]">
              <Image src={like} alt="like" width={24} height={24} />
              <p className="font-medium text-[1.3rem] leading-[2.2rem] text-blue-400">
                {data.favoriteCount}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-[0.2rem] items-center">
              <Image src={star} alt="star" width={20} height={20} />
              <p className="font-medium text-[1.3rem] leading-[2.2rem] text-black-300">
                {data.score}
              </p>
              <p className="font-medium text-[1.3rem] leading-[2.2rem] text-gray-300">
                ({data.reviewCount})
              </p>
            </div>
            <div className="h-[1.4rem] border border-line-200" />
            <div className="flex gap-[0.4rem]">
              <p className="font-medium text-[1.3rem] leading-[2.2rem] text-gray-300">
                경력
              </p>
              <p className="font-medium text-[1.3rem] leading-[2.2rem] text-black-300">
                {data.career}년
              </p>
            </div>
            <div className="h-[1.4rem] border border-line-200" />
            <div className="flex gap-[0.4rem]">
              <p className="font-medium text-[1.3rem] leading-[2.2rem] text-black-300">
                {data.applyCount}건
              </p>
              <p className="font-medium text-[1.3rem] leading-[2.2rem] text-gray-300">
                확정
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
