import { MapTabProps } from '@/interfaces/Tabs/MapTabInterface';
import { ButtonWrapper } from '../common/headless/Button';

export default function MapTab({ activeTab, setActiveTab, renderContent }: MapTabProps) {
  return (
    <div className="flex flex-col">
      <div className="flex w-full rounded-[1.2rem] p-[0.6rem] gap-[1rem] bg-background-200">
        <ButtonWrapper id="my location - from address" onClick={() => setActiveTab('tab1')}>
          <ButtonWrapper.Button
            className={`w-full rounded-[0.8rem] py-[0.6rem] px-[1rem] gap-[1rem] font-semibold text-[1.6rem] leading-[2.6rem] ${activeTab === 'tab1' ? 'bg-white shadow-MapTabShadow' : '!bg-background-200'}`}
          >
            내 위치 - 출발지
          </ButtonWrapper.Button>
        </ButtonWrapper>
        <ButtonWrapper id="my location - to address" onClick={() => setActiveTab('tab2')}>
          <ButtonWrapper.Button
            className={`w-full rounded-[0.8rem] py-[0.6rem] px-[1rem] gap-[1rem] font-semibold text-[1.6rem] leading-[2.6rem] ${activeTab === 'tab2' ? 'bg-white shadow-MapTabShadow' : '!bg-background-200'}`}
          >
            내 위치 - 도착지
          </ButtonWrapper.Button>
        </ButtonWrapper>
        <ButtonWrapper id="my location - to address" onClick={() => setActiveTab('tab3')}>
          <ButtonWrapper.Button
            className={`w-full rounded-[0.8rem] py-[0.6rem] px-[1rem] gap-[1rem] font-semibold text-[1.6rem] leading-[2.6rem] ${activeTab === 'tab3' ? 'bg-white shadow-MapTabShadow' : '!bg-background-200'}`}
          >
            출발지 - 도착지
          </ButtonWrapper.Button>
        </ButtonWrapper>
      </div>
      <div className="mt-[2rem]">{renderContent()}</div>
    </div>
  );
}
