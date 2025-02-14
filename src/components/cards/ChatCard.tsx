import Image from 'next/image';
import profile_default from '@/../public/assets/common/gnb/default_profile.svg';

export default function ChatCard() {
  return (
    <div>
      <div>
        <Image src={profile_default} alt="기본 이미지" width={79.88} height={73.33} />
      </div>
      <div>
        <div>
          <p>김다라 기사님</p>
        </div>
        <p>네~ 이사 당일에 뵈어요~~</p>
      </div>
    </div>
  );
}
