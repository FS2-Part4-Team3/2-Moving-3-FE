"use client";

import checkbox from "@/../public/assets/common/check-box/check-box.svg";
import checkbox_blue from "@/../public/assets/common/check-box/check-box_blue.svg";
import Image from "next/image";
import { off } from "process";
import { useState } from "react";

export default function MediaTypeFilterDropdown() {
  const [smallMov, setSmallMov] = useState<boolean>(false);
  const [homeMov, setHomeMov] = useState<boolean>(false);
  const [officeMov, setOfficeMov] = useState<boolean>(false);

  const [serviceable, setServiceable] = useState<boolean>(false);
  const [appointRequest, setAppointRequest] = useState<boolean>(false);

  return (
    <div className="w-[32.8rem] flex flex-col gap-[5.2rem]">
      <div className="flex flex-col gap-[2.4rem]">
        <div className="border-b border-line-200 flex justify-between items-center py-[1.6rem] px-[1rem]">
          <p className="font-medium text-[2rem] leading-[3.2rem] text-black">
            이사 유형
          </p>
          <div className="flex gap-[0.4rem] items-center">
            <Image
              src={smallMov && homeMov && officeMov ? checkbox_blue : checkbox}
              alt="checkbox"
              width={36}
              height={36}
              onClick={() => {
                setSmallMov(!smallMov);
                setHomeMov(!homeMov);
                setOfficeMov(!officeMov);
              }}
              className="cursor-pointer"
            />
            <p className="font-normal text-[1.8rem] leading-[2.6rem] text-gray-300">
              전체선택
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[1.6rem]">
          <div className="flex justify-between border-b border-line-100 p-[1.6rem]">
            <div className="flex gap-[0.4rem] font-medium text-[1.8rem] leading-[2.6rem] text-black-400">
              <p>소형이사</p>
              <p>(10)</p>
            </div>
            <Image
              src={smallMov ? checkbox_blue : checkbox}
              alt="checkbox"
              width={36}
              height={36}
              onClick={() => setSmallMov(!smallMov)}
              className="cursor-pointer"
            />
          </div>
          <div className="flex justify-between border-b border-line-100 p-[1.6rem]">
            <div className="flex gap-[0.4rem] font-medium text-[1.8rem] leading-[2.6rem] text-black-400">
              <p>가정이사</p>
              <p>(50)</p>
            </div>
            <Image
              src={homeMov ? checkbox_blue : checkbox}
              alt="checkbox"
              width={36}
              height={36}
              onClick={() => setHomeMov(!homeMov)}
              className="cursor-pointer"
            />
          </div>
          <div className="flex justify-between border-b border-line-100 p-[1.6rem]">
            <div className="flex gap-[0.4rem] font-medium text-[1.8rem] leading-[2.6rem] text-black-400">
              <p>사무실이사</p>
              <p>(1999)</p>
            </div>
            <Image
              src={officeMov ? checkbox_blue : checkbox}
              alt="checkbox"
              width={36}
              height={36}
              onClick={() => setOfficeMov(!officeMov)}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[2.4rem]">
        <div className="border-b border-line-200 flex justify-between items-center py-[1.6rem] px-[1rem]">
          <p className="font-medium text-[2rem] leading-[3.2rem] text-black">
            필터
          </p>
          <div className="flex gap-[0.4rem] items-center">
            <Image
              src={serviceable && appointRequest ? checkbox_blue : checkbox}
              alt="checkbox"
              width={36}
              height={36}
              onClick={() => {
                setServiceable(!serviceable);
                setAppointRequest(!appointRequest);
              }}
              className="cursor-pointer"
            />
            <p className="font-normal text-[1.8rem] leading-[2.6rem] text-gray-300">
              전체선택
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[1.6rem]">
          <div className="flex justify-between border-b border-line-100 p-[1.6rem]">
            <div className="flex gap-[0.4rem] font-medium text-[1.8rem] leading-[2.6rem] text-black-400">
              <p>서비스 가능 지역</p>
              <p>(990)</p>
            </div>
            <Image
              src={serviceable ? checkbox_blue : checkbox}
              alt="checkbox"
              width={36}
              height={36}
              onClick={() => setServiceable(!serviceable)}
              className="cursor-pointer"
            />
          </div>
          <div className="flex justify-between border-b border-line-100 p-[1.6rem]">
            <div className="flex gap-[0.4rem] font-medium text-[1.8rem] leading-[2.6rem] text-black-400">
              <p>지정 견적 요청</p>
              <p>(50090)</p>
            </div>
            <Image
              src={appointRequest ? checkbox_blue : checkbox}
              alt="checkbox"
              width={36}
              height={36}
              onClick={() => setAppointRequest(!appointRequest)}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
