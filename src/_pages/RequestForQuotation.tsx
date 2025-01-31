'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMoveCheck, patchMove, postMove } from '@/api/MovesService';
import AddressCard from '@/components/cards/AddressCard';
import CalendarCard from '@/components/cards/CalendarCard';
import MovingTypeCheckCard from '@/components/cards/MovingTypeCheckCard';
import Empty from '@/components/common/Empty/Empty';
import { MoveData } from '@/interfaces/Page/RequestForQuotationInterface';
import { setId } from '@/store/slices/myQuotationSlice';
import { RootState } from '@/store/store';
import { formatDate } from '@/utils/Format';

export default function RequestForQuotation() {
  const [movingType, setMovingType] = useState('');
  const [viewMovingType, setViewMovingType] = useState('');
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
  const [moveData, setMoveData] = useState<MoveData>([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const edit = searchParams.get('edit') === 'true';

  useEffect(() => {
    const fetchCheckAPi = async () => {
      try {
        const res: MoveData = await getMoveCheck();
        setMoveData(res);
      } catch (err) {
        console.log('Get move check: ', err);
        router.push('/not-found');
      }
    };
    fetchCheckAPi();
  }, []);

  useEffect(() => {
    if (edit && moveData.length) {
      setMovingType(moveData[0].serviceType);
      setMovingDate(new Date(moveData[0].date));
      setIsMovingDate(!!movingDate);
      setIsMovingType(!!movingType);
      setRegions({
        start: moveData[0].fromAddress,
        arrival: moveData[0].toAddress,
      });
    }
    if (type) {
      setMovingType(type);
    }
  }, [edit, moveData]);

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
      const res = await postMove(movingType, movingDate.toISOString(), regions.start, regions.arrival);
      dispatch(setId(res.id));
    },
    onSuccess: () => {
      alert('견적 요청이 완료됐습니다!');
      router.push('/normal/my-quote/waiting');
    },
    onError: () => {
      router.push('/not-found');
    },
  });

  const editMutation = useMutation({
    mutationFn: async () => {
      const res = await patchMove(moveData[0].id, movingType, movingDate.toISOString(), regions.start, regions.arrival);
      dispatch(setId(res.id));
    },
    onSuccess: () => {
      alert('견적 수정이 완료됐습니다!');
      router.push('/normal/my-quote/edit');
    },
    onError: () => {
      router.push('/not-found');
    },
  });

  const handleSubmit = () => {
    quotationMutation.mutate();
  };

  const handleEditSubmit = () => {
    editMutation.mutate();
  };

  return (
    <>
      {moveData.length && !edit ? (
        <div className="w-full h-screen flex flex-col bg-background-200">
          <div className="bg-white lg:px-[26rem] lg:py-[3.2rem] md:px-[7.2rem] md:py-[2.4rem] sm:px-[2.4rem] sm:py-[2.4rem] flex flex-col gap-[2.4rem] ">
            <h1 className="text-[2.4rem] font-semibold text-[#2B2B2B]">견적요청</h1>
          </div>
          <div className="w-full h-full bg-background-200 lg:pt-[19.4rem] md:pt-[12.7rem] sm:pt-[12.7rem] flex justify-center">
            <Empty type="RequestQuote" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center ">
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
          <div className=" w-screen h-screen bg-background-200 lg:pt-[4rem] md:pt-[0.8rem] sm:pt-[0.8rem] flex justify-center">
            <div className="lg:overflow-y-auto md:overflow-y-auto sm:overflow-y-hidden overflow-x-hidden lg:h-[calc(100vh-5rem)] lg:pr-[2rem] md:pr-0 sm:pr-0 flex flex-col items-center lg:gap-y-[2.4rem] md:gap-y-[0.8rem] sm:gap-y-[0.8rem]">
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
                      setViewMovingType={setViewMovingType}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-[0.6rem]">
                    <div className="lg:max-w-[32.9rem] md:max-w-[23.4rem] sm:max-w-[23.4rem] rounded-[3rem] rounded-tr-none lg:px-[4rem] lg:py-[2rem] md:px-[2rem] md:py-[1.2rem] sm:px-[2rem] sm:py-[1.2rem] bg-blue-300 border-none lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.4rem] font-medium text-white ">
                      {viewMovingType}
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
                        <CalendarCard
                          setMovingDate={setMovingDate}
                          setIsMovingDate={setIsMovingDate}
                          initialMovingDate={movingDate}
                        />
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
                    <AddressCard
                      regions={regions}
                      setRegions={setRegions}
                      handleSubmit={edit ? handleEditSubmit : handleSubmit}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
