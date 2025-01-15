'use client';

import { getEstimationData } from '@/api/DriverService';
import EstimationInformationCard from '@/components/cards/EstimateInformationCard';
import { ButtonWrapper } from '@/components/common/headless/Button';

export default async function MyQuoteEdit() {
  const moveInfoData = await getEstimationData();
  console.log(moveInfoData[0]);
  return (
    <div>
      <div>
        <EstimationInformationCard data={moveInfoData[0]} />
        <div>
          <p>견적서 수정하기</p>
          <div>
            <ButtonWrapper id="edit-quotation">
              <ButtonWrapper.Button>견적서 수정하기</ButtonWrapper.Button>
            </ButtonWrapper>
            <ButtonWrapper id="delete-quotation">
              <ButtonWrapper.Button>견적서 삭제하기</ButtonWrapper.Button>
            </ButtonWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
