import { ButtonWrapper } from '../common/headless/Button';
import MapDropdown from '../dropdown/MapDropdown';

export default function MapTextCard() {
  return (
    <div className="flex flex-col justify-center gap-[2.4rem]">
      <div className="flex items-center justify-center gap-[1.5rem]">
        <p className="font-semibold text-[2.4rem] leading-[2.6rem]">현재 위치에서</p>
        <div className="flex gap-[1rem] justify-center items-center">
          <MapDropdown />
          <p className="font-semibold text-[2.4rem] leading-[2.6rem]">까지</p>
        </div>
      </div>
      <ButtonWrapper id="find-route">
        <ButtonWrapper.Button className="rounded-[0.8rem] p-[1.6rem] h-[4rem] flex items-center justify-center font-semibold text-white text-[2rem] leading-[3.2rem]">
          가는 길 찾아보기
        </ButtonWrapper.Button>
      </ButtonWrapper>
    </div>
  );
}
