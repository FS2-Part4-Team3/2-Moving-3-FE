import type { DibsDriverCardProps } from "@/interfaces/Card/DibsDriverCardInterface";
import MovingTypeChips from "../chips/MovingTypeChips";
import Image from "next/image";
import like from "@/../public/assets/driver/ic_like.svg";
import star from "@/../public/assets/driver/ic_star_yellow.svg";

export default function DibsDriverCard({ data }: DibsDriverCardProps) {
  return (
    <div>
      <MovingTypeChips type={data.serviceType} />
      <p>{data.introduce}</p>
      <div>
        <Image src={data.image} alt="profile" width={46} height={46} />
        <div>
          <div>
            <p>{data.name}</p>
            <div>
              <Image src={like} alt="like" width={24} height={24} />
              <p>{data.favoriteCount}</p>
            </div>
          </div>
          <div>
            <div>
              <Image src={star} alt="star" width={20} height={20} />
              <p>{data.score}</p>
              <p>({data.reviewCount})</p>
            </div>
            <div />
            <div>
              <p>경력</p>
              <p>{data.career}년</p>
            </div>
            <div />
            <div>
              <p>{data.applyCount}건</p>
              <p>확정</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
