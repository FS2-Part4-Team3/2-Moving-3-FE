"use client";

import type { EmptyProps } from "@/interfaces/CommonComp/EmptyInterface";
import profile from "@/../public/assets/common/empty/empty_profile_img.svg";
import folder from "@/../public/assets/common/empty/empty_folder_img.svg";
import Image from "next/image";
import { ButtonWrapper } from "../headless/Button";
import truck from "@/../public/assets/common/empty/empty_truck_img.svg";

export default function Empty({ type }: EmptyProps) {
  let image;
  let text;
  let text2;
  let buttonText;
  let link; // TODO: 버튼이 있는 경우 라우팅 해야할 주소 입력 용도

  switch (type) {
    case "Profile":
      image = profile;
      text = "아직 등록된 프로필이 없어요!";
      text2 = "프로필을 등록하고 요청을 받아보세요";
      buttonText = "프로필 등록하기";
      break;
    case "ReceiveQuote":
      image = folder;
      text = "아직 받은 요청이 없어요!";
      text2 = "";
      buttonText = "";
      break;
    case "Review":
      image = folder;
      text = "아직 등록된 리뷰가 없어요!";
      text2 = "";
      buttonText = "리뷰 작성하러 가기";
      break;
    case "Driver":
      image = folder;
      text = "아직 등록된 리뷰가 없어요!";
      text2 = "";
      buttonText = "";
      break;
    case "RequestQuote":
      image = truck;
      text = "현재 진행 중인 이사 견적이 있어요!";
      text2 = "진행중인 이사 완료 후 새로운 견적을 받아보세요.";
      buttonText = "받은 견적 보러가기";
      break;
  }

  return (
    <div className="flex flex-col gap-[3.2rem] items-center">
      <Image
        src={image}
        alt="empty"
        width={184}
        height={136}
        className="lg:block sm:hidden"
      />
      <Image
        src={image}
        alt="empty"
        width={110}
        height={82}
        className="lg:hidden sm:block"
      />
      <div className="flex flex-col items-center font-normal lg:text-[2rem] sm:text-[1.4rem] lg:leading-[3.2rem] sm:leading-[2.4rem] text-gray-400">
        <p>{text}</p>
        {text2 && <p>{text2}</p>}
      </div>
      {buttonText && (
        <ButtonWrapper id="empty-button">
          <ButtonWrapper.Button className="lg:h-[6.5rem] sm:h-[5.4rem] lg:p-[1.6rem] sm:py-[1.6rem] sm:px-[2.4rem] rounded-[1.6rem] font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] text-white">
            {buttonText}
          </ButtonWrapper.Button>
        </ButtonWrapper>
      )}
    </div>
  );
}
