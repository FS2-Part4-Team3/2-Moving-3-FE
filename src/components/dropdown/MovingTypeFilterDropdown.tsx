'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import checkbox from '@/../public/assets/common/check-box/check-box.svg';
import checkbox_blue from '@/../public/assets/common/check-box/check-box_blue.svg';
import x from '@/../public/assets/common/icon_X.svg';
import type { MediaTypeFilterDropdownProps } from '@/interfaces/Dropdown/MediaTypeFilterDropdownInterface';
import { setDesignatedRequest, setServiceArea, setServiceType } from '@/store/slices/movesSlice';
import { RootState } from '@/store/store';
import { ButtonWrapper } from '../common/headless/Button';

export default function MovingTypeFilterDropdown({ onClick, filterState, onFilterChange }: MediaTypeFilterDropdownProps) {
  const dispatch = useDispatch();
  const { movesList } = useSelector((state: RootState) => state.moves);

  const [isMenuClick, setIsMenuClick] = useState<'mov' | 'filter'>('mov');

  const handleClickMovType = (movType: string) => {
    const updatedTypes = filterState.types.includes(movType)
      ? filterState.types.filter(type => type !== movType)
      : [...filterState.types, movType];

    const newState = {
      ...filterState,
      types: updatedTypes,
      smallMov: movType === 'SMALL' ? !filterState.smallMov : filterState.smallMov,
      homeMov: movType === 'HOME' ? !filterState.homeMov : filterState.homeMov,
      officeMov: movType === 'OFFICE' ? !filterState.officeMov : filterState.officeMov,
    };

    onFilterChange(newState);
    dispatch(setServiceType(updatedTypes.join(',')));
  };

  const handleSelectMovAll = () => {
    const allSelected = filterState.smallMov && filterState.homeMov && filterState.officeMov;
    const newState = {
      ...filterState,
      smallMov: !allSelected,
      homeMov: !allSelected,
      officeMov: !allSelected,
      types: !allSelected ? ['SMALL', 'HOME', 'OFFICE'] : [],
    };

    onFilterChange(newState);
    dispatch(setServiceType(newState.types.join(',')));
  };

  const handleClickFilter = (filter: string) => {
    const newState = { ...filterState };
    if (filter === 'area') {
      newState.serviceable = !filterState.serviceable;
      dispatch(setServiceArea(newState.serviceable ? 'Active' : 'Inactive'));
    } else if (filter === 'appointment') {
      newState.appointRequest = !filterState.appointRequest;
      dispatch(setDesignatedRequest(newState.appointRequest ? 'Active' : 'Inactive'));
    }

    onFilterChange(newState);
  };

  const handleSelectFilterAll = () => {
    const allSelected = filterState.serviceable && filterState.appointRequest;
    const newState = {
      ...filterState,
      serviceable: !allSelected,
      appointRequest: !allSelected,
    };

    onFilterChange(newState);
    dispatch(setServiceArea(!allSelected ? 'Active' : 'Inactive'));
    dispatch(setDesignatedRequest(!allSelected ? 'Active' : 'Inactive'));
  };

  return (
    <div className="sm:fixed sm:inset-0 lg:static">
      <div className="md:w-[32.8rem] sm:w-full flex flex-col gap-[5.2rem] lg:block sm:hidden">
        <div className="flex flex-col gap-[2.4rem]">
          <div className="border-b border-line-200 flex justify-between items-center py-[1.6rem] px-[1rem]">
            <p className="font-medium text-[2rem] leading-[3.2rem] text-black">이사 유형</p>
            <div className="flex gap-[0.4rem] items-center">
              <Image
                src={filterState.smallMov && filterState.homeMov && filterState.officeMov ? checkbox_blue : checkbox}
                alt="checkbox"
                width={36}
                height={36}
                onClick={handleSelectMovAll}
                className="cursor-pointer"
              />
              <p className="font-normal text-[1.8rem] leading-[2.6rem] text-gray-300">전체선택</p>
            </div>
          </div>
          <div className="flex flex-col gap-[1.6rem]">
            <div className="flex justify-between border-b border-line-100 p-[1.6rem]">
              <div className="flex gap-[0.4rem] font-medium text-[1.8rem] leading-[2.6rem] text-black-400">
                <p>소형이사</p>
                <p>({movesList?.counts.serviceTypeCounts[0].count})</p>
              </div>
              <Image
                src={filterState.smallMov ? checkbox_blue : checkbox}
                alt="checkbox"
                width={36}
                height={36}
                onClick={() => {
                  handleClickMovType('SMALL');
                }}
                className="cursor-pointer"
              />
            </div>
            <div className="flex justify-between border-b border-line-100 p-[1.6rem]">
              <div className="flex gap-[0.4rem] font-medium text-[1.8rem] leading-[2.6rem] text-black-400">
                <p>가정이사</p>
                <p>({movesList?.counts.serviceTypeCounts[1].count})</p>
              </div>
              <Image
                src={filterState.homeMov ? checkbox_blue : checkbox}
                alt="checkbox"
                width={36}
                height={36}
                onClick={() => {
                  handleClickMovType('HOME');
                }}
                className="cursor-pointer"
              />
            </div>
            <div className="flex justify-between border-b border-line-100 p-[1.6rem]">
              <div className="flex gap-[0.4rem] font-medium text-[1.8rem] leading-[2.6rem] text-black-400">
                <p>사무실이사</p>
                <p>({movesList?.counts.serviceTypeCounts[2].count})</p>
              </div>
              <Image
                src={filterState.officeMov ? checkbox_blue : checkbox}
                alt="checkbox"
                width={36}
                height={36}
                onClick={() => {
                  handleClickMovType('OFFICE');
                }}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[2.4rem]">
          <div className="border-b border-line-200 flex justify-between items-center py-[1.6rem] px-[1rem]">
            <p className="font-medium text-[2rem] leading-[3.2rem] text-black">필터</p>
            <div className="flex gap-[0.4rem] items-center">
              <Image
                src={filterState.serviceable && filterState.appointRequest ? checkbox_blue : checkbox}
                alt="checkbox"
                width={36}
                height={36}
                onClick={handleSelectFilterAll}
                className="cursor-pointer"
              />
              <p className="font-normal text-[1.8rem] leading-[2.6rem] text-gray-300">전체선택</p>
            </div>
          </div>
          <div className="flex flex-col gap-[1.6rem]">
            <div className="flex justify-between border-b border-line-100 p-[1.6rem]">
              <div className="flex gap-[0.4rem] font-medium text-[1.8rem] leading-[2.6rem] text-black-400">
                <p>서비스 가능 지역</p>
                <p>({movesList?.counts.serviceAreaCount})</p>
              </div>
              <Image
                src={filterState.serviceable ? checkbox_blue : checkbox}
                alt="checkbox"
                width={36}
                height={36}
                onClick={() => {
                  handleClickFilter('area');
                }}
                className="cursor-pointer"
              />
            </div>
            <div className="flex justify-between border-b border-line-100 p-[1.6rem]">
              <div className="flex gap-[0.4rem] font-medium text-[1.8rem] leading-[2.6rem] text-black-400">
                <p>지정 견적 요청</p>
                <p>({movesList?.counts.designatedRequestCount})</p>
              </div>
              <Image
                src={filterState.appointRequest ? checkbox_blue : checkbox}
                alt="checkbox"
                width={36}
                height={36}
                onClick={() => {
                  handleClickFilter('appointment');
                }}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full min-h-screen flex md:items-center md:justify-center sm:items-end bg-black bg-opacity-50 lg:hidden">
        <div className="bg-white md:w-[37.5rem] sm:w-full md:rounded-[3.2rem] sm:rounded-tr-[3.2rem] sm:rounded-tl-[3.2rem] pt-[1.6rem] pb-[3.2rem] px-[2.4rem] flex flex-col gap-[2.4rem]">
          <div className="flex flex-col gap-[1.2rem]">
            <div className="flex w-full justify-between p-[0.8rem]">
              <div className="flex gap-[2.4rem]">
                <p
                  className={`font-bold text-[1.8rem] leading-[2.6rem] cursor-pointer ${
                    isMenuClick === 'mov' ? 'text-black-400' : 'text-gray-300'
                  }`}
                  onClick={() => setIsMenuClick('mov')}
                >
                  이사 유형
                </p>
                <p
                  className={`font-bold text-[1.8rem] leading-[2.6rem] cursor-pointer ${
                    isMenuClick === 'filter' ? 'text-black-400' : 'text-gray-300'
                  }`}
                  onClick={() => setIsMenuClick('filter')}
                >
                  필터
                </p>
              </div>
              <Image src={x} alt="x" width={24} height={24} onClick={onClick} className="cursor-pointer" />
            </div>
            {isMenuClick === 'mov' && (
              <div className="flex flex-col gap-[0.8rem]">
                <div className="flex gap-[1rem] items-center py-[0.8rem] px-[1rem] border-b border-line-100 justify-between">
                  <div className="flex">
                    <p className="font-normal text-[1.6rem] leading-[2.6rem] text-gray-300">전체선택 ({movesList?.totalCount})</p>
                  </div>
                  <Image
                    src={filterState.smallMov && filterState.homeMov && filterState.officeMov ? checkbox_blue : checkbox}
                    alt="checkbox"
                    width={36}
                    height={36}
                    onClick={handleSelectMovAll}
                    className="cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between border-b border-line-100 p-[1.6rem]">
                    <div className="flex gap-[0.4rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
                      <p>소형이사</p>
                      <p>({movesList?.counts.serviceTypeCounts[0].count})</p>
                    </div>
                    <Image
                      src={filterState.smallMov ? checkbox_blue : checkbox}
                      alt="checkbox"
                      width={36}
                      height={36}
                      onClick={() => handleClickMovType('SMALL')}
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between border-b border-line-100 p-[1.6rem]">
                    <div className="flex gap-[0.4rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
                      <p>가정이사</p>
                      <p>({movesList?.counts.serviceTypeCounts[1].count})</p>
                    </div>
                    <Image
                      src={filterState.homeMov ? checkbox_blue : checkbox}
                      alt="checkbox"
                      width={36}
                      height={36}
                      onClick={() => handleClickMovType('HOME')}
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between border-b border-line-100 p-[1.6rem]">
                    <div className="flex gap-[0.4rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
                      <p>사무실이사</p>
                      <p>({movesList?.counts.serviceTypeCounts[2].count})</p>
                    </div>
                    <Image
                      src={filterState.officeMov ? checkbox_blue : checkbox}
                      alt="checkbox"
                      width={36}
                      height={36}
                      onClick={() => handleClickMovType('OFFICE')}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}
            {isMenuClick === 'filter' && (
              <div className="flex flex-col gap-[0.8rem]">
                <div className="flex gap-[1rem] items-center py-[0.8rem] px-[1rem] border-b border-line-100 justify-between">
                  <div className="flex">
                    <p className="font-normal text-[1.6rem] leading-[2.6rem] text-gray-300">전체선택 ({movesList?.totalCount})</p>
                  </div>
                  <Image
                    src={filterState.serviceable && filterState.appointRequest ? checkbox_blue : checkbox}
                    alt="checkbox"
                    width={36}
                    height={36}
                    onClick={handleSelectFilterAll}
                    className="cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between border-b border-line-100 p-[1.6rem]">
                    <div className="flex gap-[0.4rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
                      <p>서비스 가능 지역</p>
                      <p>({movesList?.counts.serviceAreaCount})</p>
                    </div>
                    <Image
                      src={filterState.serviceable ? checkbox_blue : checkbox}
                      alt="checkbox"
                      width={36}
                      height={36}
                      onClick={() => handleClickFilter('area')}
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between border-b border-line-100 p-[1.6rem]">
                    <div className="flex gap-[0.4rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400">
                      <p>지정 견적 요청</p>
                      <p>({movesList?.counts.designatedRequestCount})</p>
                    </div>
                    <Image
                      src={filterState.appointRequest ? checkbox_blue : checkbox}
                      alt="checkbox"
                      width={36}
                      height={36}
                      onClick={() => handleClickFilter('appointment')}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <ButtonWrapper id="inquiry-driver">
            <ButtonWrapper.Button
              className="w-full h-[5.4rem] rounded-[1.6rem] p-[1.6rem] font-semibold text-[1.6rem] leading-[2.6rem] text-white"
              onClick={onClick}
            >
              조회하기
            </ButtonWrapper.Button>
          </ButtonWrapper>
        </div>
      </div>
    </div>
  );
}
