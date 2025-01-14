import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import like from '@/../public/assets/driver/ic_like.svg';
import star from '@/../public/assets/driver/ic_star_yellow.svg';
import type { FindDriverCardProps } from '@/interfaces/Card/FindDriverCardInterface';
import MovingTypeChips from '../chips/MovingTypeChips';

export default function FindDriverCard({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: FindDriverCardProps & {
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  return (
    <div className="flex flex-col lg:gap-[4.8rem] md:gap-[3.2rem] sm:gap-[2.4rem]">
      {data.map((driver: any) => (
        <Link key={driver.id} href={`/match-driver/${driver.id}`}>
          <div
            className="w-full lg:h-fit rounded-[1.6rem] border-0.5 border-line-100 lg:py-[2rem] sm:py-[1.6rem] lg:px-[2.4rem] sm:px-[1.4rem] flex flex-col lg:gap-[1.6rem] sm:gap-[1.4rem] 
      shadow-[-0.2rem_-0.2rem_1rem_rgba(220,220,220,0.3)]"
          >
            <div className="flex lg:gap-[1.2rem] sm:gap-[0.8rem]">
              {driver.serviceTypes.map((item: string, index: number) => (
                <MovingTypeChips key={index} type={item as 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING'} />
              ))}
            </div>
            <p className="font-semibold lg:text-[2.4rem] sm:text-[1.4rem] lg:leading-[3.2rem] sm:leading-[2.4rem] text-black-300">
              {driver.introduce}
            </p>
            <div className="flex items-start w-full rounded-[0.6rem] border border-line-100 lg:py-[1.6rem] lg:px-[1.8rem] lg:gap-[2.4rem] sm:p-[1rem] sm:gap-[1.2rem]">
              <div className="relative w-[5.6rem] h-[5.6rem] lg:block sm:hidden">
                <Image
                  src={driver.image}
                  alt="driver"
                  width={56}
                  height={56}
                  objectFit="cover"
                  className="border-2 border-blue-400 rounded-full"
                />
              </div>
              <div className="relative w-[4.6rem] h-[4.6rem] lg:hidden sm:block">
                <Image
                  src={driver.image}
                  alt="driver"
                  width={46}
                  height={46}
                  objectFit="cover"
                  className="border-2 border-blue-400 rounded-full"
                />
              </div>
              <div className="flex flex-col w-full lg:gap-[0.8rem] sm:gap-[1rem]">
                <div className="flex w-full justify-between">
                  <p className="font-semibold lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-black-300">
                    {driver.name} 기사님
                  </p>
                  <div className="flex gap-[0.4rem] justify-center items-center">
                    <Image src={like} alt="like" width={24} height={24} />
                    <p className="font-medium  lg:text-[1.8rem] sm:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem] text-blue-400">
                      {driver.likeCount}
                    </p>
                  </div>
                </div>
                <div className="flex items-center w-full md:gap-[1.6rem] sm:justify-between md:justify-start">
                  <div className="flex items-center justify-center lg:gap-[0.6rem] sm:gap-[0.2rem]">
                    <Image src={star} alt="star" width={24} height={24} className="lg:block sm:hidden" />
                    <Image src={star} alt="start" width={20} height={20} className="lg:hidden sm:block" />
                    <p className="font-medium lg:text-[1.6rem] sm:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem] text-black-300">
                      {driver.score}
                    </p>
                    <p className="font-medium lg:text-[1.6rem] sm:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem] text-gray-300">
                      ({driver.reviewCount})
                    </p>
                  </div>
                  <div className="h-[1.4rem] border border-line-200" />
                  <div className="flex lg:gap-[0.6rem] sm:gap-[0.4rem]">
                    <p className="font-medium lg:text-[1.6rem] sm:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem] text-gray-300">
                      경력
                    </p>
                    <p className="font-medium lg:text-[1.6rem] sm:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem] text-black-300">
                      {driver.career}년
                    </p>
                  </div>
                  <div className="h-[1.4rem] border border-line-200" />
                  <div className="flex lg:gap-[0.6rem] sm:gap-[0.4rem]">
                    <p className="font-medium lg:text-[1.6rem] sm:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem] text-black-300">
                      {driver.applyCount}건
                    </p>
                    <p className="font-medium lg:text-[1.6rem] sm:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem] text-gray-300">
                      확정
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
      {hasNextPage && <div ref={ref}>Loading...</div>}
    </div>
  );
}
