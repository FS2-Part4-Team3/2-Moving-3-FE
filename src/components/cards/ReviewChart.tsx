import Image from 'next/image';
import star_gray from '@/../public/assets/driver/ic_star_gray.svg';
import star_yellow from '@/../public/assets/driver/ic_star_yellow.svg';
import type { ReviewChartProps } from '@/interfaces/Card/ReviewChartInterface';

export default function ReviewChart({ data, score, reviewCount }: ReviewChartProps) {
  const chartData = [
    { score: 5, count: data.filter(review => review.score === 5).length },
    { score: 4, count: data.filter(review => review.score === 4).length },
    { score: 3, count: data.filter(review => review.score === 3).length },
    { score: 2, count: data.filter(review => review.score === 2).length },
    { score: 1, count: data.filter(review => review.score === 1).length },
  ];

  return (
    <div className="flex lg:gap-0 md:gap-[5.6rem] md:flex-row justify-center items-center sm:flex-col sm:gap-[4rem]">
      <div className="flex flex-col justify-center gap-[1.5rem] lg:hidden sm:block">
        <div className="flex flex-row gap-[0.8rem] justify-center items-center">
          <p className="text-black-400 text-[4rem] leading-[4.773rem] font-bold">{score.toFixed(1)}</p>
          <p className="text-gray-100 text-[2.4rem] leading-[2.864rem] font-bold pt-[0.3rem]">/ 5</p>
        </div>
        <div className="flex justify-center items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Image
              key={i}
              src={i < Math.round(score) ? star_yellow : star_gray}
              alt={i < Math.round(score) ? 'Yellow Star' : 'Gray Star'}
              width={24}
              height={24}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-row bg-background-200 lg:rounded-[3.2rem] sm:rounded-[2.4rem] lg:px-[5.9rem] lg:py-[4rem] lg:gap-[8.3rem] sm:px-[1.8rem] sm:py-[1.6rem] sm:gap-[0.6rem] lg:w-full lg:h-[29.6rem] sm:w-[32.7rem] sm:h-[17.6rem] items-center justify-center">
        <div className="flex flex-col justify-center gap-[1.5rem] lg:block sm:hidden">
          <div className="flex flex-row gap-[0.8rem] justify-center items-center">
            <p className="text-black-400 text-[6.4rem] leading-[7.638rem] font-bold">{score.toFixed(1)}</p>
            <p className="text-gray-100 text-[3.8rem] leading-[4.535rem] font-bold pt-[1.1rem]">/ 5</p>
          </div>
          <div className="flex justify-center items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Image
                key={i}
                src={i < Math.round(score) ? star_yellow : star_gray}
                alt={i < Math.round(score) ? 'Yellow Star' : 'Gray Star'}
                width={40}
                height={40}
              />
            ))}
          </div>
        </div>
        <div className="flex lg:gap-[1.4rem] sm:gap-[0.6rem] flex-col justify-between">
          {chartData.map(item => (
            <div key={item.score} className="flex flex-row lg:gap-[3rem] sm:gap-[1.6rem] items-center justify-start">
              <p
                className={`text-black-300 lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.4rem] leading-[2.4rem] w-[3.6rem] ${
                  item.score === 5 ? 'font-bold' : 'font-medium'
                }`}
              >
                {item.score}점
              </p>
              <div className="h-[0.8rem] lg:w-[37rem] sm:w-[18rem] rounded-[1.5rem] bg-background-300">
                <div
                  className="bg-yellow-100 h-full rounded-[1.5rem]"
                  style={{
                    width: `${reviewCount ? (item.count / reviewCount) * 100 : 0}%`,
                  }}
                ></div>
              </div>
              <p
                className={`text-gray-300 lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.4rem] sm:leading-[2.4rem] lg:w-[4.2rem] sm:w-[3.6rem] ${
                  item.score === 5 ? 'font-bold' : 'font-medium'
                }`}
              >
                {item.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
