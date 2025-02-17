import MyQuoteWaitingDetailClient from '@/_pages/MyQuoteWaitingDetailClient';

export default async function MyQuoteWaitingDetail({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white lg:w-[140rem] md:w-[60rem] sm:w-[32.7rem]">
        <p className="lg:text-[2.4rem] lg:leading-[3.2rem] sm:text-[1.8rem] sm:leading-[2.6rem] font-semibold text-black-400 lg:py-[3.2rem] sm:py-[1.4rem]">
          견적 상세
        </p>
      </div>
      <MyQuoteWaitingDetailClient id={id} />
    </div>
  );
}
