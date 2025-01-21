'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postQuotation } from '@/api/QuotationService';
import AddressCard from '@/components/cards/AddressCard';
import CalendarCard from '@/components/cards/CalendarCard';
import MovingTypeCheckCard from '@/components/cards/MovingTypeCheckCard';
import { setId } from '@/store/slices/myQuotationSlice';
import { formatDate } from '@/utils/Format';

export default function RequestForQuotation() {
  const [movingType, setMovingType] = useState('');
  const [isMovingType, setIsMovingType] = useState(false);
  const [movingDate, setMovingDate] = useState<Date>(new Date());
  const [isMovingDate, setIsMovingDate] = useState(false);
  const [regions, setRegions] = useState<{
    start: string;
    arrival: string;
  }>({
    start: '',
    arrival: '',
  });
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const isMobileOrTablet = windowWidth < 1200;

  const formattedDate = movingDate ? formatDate(movingDate) : '';

  const quotationMutation = useMutation({
    mutationFn: async () => {
      const res = await postQuotation(movingType, movingDate.toISOString(), regions.start, regions.arrival);
      dispatch(setId(res.id));
    },
    onSuccess: () => {
      router.push('/normal/my-quote/waiting');
    },
    onError: () => {
      router.push('/not-found');
    },
  });

  const handleSubmit = () => {
    quotationMutation.mutate();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white lg:py-[3.2rem] md:py-[2.4rem] sm:py-[2.4rem] flex flex-col gap-[2.4rem] ">
        <h1 className="text-[2.4rem] font-semibold text-[#2B2B2B]">견적요청</h1>
        <div className="lg:w-[120rem] md:w-[32.7rem] sm:w-[31.2rem] lg:h-[0.8rem] md:h-[0.6rem] sm:h-[0.6rem] rounded-[3rem] bg-line-200">
          <div
            className="lg:w-[35rem] md:w-[8.2rem] sm:w-[8.2rem] lg:h-[0.8rem] md:h-[0.6rem] sm:h-[0.6rem] rounded-[3rem] bg-blue-300"
            style={{
              width: isMobileOrTablet
                ? isMovingType
                  ? isMovingDate
                    ? regions.start && regions.arrival
                      ? '32.7rem'
                      : 'calc(32.7rem * 3 / 4)'
                    : 'calc(32.7rem * 2 / 4)'
                  : '8.2rem'
                : isMovingType
                  ? isMovingDate
                    ? regions.start && regions.arrival
                      ? '120rem'
                      : 'calc(120rem * 3 / 4)'
                    : 'calc(120rem * 2 / 4)'
                  : '35rem',
            }}
          ></div>
        </div>
      </div>
      <div className="w-full h-full bg-background-200 px-[26rem] lg:pt-[4rem] md:pt-[0.8rem] sm:pt-[0.8rem] flex flex-col items-center lg:gap-[2.4rem] md:gap-[0.8rem] sm:gap-[0.8rem] lg:pb-[18.4rem]">
        <div className="lg:w-[120rem] md:w-[32.7rem] sm:w-[31.2rem] flex flex-col gap-[2.4rem]">
          <div className="lg:max-w-[52rem] md:max-w-[24.8rem] sm:max-w-[24.8rem] rounded-[3rem] rounded-tl-none lg:px-[4rem] lg:py-[2rem] md:px-[2rem] md:py-[1.2rem] sm:px-[2rem] sm:py-[1.2rem] bg-white border-none lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.4rem] font-medium text-black-400">
            몇 가지 정보만 알려주시면 최대 5개의 견적을 받을 수 있어요 :)
          </div>
          <div className="lg:max-w-[27rem] md:max-w-[19rem] sm:max-w-[19rem] rounded-[3rem] rounded-tl-none lg:px-[4rem] lg:py-[2rem] md:px-[2rem] md:py-[1.2rem] sm:px-[2rem] sm:py-[1.2rem] bg-white border-none lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.4rem] font-medium text-black-400">
            이사 종류를 선택해 주세요.
          </div>
        </div>
        <div className="lg:w-[120rem] md:w-[32.7rem] sm:w-[31.2rem] flex justify-end">
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
              <div className="lg:max-w-[32.9rem] md:max-w-[23.4rem] sm:max-w-[23.4rem] rounded-[3rem] rounded-tr-none lg:px-[4rem] lg:py-[2rem] md:px-[2rem] md:py-[1.2rem] sm:px-[2rem] sm:py-[1.2rem] bg-blue-300 border-none lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.4rem] font-medium text-white ">
                {movingType}
              </div>
              <div
                className="cursor-pointer lg:text-[1.6rem] md:text-[1.2rem] sm:text-[1.2rem] font-medium text-gray-500 self-end underline"
                onClick={() => setIsMovingType(false)}
              >
                수정하기
              </div>
            </div>
          )}
        </div>

        {isMovingType && (
          <div className="lg:w-[120rem] md:w-[32.7rem] sm:w-[31.2rem] ">
            <div className="lg:max-w-[29rem] md:max-w-[20rem] sm:max-w-[20rem] rounded-[3rem] rounded-tl-none lg:px-[4rem] lg:py-[2rem] md:px-[2rem] md:py-[1.2rem] sm:px-[2rem] sm:py-[1.2rem] bg-white border-none lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.4rem] font-medium text-black-400 ">
              이사 예정일을 선택해 주세요.
            </div>
          </div>
        )}

        <div className="lg:w-[120rem] md:w-[32.7rem] sm:w-[31.2rem] flex justify-end ">
          {!isMovingDate
            ? isMovingType && (
                <div className="mb-[10rem]">
                  <CalendarCard setMovingDate={setMovingDate} setIsMovingDate={setIsMovingDate} initialMovingDate={movingDate} />
                </div>
              )
            : isMovingType && (
                <div className="flex flex-col gap-[0.6rem]">
                  <div className="lg:max-w-[32.9rem] md:max-w-[14rem] sm:max-w-[14rem] rounded-[3rem] rounded-tr-none lg:px-[4rem] lg:py-[2rem] md:px-[2rem] md:py-[1.2rem] sm:px-[2rem] sm:py-[1.2rem] bg-blue-300 border-none lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.4rem] font-medium text-white ">
                    {formattedDate}
                  </div>
                  <div
                    className="cursor-pointer lg:text-[1.6rem] md:text-[1.2rem] sm:text-[1.2rem] font-medium text-gray-500 self-end underline"
                    onClick={() => setIsMovingDate(false)}
                  >
                    수정하기
                  </div>
                </div>
              )}
        </div>

        {isMovingType && isMovingDate && (
          <div className="lg:w-[120rem] md:w-[32.7rem] sm:w-[31.2rem]">
            <div className="lg:max-w-[29rem] md:max-w-[19rem] sm:max-w-[19rem] rounded-[3rem] rounded-tl-none lg:px-[4rem] lg:py-[2rem] md:px-[2rem] md:py-[1.2rem] sm:px-[2rem] sm:py-[1.2rem] bg-white border-none lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.4rem] font-medium text-black-400 self-start">
              이사 지역을 선택해 주세요.
            </div>
          </div>
        )}
        <div className="lg:w-[120rem] md:w-[32.7rem] sm:w-[31.2rem] flex justify-end">
          {isMovingType && isMovingDate && (
            <div className="self-end mb-[10rem]">
              <AddressCard regions={regions} setRegions={setRegions} handleSubmit={handleSubmit} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
