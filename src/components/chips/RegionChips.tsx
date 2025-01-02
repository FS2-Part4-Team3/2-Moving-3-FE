import regions from "../../../constants/regions";

export function RegionChips() {
  return (
    <div className="w-[41.6rem] grid grid-cols-5 gap-6">
      {regions.map((region) => (
        <div
          key={region.name}
          className="flex justify-center items-center w-[7.2rem] h-[4.6rem] border rounded-[10rem] bg-background-100 border-gray-100 "
        >
          <span className="text-blue-400 text-[1.8rem] font-normal">
            {region.name}
          </span>
        </div>
      ))}
    </div>
  );
}
