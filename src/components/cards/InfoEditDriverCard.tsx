import Image from 'next/image';
import star from '@/../public/assets/driver/ic_star_yellow.svg';
import { InfoEditDriverCardProps } from '@/interfaces/Card/InfoEditDriverCardInterface';

export default function InfoEditDriverCard({ data }: InfoEditDriverCardProps) {
  return (
    <div className="w-full flex flex-col border border-gray-100 bg-background-100 rounded-[1.6rem] p-[2.4rem] gap-[2.4rem]">
      <div className="w-full justify-between flex flex-row items-center">
        <div className="flex flex-col gap-[0.8rem]">
          <p className="font-semibold text-[2.4rem] leading-[3.2rem] text-black-300">{data.name}</p>
          <p className="font-normal text-[2rem] leading-[3.2rem] text-gray-400">{data.introduce}</p>
        </div>
        <div className="flex flex-row gap-[1.6rem]">버튼</div>
      </div>
      <div className="w-full flex flex-row px-[1.8rem] py-[2.4rem] gap-[2.4rem] bg-background-100 border border-line-200 rounded-[0.6rem] shadow-custom11">
        {data.image && (
          <Image
            src={data.image}
            alt="driver"
            width={80}
            height={80}
            objectFit="cover"
            className="border-2 border-blue-400 rounded-full"
          />
        )}
        <div className="flex flex-col gap-[1.6rem]">
          <div className="flex flex-row gap-[1.6rem] items-center font-medium lg:text-[1.6rem] sm:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem]">
            <div className="flex flex-row gap-[0.6rem]">
              <Image src={star} alt="star" width={24} height={24} />
              <p className="text-black-300">{data.rating}</p>
              <p className="text-gray-300">({data.reviewCount})</p>
            </div>
            <div className="h-[1.4rem] border border-line-200" />
            <div className="flex flex-row gap-[0.6rem]">
              <div className="text-gray-300">경력</div>
              <div className="text-black-300">{data.career}년</div>
            </div>
            <div className="h-[1.4rem] border border-line-200" />
            <div className="flex flex-row gap-[0.6rem]">
              <div className="text-black-300">{data.applyCount}건</div>
              <div className="text-gray-300">확정</div>
            </div>
          </div>
          <div className="flex flex-row gap-[1.6rem] items-center font-normal text-[1.8rem] leading-[2.6rem]">
            <div className="flex flex-row gap-[1.2rem] items-center">
              <div className="border border-line-100 bg-background-200 rounded-[0.4rem] px-[0.6rem] py-[0.4rem] gap-[1rem]">
                <p className="text-gray-500">제공 서비스</p>
              </div>
              <div className="text-black-300">{data.serviceType}</div>
            </div>
            <div className="h-[1.6rem] border border-line-200" />
            <div className="flex flex-row gap-[1.2rem] items-center">
              <div className="border border-line-100 bg-background-200 rounded-[0.4rem] px-[0.6rem] py-[0.4rem] gap-[1rem]">
                <p className="text-gray-500">지역</p>
              </div>
              <div className="text-black-300">{data.availableAreas}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
