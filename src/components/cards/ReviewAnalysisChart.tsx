'use client';

import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ReviewAnalysisChartProps {
  // type: 'ALL' | 'POSITIVE' | 'NEGATIVE';
  data: {
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

export default function ReviewAnalysisChart({ data }: ReviewAnalysisChartProps) {
  let labels: string[] = [];
  let counts: number[] = [];
  let colors: string[] = [];

  let positiveLabels: string[] = [];
  let negativeLabels: string[] = [];

  let positiveCounts: number[] = [];
  let negativeCounts: number[] = [];

  let type = 'ALL';

  if (type === 'ALL') {
    // TODO: 백엔드 측에서 수정되면 slice 로직 삭제하기
    const positiveData = data.positive.slice(0, 5);
    const negativeData = data.negative.slice(0, 5);

    positiveLabels = positiveData.map(item => item.keyword);
    positiveCounts = positiveData.map(item => item.count);

    negativeLabels = negativeData.map(item => item.keyword);
    negativeCounts = negativeData.map(item => item.count);
  } else if (type === 'POSITIVE') {
    positiveLabels = data.positive.map(item => item.keyword);
    positiveCounts = data.positive.map(item => item.count);
  } else if (type === 'NEGATIVE') {
    negativeLabels = data.negative.map(item => item.keyword);
    negativeCounts = data.negative.map(item => item.count);
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
    },
  };

  return (
    <div className="w-[100rem] mx-auto mt-[3rem] bg-white shadow-lg rounded-lg">
      <p className="text-lg font-semibold text-blue-600 mb-2">TOP 5 긍정 & 부정 키워드</p>
      {type !== 'NEGATIVE' && (
        <div>
          <Bar data={positiveChartData} options={options} />
        </div>
      )}
      {type !== 'POSITIVE' && (
        <div>
          <Bar data={negativeChartData} options={options} />
        </div>
      )}
    </div>
  );
}
