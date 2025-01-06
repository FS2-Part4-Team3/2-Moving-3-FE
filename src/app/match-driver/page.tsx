import { getDriverData } from "@/api/DriverService";
import FindDriverCard from "@/components/cards/FindDriverCard";
import SearchBar from "@/components/common/searchbar/SearchBar";
import RegionServiceDropdown from "@/components/dropdown/RegionServiceDropdown";
import SortDropdown from "@/components/dropdown/SortDropdown";

export default async function MatchDriver() {
  const driverData = await getDriverData();

  return (
    <div className="w-full flex items-center justify-center mb-[7rem]">
      <div className="w-[120rem] items-start justify-center flex flex-col">
        <div className="py-[3.2rem]">
          <p className="font-semibold text-[2.4rem] leading-[3.2rem] text-[#2B2B2B]">
            기사님 찾기
          </p>
        </div>
        <div className="flex gap-[10rem] w-full">
          <RegionServiceDropdown />
          <div className="flex flex-col items-center gap-[3.2rem] flex-grow max-w-[calc(100%-10rem)]">
            <div className="w-full flex flex-col gap-[2.4rem] items-end">
              <SortDropdown />
              <SearchBar />
            </div>
            {driverData.map((driver: any) => (
              <FindDriverCard key={driver.id} data={driver} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
