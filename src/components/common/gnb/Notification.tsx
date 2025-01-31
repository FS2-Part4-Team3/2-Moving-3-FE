import Image from 'next/image';
import xIcon from '@/../public/assets/common/icon_X.svg';

export default function Notification() {
  return (
    <div className="flex flex-col rounded-[2.4rem] border border-line-200 py-[1rem] px-[1.6rem] w-fit h-[40.2rem] bg-white">
      <div className="flex w-full items-center justify-between py-[1.4rem] pr-[1.2rem] pl-[2.4rem]">
        <p className="font-bold text-[1.8rem] leading-[2.6rem] text-black-400">알림</p>
        <Image src={xIcon} alt="x" width={24} height={24} className="cursor-pointer" />
      </div>
      <div className="overflow-y-auto">
        <div className="flex flex-col w-full pr-[0.5rem]">
          <div className="flex flex-col border-b border-line-200 py-[1.6rem] px-[2.4rem] gap-[0.2rem] cursor-pointer">
            <p className="font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
              김코드 기사님의 <span className="text-blue-300">소형이사 견적</span>이 도착했어요
            </p>
            <p className="font-medium text-[1.4rem] leading-[2.4rem] text-gray-300">2시간 전</p>
          </div>
          <div className="flex flex-col border-b border-line-200 py-[1.6rem] px-[2.4rem] gap-[0.2rem] cursor-pointer">
            <p className="font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
              김코드 기사님의 견적이 <span className="text-blue-300">확정</span>되었어요
            </p>
            <p className="font-medium text-[1.4rem] leading-[2.4rem] text-gray-300">3시간 전</p>
          </div>
          <div className="flex flex-col border-b border-line-200 py-[1.6rem] px-[2.4rem] gap-[0.2rem] cursor-pointer">
            <p className="font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
              내일은 <span className="text-blue-300">경기(일산) &rarr; 서울(영등포) 이사 예정일</span>이이에요
            </p>
            <p className="font-medium text-[1.4rem] leading-[2.4rem] text-gray-300">5시간 전</p>
          </div>
          <div className="flex flex-col border-b border-line-200 py-[1.6rem] px-[2.4rem] gap-[0.2rem] cursor-pointer">
            <p className="font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
              김코드 기사님의 <span className="text-blue-300">소형이사 견적</span>이 도착했어요
            </p>
            <p className="font-medium text-[1.4rem] leading-[2.4rem] text-gray-300">2시간 전</p>
          </div>
          <div className="flex flex-col border-b border-line-200 py-[1.6rem] px-[2.4rem] gap-[0.2rem] cursor-pointer">
            <p className="font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
              김코드 기사님의 견적이 <span className="text-blue-300">확정</span>되었어요
            </p>
            <p className="font-medium text-[1.4rem] leading-[2.4rem] text-gray-300">3시간 전</p>
          </div>
          <div className="flex flex-col border-b border-line-200 py-[1.6rem] px-[2.4rem] gap-[0.2rem] cursor-pointer">
            <p className="font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
              내일은 <span className="text-blue-300">경기(일산) &rarr; 서울(영등포) 이사 예정일</span>이이에요
            </p>
            <p className="font-medium text-[1.4rem] leading-[2.4rem] text-gray-300">5시간 전</p>
          </div>
        </div>
      </div>
    </div>
  );
}
