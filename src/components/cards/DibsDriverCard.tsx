'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import like from '@/../public/assets/driver/ic_like.svg';
import star from '@/../public/assets/driver/ic_star_yellow.svg';
import { getDibsDriverListData } from '@/api/DriverService';
import SmallMovingTypeChips from '../chips/SmallMovingTypeChips';

export default function DibsDriverCard() {
  const [dibsDrivers, setDibsDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDibsDriverListData(1, 3);
        setDibsDrivers(data);
      } catch (error) {
        setError('데이터를 가져오는데에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>로딩중 ...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!dibsDrivers.length) {
    return (
      <div className="w-[32.7rem] flex items-center justify-center pt-[3rem] font-medium text-[1.8rem] leading-[2.6rem] text-black-400">
        찜한 기사님이 없습니다.
      </div>
    );
  }

  return (
    <>
      {dibsDrivers.map((driver: any) => (
        <div className="w-[32.7rem] flex flex-col rounded-[1.6rem] border border-line-100 py-[1.6rem] px-[1.4rem] gap-[1.4rem] shadow-[-0.2rem_-0.2rem_1rem_rgba(220,220,220,0.3)]">
          <div className="flex gap-[0.4rem]">
            {driver.serviceType.map((item: string, index: number) => (
              <SmallMovingTypeChips key={index} type={item as 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING'} />
            ))}
          </div>
          <p className="font-semibold text-[1.4rem] leading-[2.4rem] text-black-300">{driver.introduce}</p>
          <div className="w-full flex rounded-[0.6rem] border border-line-100 p-[1rem] gap-[1.2rem]">
            <div className="w-[4.6rem] h-[4.6rem]">
              <Image src={driver.image} alt="profile" width={46} height={46} className="border-2 border-blue-400 rounded-full" />
            </div>
            <div className="w-full flex flex-col gap-[1.2rem]">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-[1.4rem] leading-[2.4rem] text-black-300">{driver.name} 기사님</p>
                <div className="flex items-center gap-[0.2rem]">
                  <Image src={like} alt="like" width={24} height={24} />
                  <p className="font-medium text-[1.3rem] leading-[2.2rem] text-blue-400">{driver.favoriteCount}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-[0.2rem] items-center">
                  <Image src={star} alt="star" width={20} height={20} />
                  <p className="font-medium text-[1.3rem] leading-[2.2rem] text-black-300">{driver.score}</p>
                  <p className="font-medium text-[1.3rem] leading-[2.2rem] text-gray-300">({driver.reviewCount})</p>
                </div>
                <div className="h-[1.4rem] border border-line-200" />
                <div className="flex gap-[0.4rem]">
                  <p className="font-medium text-[1.3rem] leading-[2.2rem] text-gray-300">경력</p>
                  <p className="font-medium text-[1.3rem] leading-[2.2rem] text-black-300">{driver.career}년</p>
                </div>
                <div className="h-[1.4rem] border border-line-200" />
                <div className="flex gap-[0.4rem]">
                  <p className="font-medium text-[1.3rem] leading-[2.2rem] text-black-300">{driver.applyCount}건</p>
                  <p className="font-medium text-[1.3rem] leading-[2.2rem] text-gray-300">확정</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
