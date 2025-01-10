import { areaMapping, typeMapping } from '@/constants/labelMappings';
import type { DriverDetailChipProps } from '@/interfaces/chip/DriverDetailChipInterface';

export function DriverDetailChips({ serviceType, availableAreas }: DriverDetailChipProps) {
  return (
    <>
      {serviceType &&
        serviceType.map(type => (
          <div
            key={type}
            className="flex justify-center items-center lg:w-[10.3rem] lg:h-[4.6rem] md:w-[7.3rem] md:h-[3.6rem] sm:w-[7.3rem] sm:h-[3.6rem] lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.4rem] font-normal border rounded-[10rem] cursor-pointer bg-blue-50 text-blue-300 border-blue-300 shadow-chipServiceShadow"
          >
            {typeMapping[type] || type}
          </div>
        ))}
      {availableAreas &&
        availableAreas.map(area => (
          <div
            key={area}
            className="flex justify-center items-center lg:w-[7.2rem] lg:h-[4.6rem] md:w-[4.9rem] md:h-[3.6rem] sm:w-[4.9rem] sm:h-[3.6rem] lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.4rem] font-normal border rounded-[10rem] cursor-pointer bg-background-100 text-blue-400 border-gray-100 shadow-chipAreaShadow"
          >
            {areaMapping[area] || area}
          </div>
        ))}
    </>
  );
}
