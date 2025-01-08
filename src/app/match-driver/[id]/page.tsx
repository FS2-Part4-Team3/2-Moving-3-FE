import { getDriverDetailData } from "@/api/DriverService";
import ReviewChart from "@/components/cards/ReviewChart";
import Image from "next/image";
import { notFound } from "next/navigation";
import clip from "@/../../public/assets/driver/ic_clip.svg";
import kakao from "@/../../public/assets/driver/ic_kakao.svg";
import facebook from "@/../../public/assets/driver/ic_facebook.svg";
import DriverDetailClient from "@/pages/DriverDetailClient";

export default async function DriverDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const driverData = await getDriverDetailData(id);

  if (driverData.id !== id || !driverData) {
    notFound();
  }

  return (
    <div className="flex flex-row gap-[11.7rem] pt-[5.6rem] justify-center">
      <div className="flex flex-col gap-[21.4rem] w-[95.5rem]">
        <div className="flex flex-col gap-[4rem]">
          <div>driver profile card comp</div>
          <div className="border border-line-100 w-full"></div>
          <div className="flex flex-col gap-[3.2rem]">
            <p className="text-[2.4rem] leading-[3.2rem] font-bold text-black-400">
              상세설명
            </p>
            <p className="text-[1.8rem] leading-[2.6rem] font-normal text-black-400">
              data - 상세설명
            </p>
          </div>
          <div className="border border-line-100 w-full"></div>
          <div className="flex flex-col gap-[3.2rem]">
            <p className="text-[2.4rem] leading-[3.2rem] font-bold text-black-400">
              제공 서비스
            </p>
            <div className="gap-[1.2rem]">제공 서비스 chip comp</div>
          </div>
          <div className="border border-line-100 w-full"></div>
          <div className="flex flex-col gap-[3.2rem]">
            <p className="text-[2.4rem] leading-[3.2rem] font-bold text-black-400">
              서비스 가능 지역
            </p>
            <div className="gap-[1.2rem]">서비스 가능 지역 chip comp</div>
          </div>
          <div className="border border-line-100 w-full"></div>
          <div className="flex flex-col gap-[3.2rem]">
            <p className="text-[2.4rem] leading-[3.2rem] font-bold text-black-400">
              리뷰 ({driverData.reviewCount})
            </p>
            <ReviewChart
              data={driverData.reviews}
              score={driverData.score}
              reviewCount={driverData.reviewCount}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col w-full py-[3.2rem] gap-[2.4rem] border-b border-line-100">
              <div className="flex flex-col gap-[0.8rem]">
                <div className="gap-[1.4rem] flex flex-row items-center">
                  <div className="text-[1.8rem] leading-[2.6rem] font-normal text-black-400">
                    이름
                  </div>
                  <div className="border-l border-line-200 h-[1.4rem]"></div>
                  <div className="text-[1.8rem] leading-[2.6rem] font-normal text-gray-300">
                    날짜
                  </div>
                </div>
                <div>별점</div>
              </div>
              <div className="text-[1.8rem] leading-[2.6rem] font-normal text-[#2B2B2B]">
                comment
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center pb-[6.5rem]">pagination</div>
      </div>

      <div className="flex flex-col w-[35.4rem] gap-[4rem]">
        <div className="flex flex-col gap-[3.2rem]">
          <p className="text-[2rem] leading-[3.2rem] text-black-400 font-semibold">
            drivername 기사님에게 지정 견적을 요청해보세요!
          </p>
          <DriverDetailClient />
        </div>
        <div className="border border-line-100 w-[32.8rem]"></div>
        <div className="flex flex-col gap-[2.2rem]">
          <p className="text-[2rem] leading-[3.2rem] font-semibold text-black-400">
            나만 알기엔 아쉬운 기사님인가요?
          </p>
          <div className="flex flex-row gap-[1.6rem]">
            <Image src={clip} alt="share-clip" width={64} height={64} />
            <Image src={kakao} alt="share-kakao" width={64} height={64} />
            <Image src={facebook} alt="share-facebook" width={64} height={64} />
          </div>
        </div>
      </div>
    </div>
  );
}
