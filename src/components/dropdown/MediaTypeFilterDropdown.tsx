"use client";

import checkbox from "@/../public/assets/common/check-box/check-box.svg";
import checkbox_blue from "@/../public/assets/common/check-box/check-box_blue.svg";
import Image from "next/image";
import { useState } from "react";
import x from "@/../public/assets/common/icon_X.svg";
import { ButtonWrapper } from "../common/headless/Button";
import type { MediaTypeFilterDropdownProps } from "@/interfaces/Dropdown/MediaTypeFilterDropdownInterface";

export default function MediaTypeFilterDropdown({
  onClick,
}: MediaTypeFilterDropdownProps) {
  const [smallMov, setSmallMov] = useState<boolean>(false);
  const [homeMov, setHomeMov] = useState<boolean>(false);
  const [officeMov, setOfficeMov] = useState<boolean>(false);

  const [serviceable, setServiceable] = useState<boolean>(false);
  const [appointRequest, setAppointRequest] = useState<boolean>(false);

  const [isMenuClick, setIsMenuClick] = useState<"mov" | "filter">("mov");

  const handleInquiryClick = () => {
    console.log("눌렸습니다");
  };

  return (
    <>
      <div className="w-[32.8rem] flex flex-col gap-[5.2rem] lg:block sm:hidden">
        <div className="flex flex-col gap-[2.4rem]">
          <div className="border-b border-line-200 flex justify-between items-center py-[1.6rem] px-[1rem]">
            <p className="font-medium text-[2rem] leading-[3.2rem] text-black">
              이사 유형
            </p>
            <div className="flex gap-[0.4rem] items-center">
              <Image
                src={
                  smallMov && homeMov && officeMov ? checkbox_blue : checkbox
                }
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
      <div className="w-full min-h-screen flex items-center justify-center bg-black bg-opacity-50 lg:hidden">
        <div className="bg-white w-[37.5rem] rounded-[3.2rem] pt-[1.6rem] pb-[3.2rem] px-[2.4rem] flex flex-col gap-[2.4rem]">
          <div className="flex flex-col gap-[1.2rem]">
            <div className="flex w-full justify-between p-[0.8rem]">
              <div className="flex gap-[2.4rem]">
                <p
                  className={`font-bold text-[1.8rem] leading-[2.6rem] cursor-pointer ${
                    isMenuClick === "mov" ? "text-black-400" : "text-gray-300"
                  }`}
                  onClick={() => setIsMenuClick("mov")}
                >
                  이사 유형
                </p>
                <p
                  className={`font-bold text-[1.8rem] leading-[2.6rem] cursor-pointer ${
                    isMenuClick === "filter"
                      ? "text-black-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setIsMenuClick("filter")}
                >
                  필터
                </p>
              </div>
              <Image
                src={x}
                alt="x"
                width={24}
                height={24}
                onClick={onClick}
                className="cursor-pointer"
              />
            </div>
            {isMenuClick === "mov" && (
              <div className="flex flex-col gap-[0.8rem]">
                <div className="flex gap-[1rem] items-center py-[0.8rem] px-[1rem] border-b border-line-100 justify-between">
                  <div className="flex">
                    <p className="font-normal text-[1.6rem] leading-[2.6rem] text-gray-300">
                      전체선택 (199999)
                    </p>
                  </div>
                  <Image
                    src={
                      smallMov && homeMov && officeMov
                        ? checkbox_blue
                        : checkbox
                    }
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
                </div>
                <div>
                  <div className="flex justify-between border-b border-line-100 p-[1.6rem]">
                    <div className="flex gap-[0.4rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
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
                    <div className="flex gap-[0.4rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
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
                    <div className="flex gap-[0.4rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
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
            )}
            {isMenuClick === "filter" && (
              <div className="flex flex-col gap-[0.8rem]">
                <div className="flex gap-[1rem] items-center py-[0.8rem] px-[1rem] border-b border-line-100 justify-between">
                  <div className="flex">
                    <p className="font-normal text-[1.6rem] leading-[2.6rem] text-gray-300">
                      전체선택 (18888)
                    </p>
                  </div>
                  <Image
                    src={
                      serviceable && appointRequest ? checkbox_blue : checkbox
                    }
                    alt="checkbox"
                    width={36}
                    height={36}
                    onClick={() => {
                      setServiceable(!serviceable);
                      setAppointRequest(!appointRequest);
                    }}
                    className="cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between border-b border-line-100 p-[1.6rem]">
                    <div className="flex gap-[0.4rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
                      <p>서비스 가능 지역</p>
                      <p>(10)</p>
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
                    <div className="flex gap-[0.4rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
                      <p>지정 견적 요청</p>
                      <p>(50)</p>
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
            )}
          </div>
          <ButtonWrapper id="inquiry-driver" onClick={handleInquiryClick}>
            <ButtonWrapper.Button
              className="w-full h-[5.4rem] rounded-[1.6rem] p-[1.6rem] font-semibold text-[1.6rem] leading-[2.6rem] text-white"
              onClick={onClick}
            >
              조회하기
            </ButtonWrapper.Button>
          </ButtonWrapper>
        </div>
      </div>
    </>
  );
}
