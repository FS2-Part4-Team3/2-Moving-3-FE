import type { FindDriverCardProps } from "@/interfaces/Card/FindDriverCardInterface";
import MovingTypeChips from "../chips/MovingTypeChips";
import Image from "next/image";

export default function FindDriverCard({ data }: FindDriverCardProps) {
  return (
    <div
      className="w-[95.5rem] h-[23rem] rounded-[1.6rem] border-0.5 border-line-100 py-[2rem] px-[2.4rem]"
      style={{ boxShadow: "-2px -2px 10px rgba(220, 220, 220, 0.3)" }}
    >
      <div className="flex gap-[1.2rem]">
        {data.serviceType.map((item: string, index) => (
          <MovingTypeChips
            key={index}
            type={
              item as "small" | "home" | "company" | "appointment" | "waiting"
            }
          />
        ))}
      </div>
      <p>{data.introduce}</p>
      <div>
        <Image src={data.image} alt="driver-profile" width={56} height={56} />
        <div>
          <div>
            <p>{data.name}</p>
            <p>{data.favoriteCount}</p>
          </div>
          <div>
            <p>{data.score}</p>
            <p>경력 {data.career}</p>
            <p>{data.applyCount}건 확정</p>
          </div>
        </div>
      </div>
    </div>
  );
}
