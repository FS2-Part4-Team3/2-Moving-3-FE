import Image from 'next/image';
import emptyHeart from '@/../public/assets/driver/ic_empty_like.svg';
import redHeart from '@/../public/assets/driver/ic_like_on.svg';
import star from '@/../public/assets/driver/ic_star_yellow.svg';
import { DibsDriverPageCardProps } from '@/interfaces/Card/DibsDriverPageCardInterface';
import MovingTypeChips from '../chips/MovingTypeChips';

export default function DibsDriverPageCard({ data }: DibsDriverPageCardProps) {
  return (
    <div>
      <div>
        {data.serviceType.map((item: string) => (
          <MovingTypeChips type={item as 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING' | 'RECEIVED'} />
        ))}
        <div>
          {data.image && <Image src={data.image} alt="profile" width={80} height={80} />}
          <div>
            <div>
              <p>{data.name} 기사님</p>
              <div>
                <Image src={emptyHeart} alt="heart" width={24} height={24} />
                <div>{data.likeCount}</div>
              </div>
            </div>
            <div>
              <div>
                <Image src={star} alt="star" width={24} height={24} />
                <p>{data.rating}</p>
                <p>({data.reviewCount})</p>
              </div>
              <div />
              <div>
                <p>경력</p>
                <p>{data.career}년</p>
              </div>
              <div />
              <div>
                <p>{data.applyCount}건</p>
                <p>확정</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
