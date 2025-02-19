'use client';

import { useQuery } from '@tanstack/react-query';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { getReviewKeyword } from '@/api/AiService';
import { RootState } from '@/store/store';
import Empty from '../common/Empty/Empty';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ReviewAnalysisChartProps {
  reviewAnalysisData: {
    positive: {
      keyword: string;
      count: number;
    }[];
    negative: {
      keyword: string;
      count: number;
    }[];
  };
}

export default function ReviewAnalysisChart({ reviewAnalysisData }: ReviewAnalysisChartProps) {
  const { filter } = useSelector((state: RootState) => state.review);
  const { id } = useSelector((state: RootState) => state.signIn);

  // const {
  //   data: reviewAnalysisData,
  //   isLoading: reviewAnalysisLoading,
  //   isError: reviewAnalysisError,
  // } = useQuery<ReviewAnalysisChartProps>({
  //   queryKey: ['reviewAnalysisData', id, filter],
  //   queryFn: id ? () => getReviewKeyword(id, filter) : async () => ({ positive: [], negative: [] }),
  //   enabled: !!id,
  // });

  // if (!reviewAnalysisData?.positive.length && !reviewAnalysisData?.negative.length)
  //   return (
  //     <div className="w-[75rem] mt-[5rem] items-center justify-center">
  //       <Empty type="Driver" />
  //     </div>
  //   );
  // if (reviewAnalysisLoading) return <p>Loading...</p>;
  // if (reviewAnalysisError) return <p>Error loading data.</p>;

  let positiveLabels: string[] = [];
  let negativeLabels: string[] = [];

  let positiveCounts: number[] = [];
  let negativeCounts: number[] = [];

  let type = filter;

  if (type === 'ALL') {
    // TODO: 백엔드 측에서 수정되면 slice 로직 삭제하기
    const positiveData = reviewAnalysisData.positive.slice(0, 5);
    const negativeData = reviewAnalysisData.negative.slice(0, 5);

    positiveLabels = positiveData.map(item => item.keyword);
    positiveCounts = positiveData.map(item => item.count);

    negativeLabels = negativeData.map(item => item.keyword);
    negativeCounts = negativeData.map(item => item.count);
  } else if (type === 'POSITIVE') {
    positiveLabels = reviewAnalysisData.positive.map(item => item.keyword);
    positiveCounts = reviewAnalysisData.positive.map(item => item.count);
  } else if (type === 'NEGATIVE') {
    negativeLabels = reviewAnalysisData.negative.map(item => item.keyword);
    negativeCounts = reviewAnalysisData.negative.map(item => item.count);
  }

  const positiveChartData = {
    labels: positiveLabels,
    datasets: [
      {
        data: positiveCounts,
        backgroundColor: '#1B92FF',
        borderRadius: 8,
      },
    ],
  };

  const negativeChartData = {
    labels: negativeLabels,
    datasets: [
      {
        data: negativeCounts,
        backgroundColor: '#FF4D4D',
        borderRadius: 8,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        ticks: {
          font: {
            size: 18,
          },
        },
      },
    },
  };

  return (
    <div className="w-[75rem] mx-auto rounded-lg">
      <p className="font-semibold text-[2.4rem] leading-[3.2rem] text-[#2B2B2B] text-blue-600 mb-[1rem] text-center">
        TOP 5 긍정 & 부정 키워드
      </p>
      {type !== 'NEGATIVE' && <Bar data={positiveChartData} options={options} />}
      {type !== 'POSITIVE' && <Bar data={negativeChartData} options={options} />}
    </div>
  );
}
