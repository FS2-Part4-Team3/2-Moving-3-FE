'use client';

import { animated, useSpring } from '@react-spring/web';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import clicked_arrow from '@/../public/assets/common/dropdown/chevron-down-clicked.svg';
import arrow_down from '@/../public/assets/common/dropdown/chevron-down.svg';
import arrow from '@/../public/assets/common/dropdown/chevron-down_gray.svg';
import movingTypeDropdown from '@/constants/movingTypeDropdown';
import regionsDropdown from '@/constants/regionsDropdown';
import { resetSelection, setArea, setServiceType } from '@/store/slices/driversSlice';

export default function RegionServiceDropdown() {
  const dispatch = useDispatch();

  const [regionDropdownOpen, setRegionDropdownOpen] = useState<boolean>(false);
  const [isRegionVisible, setIsRegionVisible] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState<boolean>(false);
  const [isServiceVisible, setServiceIsVisible] = useState(false);

  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const { theme } = useTheme();

  useEffect(() => {
    if (regionDropdownOpen) {
      setIsRegionVisible(true);
    } else {
      setTimeout(() => setIsRegionVisible(false), 300);
    }
  }, [regionDropdownOpen]);

  useEffect(() => {
    if (serviceDropdownOpen) {
      setServiceIsVisible(true);
    } else {
      setTimeout(() => setServiceIsVisible(false), 300);
    }
  }, [serviceDropdownOpen]);

  const handleResetClick = () => {
    dispatch(resetSelection());
    setSelectedRegion(null);
    setSelectedService(null);
  };

  const handleRegionClick = (region: string) => {
    setSelectedRegion(region);
    const regionObj = regionsDropdown.find(r => r.name === region);
    if (regionObj) {
      dispatch(setArea(regionObj.code ?? undefined));
    }
    setRegionDropdownOpen(false);
  };

  const handleServiceClick = (service: string) => {
    setSelectedService(service);

    const movingObj = movingTypeDropdown.find(s => s.type === service);
    if (movingObj) {
      dispatch(setServiceType(movingObj.code ?? undefined));
    }
    setServiceDropdownOpen(false);
  };

  const regionDropdownAnimation = useSpring({
    opacity: regionDropdownOpen ? 1 : 0,
    transform: regionDropdownOpen ? 'translateY(0)' : 'translateY(-10px)',
    height: 'auto',
    config: { tension: 170, friction: 30 },
  });

  const serviceDropdownAnimation = useSpring({
    opacity: serviceDropdownOpen ? 1 : 0,
    transform: serviceDropdownOpen ? 'translateY(0)' : 'translateY(-10px)',
    height: 'auto',
    config: { tension: 170, friction: 30 },
  });

  return (
    <div className="lg:w-[32.8rem] flex lg:flex-col lg:gap-[3.2rem] sm:gap-[1.2rem]">
      <div className="lg:block sm:hidden">
        <div className="border-b border-line-200 py-[1.6rem] px-[1rem] flex justify-between items-center">
          <p className="font-medium text-[2rem] leading-[3.2rem] text-black dark:text-dark-t">필터</p>
          <p className="font-medium text-[1.6rem] leading-[2.6rem] text-gray-300 cursor-pointer" onClick={handleResetClick}>
            초기화
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-[1.6rem] relative">
        <p className="font-semibold text-[1.8rem] leading-[2.6rem] text-black-400 lg:block sm:hidden dark:text-dark-t">
          지역을 선택해주세요
        </p>
        <div
          className={`lg:w-full lg:h-[6.4rem] sm:w-[8rem] sm:h-[3.6rem] lg:rounded-[1.6rem] sm:rounded-[0.8rem] border lg:py-[1.6rem] lg:px-[2.4rem] sm:py-[0.6rem] sm:pr-[1rem] sm:pl-[1.4rem] flex items-center justify-between cursor-pointer mb-[0.8rem] dark:bg-dark-p ${
            regionDropdownOpen ? 'border-blue-300 bg-blue-50' : 'border-gray-100'
          }`}
          onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}
        >
          <p
            className={`font-medium lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] ${
              regionDropdownOpen ? 'text-blue-300' : 'text-black-400 dark:text-dark-t'
            }`}
          >
            {selectedRegion || '지역'}
          </p>
          <Image
            src={
              theme === 'dark' ? (regionDropdownOpen ? clicked_arrow : arrow) : regionDropdownOpen ? clicked_arrow : arrow_down
            }
            alt="arrow"
            width={36}
            height={36}
            className="lg:block sm:hidden"
          />
          <Image
            src={
              theme === 'dark' ? (regionDropdownOpen ? clicked_arrow : arrow) : regionDropdownOpen ? clicked_arrow : arrow_down
            }
            alt="arrow"
            width={20}
            height={20}
            className="lg:hidden sm:block"
          />
        </div>
        {isRegionVisible && (
          <animated.div
            style={regionDropdownAnimation}
            className="absolute w-auto border bg-white dark:bg-dark-p border-line-200 top-full lg:rounded-[1.6rem] sm:rounded-[0.8rem] pr-[0.5rem] py-[0.6rem] z-[2]"
          >
            <div className="grid grid-cols-2 lg:h-[32rem] sm:h-[18rem] lg:w-auto sm:w-[15rem] overflow-y-auto overflow-x-hidden">
              {regionsDropdown.map((region, index) => (
                <div
                  key={index}
                  className={`lg:w-[16.4rem] lg:h-[6.4rem] lg:py-[1.6rem] lg:px-[2.4rem] sm:w-[7.5rem] sm:h-[3.6rem] sm:py-[0.6rem] sm:px-[1.4rem] font-medium lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-black-400 dark:text-dark-t cursor-pointer ${
                    index % 2 === 0 ? 'border-r border-line-200' : ''
                  }`}
                  onClick={() => handleRegionClick(region.name)}
                >
                  {region.name}
                </div>
              ))}
            </div>
          </animated.div>
        )}
      </div>
      <div className="flex flex-col gap-[1.6rem] relative">
        <p className="font-semibold text-[1.8rem] leading-[2.6rem] text-black-400 dark:text-dark-t lg:block sm:hidden">
          어떤 서비스가 필요하세요?
        </p>
        <div
          className={`lg:w-full lg:h-[6.4rem] sm:w-auto sm:h-[3.6rem] lg:rounded-[1.6rem] sm:rounded-[0.8rem] border lg:py-[1.6rem] lg:px-[2.4rem] sm:py-[0.6rem] sm:pr-[1rem] sm:pl-[1.4rem] flex items-center justify-between cursor-pointer mb-[0.8rem] dark:bg-dark-p ${
            serviceDropdownOpen ? 'border-blue-300 bg-blue-50' : 'border-gray-100'
          }`}
          onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
        >
          <p
            className={`font-medium lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] ${
              serviceDropdownOpen ? 'text-blue-300' : 'text-black-400 dark:text-dark-t'
            }`}
          >
            {selectedService || '서비스'}
          </p>
          <Image
            src={
              theme === 'dark' ? (regionDropdownOpen ? clicked_arrow : arrow) : regionDropdownOpen ? clicked_arrow : arrow_down
            }
            alt="arrow"
            width={36}
            height={36}
            className="lg:block sm:hidden"
          />
          <Image
            src={
              theme === 'dark' ? (regionDropdownOpen ? clicked_arrow : arrow) : regionDropdownOpen ? clicked_arrow : arrow_down
            }
            alt="arrow"
            width={20}
            height={20}
            className="lg:hidden sm:block"
          />
        </div>
        {isServiceVisible && (
          <animated.div
            style={serviceDropdownAnimation}
            className="absolute lg:w-full sm:w-[9rem] bg-white dark:bg-dark-p border border-line-200 top-full lg:rounded-[1.6rem] sm:rounded-[0.8rem] pr-[0.5rem] py-[0.6rem] flex z-[1]"
          >
            <div className="flex flex-col lg:w-[16.4rem] sm:w-auto">
              {movingTypeDropdown.map((movingType, index) => (
                <div
                  key={index}
                  className="lg:py-[1.6rem] lg:px-[2.4rem] sm:py-[0.6rem] sm:pl-[1.4rem] font-medium lg:text-[1.8rem] sm:text-[1.4rem] lg:leading-[2.6rem] sm:leading-[2.4rem] text-black-400 dark:text-dark-t cursor-pointer"
                  onClick={() => handleServiceClick(movingType.type)}
                >
                  {movingType.type}
                </div>
              ))}
            </div>
          </animated.div>
        )}
      </div>
    </div>
  );
}
