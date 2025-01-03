import type { FindDriverCardProps } from "@/interfaces/Card/FindDriverCardInterface";
import MovingTypeChips from "../chips/MovingTypeChips";

export default function FindDriverCard({ data }: FindDriverCardProps) {
  return (
    <div className="w-[95.5rem] h-[23rem] rounded-[1.rem] border-0.5 border-line-100 py-[2rem] px-[2.4rem] shadow-lg">
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
    </div>
  );
}
