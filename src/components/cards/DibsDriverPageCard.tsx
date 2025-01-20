import Image from 'next/image';
import emptyHeart from '@/../public/assets/driver/ic_empty_like.svg';
import redHeart from '@/../public/assets/driver/ic_like_on.svg';
import star from '@/../public/assets/driver/ic_star_yellow.svg';
import MovingTypeChips from '../chips/MovingTypeChips';

export default function DibsDriverPageCard() {
  return (
    <div>
      <div>
        <MovingTypeChips type="SMALL" />
        <div>
          {/*Driver Image*/}
          <div>
            <div>
              <p>김코드 기사님</p>
              <div>
                <Image src={emptyHeart} alt="heart" width={24} height={24} />
                <div>123</div>
              </div>
            </div>
            <div>
              <div>
                <Image src={star} alt="star" width={24} height={24} />
                <p>5.0</p>
                <p>(178)</p>
              </div>
              <div />
              <div>
                <p>경력</p>
                <p>7년</p>
              </div>
              <div />
              <div>
                <p>334건</p>
                <p>확정</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
