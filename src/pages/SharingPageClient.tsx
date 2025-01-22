'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import clip from '@/../../public/assets/driver/ic_clip.svg';
import facebook from '@/../../public/assets/driver/ic_facebook.svg';
import kakao from '@/../../public/assets/driver/ic_kakao.svg';

export default function SharingPageClient() {
  const currentUrl = window.location.href;
  useEffect(() => {
    if (!window.Kakao?.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);

  const handleCopyToClipboard = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        const successMessage = document.createElement('div');
        successMessage.innerText = '주소가 복사되었습니다!';
        successMessage.style.position = 'fixed';
        successMessage.style.bottom = '20px';
        successMessage.style.left = '50%';
        successMessage.style.transform = 'translateX(-50%)';
        successMessage.style.padding = '10px 20px';
        successMessage.style.backgroundColor = '#1B92FF';
        successMessage.style.color = 'white';
        successMessage.style.borderRadius = '10px';
        successMessage.style.fontSize = '16px';
        successMessage.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        document.body.appendChild(successMessage);

        setTimeout(() => {
          successMessage.remove();
        }, 3000);
      })
      .catch(() => {
        alert('복사에 실패했습니다. 다시 시도해주세요.');
      });
  };

  const handleShareKakao = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: 'Moving 업체 기사님 공유',
          description: '이 기사님 정말 추천드려요!',
          imageUrl: '공유 이미지 URL',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: '기사님 보러가기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    } else {
      alert('카카오톡 공유를 사용할 수 없습니다.');
    }
  };

  const handleShareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=800');
  };

  return (
    <>
      <Image src={clip} alt="share-clip" width={64} height={64} onClick={handleCopyToClipboard} className="cursor-pointer" />
      <Image src={kakao} alt="share-kakao" width={64} height={64} onClick={handleShareKakao} className="cursor-pointer" />
      <Image
        src={facebook}
        alt="share-facebook"
        width={64}
        height={64}
        onClick={handleShareFacebook}
        className="cursor-pointer"
      />
    </>
  );
}
