import type { ProfileChipProps } from '@/interfaces/chip/ProfileChipInterface';

export function ProfileChips({
  regions,
  movingTypes,
  selectedRegion,
  selectedMovingType,
  setSelectedRegion,
  setSelectedMovingType,
}: ProfileChipProps) {
  const handleRegionSelect = (regionName: string) => {
    //TODO: user 정보 넣기
    // if(user.role === driver) {
    //    if(selectedRegions.includes(regionName)){
    //     setSelectedRegions(selectedRegions.filter((r) => r != regionName));
    //    } else {
    //     setSelectedRegions([...selectedRegions, regionName])
    //    }
    //   }
    setSelectedRegion?.(regionName);
  };

  const handleMovingTypeSelect = (movingType: string) => {
    setSelectedMovingType?.(movingType);
  };

  return (
    <>
      <div className="lg:w-[41.6rem] md:w-[27.7rem] sm:w-[27.7rem] grid grid-cols-5 gap-6">
        {regions &&
          regions.map(region => (
            <div
              onClick={() => handleRegionSelect(region.name)}
              key={region.name}
              className={`flex justify-center items-center lg:w-[7.2rem] lg:h-[4.6rem] md:w-[4.9rem] md:h-[3.6rem] sm:w-[4.9rem] sm:h-[3.6rem] lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.4rem] font-normal border rounded-[10rem] cursor-pointer ${
                selectedRegion === region.name
                  ? 'bg-blue-50 text-blue-300 border-blue-300'
                  : 'bg-background-100 text-blue-400 border-gray-100' //toDo: 유저 정보 입력 후 다수의 지역 선택 시 css 반영
              }`}
            >
              {region.name}
            </div>
          ))}
      </div>
      <div className="lg:w-[34.8rem] md:w-[24.3rem] sm:w-[24.3rem] flex justify-between">
        {movingTypes &&
          movingTypes.map(movingType => (
            <div
              onClick={() => handleMovingTypeSelect(movingType.type)}
              key={movingType.type}
              className={`flex justify-center items-center lg:w-[10.3rem] lg:h-[4.6rem] md:w-[7.3rem] md:h-[3.6rem] sm:w-[7.3rem] sm:h-[3.6rem] lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.4rem] font-normal border rounded-[10rem] cursor-pointer ${
                selectedMovingType === movingType.type
                  ? 'bg-blue-50 text-blue-300 border-blue-300'
                  : 'bg-background-100 text-blue-400 border-gray-100'
              }`}
            >
              {movingType.type}
            </div>
          ))}
      </div>
    </>
  );
}
