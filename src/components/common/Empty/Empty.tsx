import type { EmptyProps } from "@/interfaces/CommonComp/EmptyInterface";
import profile from "@/../public/assets/common/empty/empty_profile_img.svg";
import folder from "@/../public/assets/common/empty/empty_folder_img.svg";
import Image from "next/image";
import { ButtonWrapper } from "../headless/Button";

export default function Empty({ type }: EmptyProps) {
  let image;
  let text;
  let text2;
  let buttonText;

  switch (type) {
    case "Profile":
      image = profile;
      text = "아직 등록된 프로필이 없어요!";
      text2 = "프로필을 등록하고 요청을 받아보세요";
      buttonText = "프로필 등록하기";
    case "Request":
      image = folder;
      text = "받은 요청이 없어요";
    case "Review":
      image = folder;
      text = "아직 등록된 리뷰가 없어요!";
      buttonText = "리뷰 작성하러 가기";
  }

  return (
    <div>
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
      <div>
        <p>{text}</p>
        {text2 && <p>{text2}</p>}
      </div>
      {buttonText && (
        <ButtonWrapper id="empty-button">
          <ButtonWrapper.Button>{buttonText}</ButtonWrapper.Button>
        </ButtonWrapper>
      )}
    </div>
  );
}
