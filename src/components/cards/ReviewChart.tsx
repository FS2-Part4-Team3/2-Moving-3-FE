import type { ReviewChartProps } from "@/interfaces/Card/ReviewChartInterface";
import Image from "next/image";
import star_yellow from "@/../public/assets/driver/ic_star_yellow.svg";
import star_gray from "@/../public/assets/driver/ic_star_gray.svg";

export default function ReviewChart({
  data,
  score,
  reviewCount,
}: ReviewChartProps) {
  const chartData = [
    { score: 5, count: data.filter((review) => review.score === 5).length },
    { score: 4, count: data.filter((review) => review.score === 4).length },
    { score: 3, count: data.filter((review) => review.score === 3).length },
    { score: 2, count: data.filter((review) => review.score === 2).length },
    { score: 1, count: data.filter((review) => review.score === 1).length },
  ];

  return (
    <div className="flex flex-row bg-background-200 rounded-[3.2rem] px-[5.9rem] py-[4rem] gap-[8.3rem] w-[95.5rem] h-[29.6rem] items-center">
      <div className="flex flex-col justify-center gap-[1.5rem]">
        <div className="flex flex-row gap-[0.8rem] justify-center items-center">
          <p className="text-black-400 text-[6.4rem] leading-[7.638rem] font-bold">
            {score.toFixed(1)}
          </p>
          <p className="text-gray-100 text-[3.8rem] leading-[4.535rem] font-bold pt-[1.1rem]">
            / 5
          </p>
        </div>
        <div className="flex justify-center items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Image
              key={i}
              src={i < Math.round(score) ? star_yellow : star_gray}
              alt={i < Math.round(score) ? "Yellow Star" : "Gray Star"}
              width={40}
              height={40}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-[1.4rem] flex-col justify-between">
        {chartData.map((item) => (
          <div
            key={item.score}
            className="flex flex-row gap-[3rem] items-center justify-start"
          >
            <p
              className={`text-black-300 text-[2rem] leading-[3.2rem] ${
                item.score === 5 ? "font-bold" : "font-medium"
              }`}
            >
              {item.score}점
            </p>
            <div className="h-[0.8rem] w-[37rem] rounded-[1.5rem] bg-background-300 flex-grow">
              <div
                className="bg-yellow-100 h-full rounded-[1.5rem]"
                style={{ width: `${(item.count / reviewCount) * 100}%` }}
              ></div>
            </div>
            <p
              className={`text-gray-300 text-[2rem] leading-[3.2rem] ${
                item.score === 5 ? "font-bold" : "font-medium"
              }`}
            >
              {item.count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
