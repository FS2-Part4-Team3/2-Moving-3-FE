import ReviewChart from "@/components/cards/ReviewChart";

interface DriverDetailPageProps {
  params: { id: string };
}

export default function DriverDetailPage({ params }: DriverDetailPageProps) {
  const { id } = params;

  const driverData = {
    id: id,
    name: "홍길동",
    score: 4.8,
    reviewCount: 8,
    reviews: [
      {
        score: 5,
        createdAt: "2025-01-01",
        owner: "User1",
        comment: "Excellent service!",
      },
      {
        score: 5,
        createdAt: "2025-01-01",
        owner: "User1",
        comment: "Excellent service!",
      },
      {
        score: 5,
        createdAt: "2025-01-01",
        owner: "User1",
        comment: "Excellent service!",
      },
      {
        score: 5,
        createdAt: "2025-01-01",
        owner: "User1",
        comment: "Excellent service!",
      },
      {
        score: 4,
        createdAt: "2025-01-02",
        owner: "User2",
        comment: "Very good!",
      },
      {
        score: 3,
        createdAt: "2025-01-03",
        owner: "User3",
        comment: "Average experience.",
      },
      {
        score: 2,
        createdAt: "2025-01-04",
        owner: "User4",
        comment: "Could be better.",
      },
      {
        score: 1,
        createdAt: "2025-01-05",
        owner: "User5",
        comment: "Poor service.",
      },
    ],
  };

  return (
    <div className="flex flex-col gap-[4rem] w-[95.5rem] h-full">
      <h1 className="text-2xl font-bold">{driverData.name}님 상세 정보</h1>

      <ReviewChart
        data={driverData.reviews}
        score={driverData.score}
        reviewCount={driverData.reviewCount}
      />
    </div>
  );
}
