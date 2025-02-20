import MatchDriverClient from '@/_pages/MatchDriverClient';
import SearchBar from '@/components/common/searchbar/SearchBar';
import RegionServiceDropdown from '@/components/dropdown/RegionServiceDropdown';
import SortDropdown from '@/components/dropdown/SortDropdown';

export default function MatchDriver() {
  return (
    <div className="w-full flex items-center justify-center mb-[7rem]">
      <div className="lg:w-[120rem] sm:w-full items-start justify-center flex flex-col">
        <div className="lg:block sm:hidden py-[3.2rem]">
          <p className="font-semibold text-[2.4rem] leading-[3.2rem] text-[#2B2B2B] dark:text-dark-t">기사님 찾기</p>
        </div>
        <div className="lg:flex lg:gap-[10rem] w-full sm:py-[1.6rem] lg:px-0 md:px-[7.2rem] sm:px-[2.4rem]">
          <div className="flex lg:flex-col lg:justify-start sm:justify-between lg:px-0 sm:px-[1rem] lg:gap-[4.6rem]">
            <RegionServiceDropdown />
            <div className="lg:hidden sm:block">
              <SortDropdown />
            </div>
          </div>
          <div className="flex flex-col items-center lg:gap-[3.2rem] sm:gap-[2.4rem] flex-grow lg:w-full sm:w-full">
            <div className="w-full flex flex-col gap-[2.4rem] lg:items-end sm:items-center">
              <div className="lg:block sm:hidden">
                <SortDropdown />
              </div>
              <div className="sm:py-[0.6rem] sm:px-[1rem] w-full">
                <SearchBar />
              </div>
            </div>
            <div className="w-full sm:px-[1rem] sm:gap-[2.4rem] md:gap-[3.2rem] lg:gap-[4.8rem] flex flex-col">
              <MatchDriverClient />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
