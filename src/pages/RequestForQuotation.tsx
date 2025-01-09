'use client';

import { useState } from 'react';
import AddressCard from '@/components/cards/AddressCard';
import CalendarCard from '@/components/cards/CalendarCard';
import MovingTypeCheckCard from '@/components/cards/MovingTypeCheckCard';

export default function RequestForQuotation() {
  const [movingType, setMovingType] = useState('');
  const [isMovingType, setIsMovingType] = useState(false);
  const [movingDate, setMovingDate] = useState<Date | null>(null);
  const [isMovingDate, setIsMovingDate] = useState(false);
  const [regions, setRegions] = useState<{
    start: string;
    arrival: string;
  }>({
    start: '',
    arrival: '',
  });

  const formattedDate = movingDate
    ? `${movingDate.getFullYear()}년 ${movingDate.getMonth() + 1}월 ${movingDate.getDate()}일`
    : '';

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white py-[3.2rem] flex flex-col gap-[2.4rem] ">
        <h1 className="text-[2.4rem] font-semibold text-black-600">견적요청</h1>
        <div className="w-[140rem] h-[0.8rem] rounded-[3rem] bg-line-200">
          <div
            className="w-[35rem] h-[0.8rem] rounded-[3rem] bg-blue-300"
            style={{
              ...(isMovingType && { width: 'calc(140rem * 2 / 4)' }),
              ...(isMovingType && isMovingDate && { width: 'calc(140rem * 3 / 4)' }),
              ...(isMovingType && isMovingDate && regions.start && regions.arrival && { width: '140rem' }),
            }}
          ></div>
        </div>
      </div>
      <div className="w-full h-full bg-background-200 px-[26rem] pt-[4rem] flex flex-col items-center gap-[2.4rem]">
        <div className="w-[140rem] flex flex-col gap-[2.4rem]">
          <div className="max-w-[52rem] rounded-[3rem] rounded-tl-none px-[4rem] py-[2rem] bg-white border-none text-[1.8rem] font-medium text-black-400">
            몇 가지 정보만 알려주시면 최대 5개의 견적을 받을 수 있어요 :)
          </div>
          <div className="max-w-[27rem] rounded-[3rem] rounded-tl-none px-[4rem] py-[2rem] bg-white border-none text-[1.8rem] font-medium text-black-400">
            이사 종류를 선택해 주세요.
          </div>
        </div>
        <div className="w-[140rem] flex justify-end">
          {!isMovingType ? (
            <div>
              <MovingTypeCheckCard
                setMovingType={setMovingType}
                setIsMovingType={setIsMovingType}
                initialMovingType={movingType}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-[0.6rem]">
              <div className="max-w-[32.9rem] rounded-[3rem] rounded-tr-none px-[4rem] py-[2rem] bg-blue-300 border-none text-[1.8rem] font-medium text-white ">
                {movingType}
              </div>
              <div
                className="cursor-pointer text-[1.6rem] font-medium text-gray-500 self-end underline"
                onClick={() => setIsMovingType(false)}
              >
                수정하기
              </div>
            </div>
          )}
        </div>

        {isMovingType && (
          <div className="w-[140rem] ">
            <div className="max-w-[29rem] rounded-[3rem] rounded-tl-none px-[4rem] py-[2rem] bg-white border-none text-[1.8rem] font-medium text-black-400 ">
              이사 예정일을 선택해 주세요.
            </div>
          </div>
        )}

        <div className="w-[140rem] flex justify-end">
          {!isMovingDate
            ? isMovingType && (
                <div className="self-end mb-[10rem]">
                  <CalendarCard setMovingDate={setMovingDate} setIsMovingDate={setIsMovingDate} initialMovingDate={movingDate} />
                </div>
              )
            : isMovingType && (
                <div className="flex flex-col gap-[0.6rem] self-end">
                  <div className="max-w-[32.9rem] rounded-[3rem] rounded-tr-none px-[4rem] py-[2rem] bg-blue-300 border-none text-[1.8rem] font-medium text-white ">
                    {formattedDate}
                  </div>
                  <div
                    className="cursor-pointer text-[1.6rem] font-medium text-gray-500 self-end underline"
                    onClick={() => setIsMovingDate(false)}
                  >
                    수정하기
                  </div>
                </div>
              )}
        </div>

        {isMovingType && isMovingDate && (
          <div className="w-[140rem]">
            <div className="max-w-[29rem] rounded-[3rem] rounded-tl-none px-[4rem] py-[2rem] bg-white border-none text-[1.8rem] font-medium text-black-400 self-start">
              이사 지역을 선택해 주세요.
            </div>
          </div>
        )}
        <div className="w-[140rem] flex justify-end">
          {isMovingType && isMovingDate && (
            <div className="self-end mb-[10rem]">
              <AddressCard regions={regions} setRegions={setRegions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
