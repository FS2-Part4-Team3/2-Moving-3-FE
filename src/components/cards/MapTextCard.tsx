import { useState } from 'react';
import { MapTextCardProps } from '@/interfaces/Card/MapCardInterface';
import { ButtonWrapper } from '../common/headless/Button';
import MapDropdown from '../dropdown/MapDropdown';

export default function MapTextCard({ handleClick, fromCoordinate, toCoordinate }: MapTextCardProps) {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  return (
    <div className="flex flex-col justify-center gap-[2.4rem]">
      <div className="flex items-center justify-center gap-[1.5rem]">
        <p className="font-semibold text-[2.4rem] leading-[2.6rem]">현재 위치에서</p>
        <div className="flex gap-[1rem] justify-center items-center">
          <MapDropdown selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
          <p className="font-semibold text-[2.4rem] leading-[2.6rem]">까지</p>
        </div>
      </div>
      <ButtonWrapper
        id="find-route"
        onClick={() =>
          handleClick(selectedMenu === '출발지' ? fromCoordinate : toCoordinate, selectedMenu === '출발지' ? '출발지' : '도착지')
        }
      >
        <ButtonWrapper.Button
          className="rounded-[0.8rem] p-[1.6rem] h-[4rem] flex items-center justify-center font-semibold text-white text-[2rem] leading-[3.2rem]"
          disabled={!selectedMenu}
        >
          가는 길 찾아보기
        </ButtonWrapper.Button>
      </ButtonWrapper>
    </div>
  );
}
