export default function WaitingQuoteTab() {
  return (
    <div className="flex gap-[3.2rem] pt-[1.6rem]">
      <div className="border-b-2 border-black-400">
        <p className="font-semibold text-[2rem] leading-[3.2rem] text-[#2B2B2B]">대기 중인 견적</p>
      </div>
      <div className="border-b-2 border-black-400">
        <p className="font-semibold text-[2rem] leading-[3.2rem] text-[#2B2B2B]">받았던 견적</p>
      </div>
    </div>
  );
}
