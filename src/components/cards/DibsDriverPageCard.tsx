import Image from 'next/image';
import emptyHeart from '@/../public/assets/driver/ic_empty_like.svg';
import redHeart from '@/../public/assets/driver/ic_like_on.svg';
import star from '@/../public/assets/driver/ic_star_yellow.svg';
import { DibsDriverPageCardProps } from '@/interfaces/Card/DibsDriverPageCardInterface';
import MovingTypeChips from '../chips/MovingTypeChips';

export default function DibsDriverPageCard({ data }: DibsDriverPageCardProps) {
  return (
    <div className="w-full rounded-[1.6rem] border py-[2rem] px-[2.4rem] border-line-100 shadow-custom3 flex flex-col gap-[1.6rem]">
      <div className="w-full flex gap-[1.2rem]">
        {data.serviceType.map((item: string) => (
          <MovingTypeChips type={item as 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING' | 'RECEIVED'} />
        ))}
      </div>
      <div className="w-full rounded-[0.6rem] border border-line-100 py-[1.6rem] px-[1.8rem] flex gap-[2.4rem] shadow-custom5">
        <div>
          {data.image && (
            <Image src={data.image} alt="profile" width={80} height={80} className="border-2 border-blue-400 rounded-full" />
          )}
        </div>
        <div className="w-full flex flex-col gap-[1.6rem]">
          <div className="w-full flex items-center justify-between">
            <p className="font-semibold text-[1.8rem] leading-[2.6rem] text-black-300">{data.name} 기사님</p>
            <div className="flex gap-[0.4rem] items-center">
              <Image src={emptyHeart} alt="heart" width={24} height={24} />
              <p className="font-medium text-[1.8rem] leading-[2.6rem]">{data.likeCount}</p>
            </div>
          </div>
          <div className="w-full flex gap-[1.6rem] items-center">
            <div className="flex gap-[0.6rem] items-center">
              <Image src={star} alt="star" width={24} height={24} />
              <p className="font-medium text-[1.6rem] leading-[2.6rem] text-black-300">{data.rating}</p>
              <p className="font-medium text-[1.6rem] leading-[2.6rem] text-gray-300">({data.reviewCount})</p>
            </div>
            <div className="border border-line-200 h-[1.4rem]" />
            <div className="flex gap-[0.6rem]">
              <p className="font-medium text-[1.6rem] leading-[2.6rem] text-gray-300">경력</p>
              <p className="font-medium text-[1.6rem] leading-[2.6rem] text-black-300">{data.career}년</p>
            </div>
            <div className="border border-line-200 h-[1.4rem]" />
            <div className="flex gap-[0.6rem]">
              <p className="font-medium text-[1.6rem] leading-[2.6rem] text-black-300">{data.applyCount}건</p>
              <p className="font-medium text-[1.6rem] leading-[2.6rem] text-gray-300">확정</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
