'use client';

import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ReviewAnalysisChartProps {
  type: 'ALL' | 'POSITIVE' | 'NEGATIVE';
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

export default function ReviewAnalysisChart({ type, data }: ReviewAnalysisChartProps) {
  let labels: string[] = [];
  let counts: number[] = [];
  let colors: string[] = [];

  if (type === 'ALL') {
    // TODO: 백엔드 측에서 수정되면 slice 로직 삭제하기
    const positiveData = data.positive.slice(0, 5);
    const negativeData = data.negative.slice(0, 5);

    labels = [...positiveData.map(item => item.keyword), ...negativeData.map(item => item.keyword)];
    counts = [...positiveData.map(item => item.count), ...negativeData.map(item => item.count)];
    colors = [...Array(positiveData.length).fill('#1B92FF'), ...Array(negativeData.length).fill('#FF4D4D')];
  } else if (type === 'POSITIVE') {
    labels = data.positive.map(item => item.keyword);
    counts = data.positive.map(item => item.count);
    colors = Array(data.positive.length).fill('#1B92FF');
  } else if (type === 'NEGATIVE') {
    labels = data.negative.map(item => item.keyword);
    counts = data.negative.map(item => item.count);
    colors = Array(data.negative.length).fill('#FF4D4D');
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Keyword Frequency',
        data: counts,
        backgroundColor: colors,
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
        text:
          type === 'ALL'
            ? 'Top 5 Positive & Negative Keywords'
            : type === 'POSITIVE'
              ? 'Top Positive Keywords'
              : 'Top Negative Keywords',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full mx-auto p-4 bg-white shadow-lg rounded-lg">
      <Bar data={chartData} options={options} />
    </div>
  );
}
