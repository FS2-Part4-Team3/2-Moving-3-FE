'use client';

import type { ManageQuotationCardProps } from '@/interfaces/Card/ManageQuotationCardInterface';
import AddressFormat, { DateFormat, priceFormat, timeAgoFormat } from '@/utils/Format';
import MovingTypeChips from '../chips/MovingTypeChips';
import { ButtonWrapper } from '../common/headless/Button';

export default function ManageQuotationCard({ data }: ManageQuotationCardProps) {
  // TODO: 백엔드측에서 updatedAt, createdAt 추가시 확인 필요
  // TODO: 기사가 반려한 경우 상태값 확인 필요 (36번 째 줄, 53번 째 줄)

  return (
    <>
      <div className="relative w-full rounded-[1.6rem] bg-white border border-line-100 lg:pt-[2rem] lg:pb-[1.2rem] lg:px-[2.4rem] sm:py-[1.6rem] sm:px-[1.4rem] flex flex-col lg:gap-[1.6rem] sm:gap-[2.6rem] shadow-[0.2rem_-0.2rem_1rem_rgba(220,220,220,0.14)]">
        {data.progress !== 'OPEN' ? (
          <div className="absolute inset-0 bg-black bg-opacity-60 rounded-[1.6rem]">
            <div className="flex items-center justify-center flex-col w-full h-full bg-opacity-100 gap-[1.6rem]">
              {data.progress === 'COMPLETE' && (
                <>
                  <p className="font-semibold lg:text-[1.8rem] sm:text-[1.4rem] leading-[2.6rem] text-white">
                    이사 완료된 견적이에요
                  </p>
                  <ButtonWrapper id="quote-detail">
                    <ButtonWrapper.Button className="rounded-[1.6rem] border lg:py-[1rem] lg:px-[1.8rem] sm:py-[0.8rem] sm:px-[1.6rem] border-blue-200 !bg-blue-100 font-semibold lg:text-[1.6rem] lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-blue-300">
                      견적 상세보기
                    </ButtonWrapper.Button>
                  </ButtonWrapper>
                </>
              )}
              {data.progress === 'CANCELED' && (
                <p className="font-semibold lg:text-[1.8rem] sm:text-[1.4rem] leading-[2.6rem] text-white">삭제된 요청이에요</p>
              )}
              {data.progress === 'EXPIRED' && (
                <p className="font-semibold lg:text-[1.8rem] sm:text-[1.4rem] leading-[2.6rem] text-white">만료된 요청이에요</p>
              )}
              {/* {data.progress === '반려' && (
                <p className="font-semibold lg:text-[1.8rem] sm:text-[1.4rem] leading-[2.6rem] text-white">반려된 요청이에요</p>
              )} */}
            </div>
          </div>
        ) : null}
        <div className="flex flex-col gap-[1.6rem]">
          <div className="flex justify-between">
            <div className="flex gap-[1.2rem] items-center">
              {(data.progress === 'COMPLETE' || data.progress === 'CONFIRMED') && (
                <p className="rounded-[0.8rem] lg:py-[0.4rem] sm:py-[0.2rem] px-[0.6rem] gap-[0.4rem] bg-[#F2F3F8] font-semibold lg:text-[1.6rem] sm:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem] text-blue-400">
                  견적 확정
                </p>
              )}
              <MovingTypeChips type={data.moveInfo.serviceType} />
              {data.designatedRequest === 'Active' && <MovingTypeChips type="APPOINTMENT" />}
            </div>
            {/* <p className="font-normal text-[1.2rem] leading-[1.8rem] text-gray-500">{timeAgoFormat(data.updatedAt)}</p> */}
          </div>
          <div className="lg:py-[1.6rem] flex flex-col lg:gap-[1.8rem] sm:gap-[1rem]">
            <div className="md:block sm:flex flex-col gap-[1.4rem]">
              <p className="font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] text-black-300">
                {data.user.name} 고객님
              </p>
              <div className="md:hidden sm:block">
                <div className="flex items-center gap-[1.2rem]">
                  <p className="rounded-[0.4rem] lg:py-[0.4rem] sm:py-[0.2rem] px-[0.6rem] bg-background-400 font-normal lg:text-[1.6rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-gray-500">
                    이사일
                  </p>
                  <p className="font-medium lg:text-[1.6rem] lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-300">
                    {DateFormat(data.moveInfo.date)}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full border border-line-100" />
            <div className="flex lg:gap-[1.6rem] sm:gap-[1.4rem] items-center">
              <div className="md:block sm:hidden">
                <div className="flex items-center gap-[1.2rem]">
                  <p className="rounded-[0.4rem] py-[0.4rem] px-[0.6rem] bg-background-400 font-normal text-[1.55rem] leading-[2.6rem] text-gray-500">
                    이사일
                  </p>
                  <p className="font-medium text-[1.55rem] leading-[2.6rem] text-black-300">{DateFormat(data.moveInfo.date)}</p>
                </div>
              </div>
              <div className="h-[1.4rem] border border-line-200 md:block sm:hidden" />
              <div className="flex items-center gap-[1.2rem]">
                <p className="rounded-[0.4rem] lg:py-[0.4rem] sm:py-[0.2rem] px-[0.6rem] bg-background-400 font-normal lg:text-[1.55rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-gray-500">
                  출발
                </p>
                <p className="font-medium lg:text-[1.55rem] lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-300">
                  {AddressFormat(data.moveInfo.fromAddress)}
                </p>
              </div>
              <div className="h-[1.4rem] border border-line-200" />
              <div className="flex items-center gap-[1.2rem]">
                <p className="rounded-[0.4rem] lg:py-[0.4rem] sm:py-[0.2rem] px-[0.6rem] bg-background-400 font-normal lg:text-[1.55rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-gray-500">
                  도착
                </p>
                <p className="font-medium lg:text-[1.55rem] lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-300">
                  {AddressFormat(data.moveInfo.toAddress)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex lg:gap-[1.6rem] sm:gap-[0.8rem] items-center justify-end">
          <p className="font-medium lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-black-400">
            견적 금액
          </p>
          <p className="font-bold lg:text-[2.4rem] sm:text-[1.8rem] lg:leading-[3.2rem] sm:leading-[2.6rem] text-black-400">
            {priceFormat(data.estimationInfo.price)}원
          </p>
        </div>
      </div>
    </>
  );
}
