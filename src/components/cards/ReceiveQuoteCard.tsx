import type { ReceiveQuoteCardProps } from "@/interfaces/Card/ReceiveQuoteCardInterface";
import MovingTypeChips from "../chips/MovingTypeChips";
import { ButtonWrapper } from "../common/headless/Button";
import writing from "@/../public/assets/common/ic_writing.svg";
import Image from "next/image";

export default function ReceiveQuoteCard({ data }: ReceiveQuoteCardProps) {
  return (
    <div>
      <div>
        <MovingTypeChips type={data.type} />
        <p>{data.updatedAt}</p>
      </div>
      <div>
        <p>{data.owner} 고객님</p>
        <div />
        <div>
          <div>
            <p>이사일</p>
            <p>{data.date}</p>
          </div>
          <div />
          <div>
            <p>출발</p>
            <p>{data.fromAddress}</p>
          </div>
          <div />
          <div>
            <p>도착</p>
            <p>{data.toAddress}</p>
          </div>
        </div>
      </div>
      <div>
        <ButtonWrapper id="send-quote-button">
          <ButtonWrapper.Button>
            견적 보내기
            <Image src={writing} alt="writing" width={24} height={24} />
          </ButtonWrapper.Button>
        </ButtonWrapper>
        <ButtonWrapper id="return-button">
          <ButtonWrapper.Button>반려</ButtonWrapper.Button>
        </ButtonWrapper>
      </div>
    </div>
  );
}
