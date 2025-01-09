import { getMoveInfoData } from "@/api/DriverService";
import ReceiveQuoteCard from "@/components/cards/ReceiveQuoteCard";
import Empty from "@/components/common/Empty/Empty";
import DriverSearchBar from "@/components/common/searchbar/DriverSearchBar";
import SearchBar from "@/components/common/searchbar/SearchBar";
import DriverSortDropdown from "@/components/dropdown/DriverSortDropdown";
import type { ReceiveQuoteData } from "@/interfaces/Page/ReceiveQuoteInterface";
import ReceiveQuoteMovingTypeClient from "@/pages/ReceiveQuoteMovingTypeClient";

export default async function ReceiveQuote() {
  let moveInfoData = await getMoveInfoData();

  //TODO : 전체 999999건은 임시 값임

  // moveInfoData = [];

  return (
    <div className="w-full flex items-center justify-center mb-[7rem]">
      <div className="lg:w-[120rem] sm:w-full items-start justify-center flex flex-col">
        <div className="lg:flex sm:hidden py-[3.2rem] w-full items-start">
          <p className="font-semibold text-[2.4rem] leading-[3.2rem] text-[#2B2B2B]">
            받은 요청
          </p>
        </div>
        <div className="lg:flex lg:gap-[10rem] justify-center w-full sm:py-[1.6rem] lg:px-0 md:px-[7.2rem] sm:px-[2.4rem]">
          <div className="lg:block sm:hidden">
            <ReceiveQuoteMovingTypeClient />
          </div>
          <div className="flex flex-col items-center lg:gap-[3.2rem] sm:gap-[2.4rem] flex-grow lg:w-full sm:w-full">
            <div className="w-full flex flex-col gap-[2.4rem] lg:items-end sm:items-center">
              <div className="sm:py-[0.6rem] sm:px-[1rem] lg:p-0 w-full">
                <DriverSearchBar />
              </div>
              <div className="flex justify-between w-full items-center sm:px-[1rem]">
                <p className="font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
                  전체 999999건
                </p>
                <div className="flex gap-[0.4rem] items-center">
                  <DriverSortDropdown />
                  <div className="lg:hidden sm:block">
                    <ReceiveQuoteMovingTypeClient />
                  </div>
                </div>
              </div>
            </div>
            {!moveInfoData.length ? (
              <div className="w-full h-[56rem] flex items-center justify-center">
                <Empty type="ReceiveQuote" />
              </div>
            ) : (
              <div className="w-full lg:px-0 sm:px-[1rem] sm:gap-[2.4rem] md:gap-[3.2rem] lg:gap-[4.8rem] flex flex-col">
                {moveInfoData?.map((user: any) => (
                  <div key={user.id}>
                    <ReceiveQuoteCard data={user} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
