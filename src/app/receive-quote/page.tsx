import SearchBar from "@/components/common/searchbar/SearchBar";
import DriverSortDropdown from "@/components/dropdown/DriverSortDropdown";
import ReceiveQuoteMovingTypeClient from "@/pages/ReceiveQuoteMovingTypeClient";

export default function ReceiveQuote() {
  //TODO : Search Bar 호출부 뱐경 -> <DriverSearchBar />
  //TODO : 전체 999999건은 임시 값임

  return (
    <div className="w-full flex items-center justify-center mb-[7rem]">
      <div className="lg:w-[120rem] sm:w-full items-start justify-center flex flex-col">
        <div className="lg:block sm:hidden py-[3.2rem]">
          <p className="font-semibold text-[2.4rem] leading-[3.2rem] text-[#2B2B2B]">
            받은 요청
          </p>
        </div>
        <div className="lg:flex lg:gap-[10rem] w-full sm:py-[1.6rem] lg:px-0 md:px-[7.2rem] sm:px-[2.4rem]">
          <ReceiveQuoteMovingTypeClient />
          <div className="flex flex-col items-center lg:gap-[3.2rem] sm:gap-[2.4rem] flex-grow lg:w-full sm:w-full">
            <div className="w-full flex flex-col gap-[2.4rem] lg:items-end sm:items-center">
              <div className="sm:py-[0.6rem] sm:px-[1rem] w-full">
                <SearchBar />
              </div>
              <div className="lg:flex sm:hidden justify-between w-full items-center">
                <p className="font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
                  전체 999999건
                </p>
                <DriverSortDropdown />
              </div>
            </div>
            <div className="w-full sm:px-[1rem] sm:gap-[2.4rem] md:gap-[3.2rem] lg:gap-[4.8rem] flex flex-col"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
