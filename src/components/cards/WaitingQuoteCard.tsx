import Image from 'next/image';
import like from '@/../public/assets/driver/ic_like.svg';
import star from '@/../public/assets/driver/ic_star_yellow.svg';
import type { WaitingQuoteCardProps } from '@/interfaces/Card/WaitingQuoteCardInterface';
import AddressFormat, { DateFormat } from '@/utils/Format';
import MovingTypeChips from '../chips/MovingTypeChips';

export default function WaitingQuoteCard({ data }: WaitingQuoteCardProps) {
  return (
    <div className="max-w-[64rem] rounded-[1.6rem] border border-line-100 pt-[2.8rem] pb-[2.2rem] px-[2.4rem] gap-[2.4rem] shadow-[-0.2rem_-0.2rem_1rem_rgba(220,220,220,0.14)] shadow-[0.2rem_0.2rem_1rem_rgba(220,220,220,0.14)]">
      <div className="flex flex-col gap-[2.4rem]">
        <div className="flex gap-[1.2rem]">
          <MovingTypeChips type="WAITING" />
          <MovingTypeChips type={data.moveInfo.type} />
        </div>
        <div className="flex gap-[2.4rem]">
          <div className="flex w-full gap-[2.4rem] py-[1.6rem] px-[1.8rem] border border-line-100 rounded-[0.6rem] shadow-[-0.2rem_-0.2rem_1rem_rgba(220,220,220,0.14)]">
            <Image src={data.driver.image} alt="profile" width={56} height={56} />
            <div className="w-full flex flex-col items-center">
              <div className="w-full flex justify-between items-center">
                <p className="font-semibold text-[1.8rem] leading-[2.6rem] text-black-300">{data.driver.name}</p>
                <div className="flex gap-[0.4rem] items-center">
                  <Image src={like} alt="like" width={24} height={24} />
                  <p className="font-medium text-[1.8rem] leading-[2.6rem] text-blue-400">{data.driver.favoriteCount}</p>
                </div>
              </div>
              <div>
                <div>
                  <Image src={star} alt="star" width={24} height={24} />
                  <p>{data.driver.score}</p>
                  <p>({data.driver.reviewCount})</p>
                </div>
                <div />
                <div>
                  <p>경력</p>
                  <p>{data.driver.career}</p>
                </div>
                <div />
                <div>
                  <p>{data.driver.applyCount}건</p>
                  <p>확정</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <p>이사일</p>
              <p>{DateFormat(data.moveInfo.date)}</p>
            </div>
            <div>
              <p>출발</p>
              <p>{AddressFormat(data.moveInfo.fromAddress)}</p>
            </div>
            <div>
              <p>도착</p>
              <p>{AddressFormat(data.moveInfo.toAddress)}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p>견적 금액</p>
        <p>{data.price}</p>
      </div>
      <div>
        <p>button</p>
      </div>
    </div>
  );
}
