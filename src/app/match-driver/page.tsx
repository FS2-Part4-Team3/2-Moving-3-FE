import SearchBar from "@/components/common/searchbar/SearchBar";
import RegionServiceDropdown from "@/components/dropdown/RegionServiceDropdown";
import SortDropdown from "@/components/dropdown/SortDropdown";

export default function MatchDriver() {
  return (
    <div>
      <p>기사님 찾기</p>
      <div>
        <RegionServiceDropdown />
        <div>
          <SortDropdown />
          <SearchBar />
          <h1>Driver Card</h1>
        </div>
      </div>
    </div>
  );
}
