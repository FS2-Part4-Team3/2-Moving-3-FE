import type { ClientQuoteCardProps } from '@/interfaces/Card/ClientQuoteCardInterface';
import AddressFormat, { DateFormat, timeAgoFormat } from '@/utils/Format';
import MovingTypeChips from '../chips/MovingTypeChips';

export default function ClientQuoteCard({ data, owner, designatedRequest }: ClientQuoteCardProps) {
  return (
    <>
      <div className="relative w-full rounded-[1.6rem] border border-line-100 lg:pt-[2rem] lg:pb-[1.2rem] lg:px-[2.4rem] md:p-[1.6rem] sm:py-[1.6rem] sm:px-[1.4rem] shadow-custom9 dark:bg-dark-p">
        <div className="flex flex-col gap-[1.6rem]">
          <div className="flex justify-between items-center">
            <div className="flex lg:gap-[1.2rem] sm:gap-[0.8rem]">
              {data.progress === 'OPEN' && <MovingTypeChips type="WAITING" />}
              {(data.progress === 'CONFIRMED' || data.progress === 'COMPLETE') && <MovingTypeChips type="RECEIVED" />}
              <MovingTypeChips type={data.serviceType} />
              {designatedRequest === 'Active' && <MovingTypeChips type="APPOINTMENT" />}
            </div>
            <p className="font-normal text-[1.2rem] leading-[1.8rem] text-gray-500 dark:text-dark-t">
              {timeAgoFormat(data.createdAt)}
            </p>
          </div>
          <div className="md:py-[1.6rem] flex flex-col lg:gap-[1.8rem] md:gap-[1.6rem] sm:gap-[1.4rem]">
            <div className="sm:flex flex-col gap-[1.4rem]">
              <p className="font-semibold lg:text-[2rem] sm:text-[1.6rem] lg:leading-[3.2rem] sm:leading-[2.6rem] text-black-300 dark:text-dark-t">
                {owner} 고객님
              </p>
              <div className="md:hidden sm:block">
                <div className="flex items-center gap-[1.2rem]">
                  <p className="rounded-[0.4rem] lg:py-[0.4rem] sm:py-[0.2rem] px-[0.6rem] bg-background-400 font-normal lg:text-[1.6rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-gray-500">
                    이사일
                  </p>
                  <p className="font-medium lg:text-[1.6rem] lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-300 dark:text-dark-t">
                    {DateFormat(data.date)}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full border border-line-100" />
            <div className="flex lg:gap-[1.6rem] sm:gap-[1.4rem] items-center">
              <div className="md:block sm:hidden">
                <div className="flex items-center gap-[1.2rem]">
                  <p className="rounded-[0.4rem] lg:py-[0.4rem] sm:py-[0.2rem] px-[0.6rem] bg-background-400 font-normal text-[1.55rem] leading-[2.6rem] text-gray-500">
                    이사일
                  </p>
                  <p className="font-medium text-[1.55rem] leading-[2.6rem] text-black-300 dark:text-dark-t">
                    {DateFormat(data.date)}
                  </p>
                </div>
              </div>
              <div className="lg:h-[1.6rem] sm:h-[1.4rem] border border-line-200 md:block sm:hidden" />
              <div className="flex items-center gap-[1.2rem]">
                <p className="rounded-[0.4rem] lg:py-[0.4rem] sm:py-[0.2rem] px-[0.6rem] bg-background-400 font-normal lg:text-[1.55rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-gray-500">
                  출발
                </p>
                <p className="font-medium lg:text-[1.55rem] lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-300 dark:text-dark-t">
                  {AddressFormat(data.fromAddress)}
                </p>
              </div>
              <div className="lg:h-[1.6rem] sm:h-[1.4rem] border border-line-200" />
              <div className="flex items-center gap-[1.2rem]">
                <p className="rounded-[0.4rem] lg:py-[0.4rem] sm:py-[0.2rem] px-[0.6rem] bg-background-400 font-normal lg:text-[1.55rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-gray-500">
                  도착
                </p>
                <p className="font-medium lg:text-[1.55rem] lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-black-300 dark:text-dark-t">
                  {AddressFormat(data.toAddress)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
