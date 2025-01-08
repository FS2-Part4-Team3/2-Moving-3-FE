import { getDriverDetailData } from "@/api/DriverService";
import ReviewChart from "@/components/cards/ReviewChart";
import { notFound } from "next/navigation";

export default async function DriverDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const driverData = await getDriverDetailData(id);

  if (driverData.id !== id || !driverData) {
    notFound();
  }

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
