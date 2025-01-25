import Image from 'next/image';
import default_profile from '@/../public/assets/common/gnb/standard_profile.svg';
import star from '@/../public/assets/driver/ic_star_yellow.svg';
import DetailButtonClient from '@/_pages/DriverDetail/DetailButtonClient';
import movingTypes from '@/constants/movingType';
import regions from '@/constants/regions';
import { InfoEditDriverCardProps } from '@/interfaces/Card/InfoEditDriverCardInterface';

export default function InfoEditDriverCard({ data }: InfoEditDriverCardProps) {
  return (
    <div className="flex flex-col w-full gap-[1rem]">
      <div className="w-full flex flex-col border-[0.05rem] border-gray-100 bg-background-100 rounded-[1.6rem] lg:p-[2.4rem] sm:py-[1.6rem] sm:px-[1.4rem] lg:gap-[2.4rem] sm:gap-[1.6rem]">
        <div className="w-full justify-between flex flex-row items-center">
          <div className="flex flex-row gap-[1.6rem] items-center">
            <Image
              src={data.image || default_profile}
              alt="driver"
              width={46}
              height={46}
              style={{ objectFit: 'cover' }}
              className="w-[4.6rem] h-[4.6rem] border-2 border-blue-400 rounded-full lg:hidden sm:block"
            />
            <div className="flex flex-col gap-[0.8rem]">
              <p className="font-semibold lg:text-[2.4rem] lg:leading-[3.2rem] sm:text-[1.6rem] sm:leading-[2.6rem] text-black-300">
                {data.name}
              </p>
              <p className="font-normal lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.4rem] sm:leading-[2.4rem] text-gray-400">
                {data.introduce}
              </p>
            </div>
          </div>
          <div className="lg:block sm:hidden">
            <div className="flex flex-row gap-[1.6rem]">
              <DetailButtonClient type="InfoEditDriver" id={data.id} />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row lg:px-[1.8rem] lg:py-[2.4rem] sm:p-[1rem] lg:gap-[2.4rem] sm:gap-[1.4rem] bg-background-100 border border-line-200 rounded-[0.6rem] shadow-custom11">
          <Image
            src={data.image || default_profile}
            alt="driver"
            width={80}
            height={80}
            style={{ objectFit: 'cover' }}
            className="w-[8rem] h-[8rem] border-2 border-blue-400 rounded-full lg:block sm:hidden"
          />
          <div className="flex flex-col gap-[1.6rem]">
            <div className="flex flex-row gap-[1.6rem] items-center font-medium lg:text-[1.6rem] sm:text-[1.3rem] lg:leading-[2.6rem] sm:leading-[2.2rem]">
              <div className="flex flex-row lg:gap-[0.6rem] sm:gap-[0.2rem] items-center">
                <Image src={star} alt="star" width={24} height={24} />
                <p className="text-black-300">{data.rating}</p>
                <p className="text-gray-300">({data.reviewCount})</p>
              </div>
              <div className="h-[1.4rem] border border-line-200" />
              <div className="flex flex-row lg:gap-[0.6rem] sm:gap-[0.4rem]">
                <div className="text-gray-300">경력</div>
                <div className="text-black-300">{data.career}년</div>
              </div>
              <div className="h-[1.4rem] border border-line-200" />
              <div className="flex flex-row lg:gap-[0.6rem] sm:gap-[0.4rem]">
                <div className="text-black-300">{data.applyCount}건</div>
                <div className="text-gray-300">확정</div>
              </div>
            </div>
            <div className="flex md:flex-row sm:flex-col lg:gap-[1.6rem] md:gap-[1.4rem] sm:gap-[0.8rem] md:items-center sm:items-start font-normal lg:text-[1.8rem] lg:leading-[2.6rem] sm:text-[1.4rem] sm:leading-[2.4rem]">
              <div className="flex flex-row lg:gap-[1.2rem] sm:gap-[0.8rem] items-center">
                <div className="border border-line-100 bg-background-200 rounded-[0.4rem] px-[0.6rem] py-[0.4rem] gap-[1rem]">
                  <p className="text-gray-500">제공 서비스</p>
                </div>
                <div className="text-black-300">
                  {data.serviceType.map(type => movingTypes.find(item => item.code === type)?.type || type).join(', ')}
                </div>
              </div>
              <div className="lg:h-[1.6rem] sm:h-[1.4rem] border border-line-200 md:block sm:hidden" />
              <div className="flex flex-row lg:gap-[1.2rem] sm:gap-[0.8rem] items-center">
                <div className="border border-line-100 bg-background-200 rounded-[0.4rem] px-[0.6rem] lg:py-[0.4rem] sm:py-[0.2rem] gap-[1rem]">
                  <p className="text-gray-500">지역</p>
                </div>
                <div className="text-black-300">
                  {data.availableAreas.map(name => regions.find(item => item.code === name)?.name || name).join(', ')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden sm:block">
        <div className="flex md:flex-row sm:flex-col gap-[0.8rem] md:justify-between">
          <DetailButtonClient type="InfoEditDriver" id={data.id} />
        </div>
      </div>
    </div>
  );
}
