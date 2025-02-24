'use client';

import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getEstimationConfirmedDetail } from '@/api/EstimationService';
import EstimateReceivedCard from '@/components/cards/EstimateReceivedCard';
import EstimateReceivedCardSkeleton from '@/components/skeleton/EstimateReceivedCardSkeleton';
import { RootState } from '@/store/store';

export default function EstimationReceivedCardClient() {
  const estimationId = useSelector((state: RootState) => state.estimation.confirmedEstimationId);

  const {
    data: EstimationReceivedCardData,
    isLoading: EstimationReceivedCardDataIsLoading,
    error: EstimationReceivedCardDataError,
  } = useQuery({
    queryKey: ['EstimationReceivedCardData', estimationId],
    queryFn: estimationId ? () => getEstimationConfirmedDetail(estimationId) : undefined,
  });

  console.log('DATA', EstimationReceivedCardData);

  if (EstimationReceivedCardDataIsLoading) {
    return <EstimateReceivedCardSkeleton />;
  }

  if (EstimationReceivedCardDataError) {
    return <EstimateReceivedCardSkeleton />;
  }

  return <EstimateReceivedCard data={EstimationReceivedCardData} serviceType={EstimationReceivedCardData} isConfirmed={true} />;
}
