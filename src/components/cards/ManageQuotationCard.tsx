import type { ManageQuotationCardProps } from '@/interfaces/Card/ManageQuotationCardInterface';
import AddressFormat, { DateFormat, priceFormat, timeAgoFormat } from '@/utils/Format';
import MovingTypeChips from '../chips/MovingTypeChips';

export default function ManageQuotationCard({ data }: ManageQuotationCardProps) {
  return (
    <div>
      <div>
        <div>
          <div>
            <p>견적 확정</p>
            <MovingTypeChips type={data.moveInfo.type} />
          </div>
          <p>{timeAgoFormat(data.updatedAt)}</p>
        </div>
        <div>
          <p>{data.moveInfo.owner} 고객님</p>
          <div />
          <div>
            <div>
              <p>이사일</p>
              <p>{DateFormat(data.moveInfo.date)}</p>
            </div>
            <div>
              <p>출발</p>
              <p>{AddressFormat(data.moveInfo.fromAddress)}</p>
            </div>
            <div>
              <p>도착</p>
              <p>{AddressFormat(data.moveInfo.toAddress)}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p>견적 금액</p>
        <p>{priceFormat(data.price)}</p>
      </div>
    </div>
  );
}
