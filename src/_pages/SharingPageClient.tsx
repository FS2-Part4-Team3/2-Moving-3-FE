'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import clip from '@/../../public/assets/driver/ic_clip.svg';
import facebook from '@/../../public/assets/driver/ic_facebook.svg';
import kakao from '@/../../public/assets/driver/ic_kakao.svg';
import share from '@/../../public/assets/driver/ic_share.svg';
import { SharingPageClientProps } from '@/interfaces/Page/SharingPageClientInterface';

export default function SharingPageClient({ type }: SharingPageClientProps) {
  const [imageSize, setImageSize] = useState(64);

  useEffect(() => {
    const updateImageSize = () => {
      if (window.innerWidth < 1200) {
        setImageSize(40);
      } else {
        setImageSize(64);
      }
    };

    updateImageSize();
    window.addEventListener('resize', updateImageSize);

    return () => {
      window.removeEventListener('resize', updateImageSize);
    };
  }, []);

  const pathname = usePathname();
  const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}${pathname}` : '';

  useEffect(() => {
    if (!window.Kakao?.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);

  const messages = {
    driver: {
      Title: 'Moving 업체 기사님 공유',
      Description: '이 기사님 정말 추천드려요! 지금 확인해 보세요!',
    },
    quoteWaiting: {
      Title: '대기 중인 견적 공유',
      Description: '확정하지 않은 견적을 확인해보세요. 기사님이 기다리고 있어요!',
    },
    quoteRecieved: {
      Title: '받았던 견적 공유',
      Description: '지난번 받은 이사 견적을 다시 확인해보세요.',
    },
    quoteSent: {
      Title: '보낸 견적 공유',
      Description: '고객님께 보냈던 견적을 확인해보세요!',
    },
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        const successMessage = document.createElement('div');
        successMessage.innerText = '주소가 복사되었습니다 !';
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
          title: messages[type].Title,
          description: messages[type].Description,
          imageUrl: '공유 이미지 URL',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: '확인하러 가기',
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

  const handleGeneralShare = () => {
    const title = messages[type].Title;
    const text = messages[type].Description;

    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: text,
          url: currentUrl,
        })
        .then(() => alert('공유가 완료되었습니다!'))
        .catch(err => {
          if (err.name !== 'AbortError') {
            alert('공유에 실패했습니다. 다시 시도해주세요.');
          }
        });
    } else {
      alert('이 브라우저에서는 기본 공유 기능을 지원하지 않습니다.');
    }
  };

  return (
    <>
      <Image
        src={clip}
        alt="share-clip"
        width={imageSize}
        height={imageSize}
        onClick={handleCopyToClipboard}
        className="cursor-pointer"
      />
      <Image
        src={kakao}
        alt="share-kakao"
        width={imageSize}
        height={imageSize}
        onClick={handleShareKakao}
        className="cursor-pointer"
      />
      <Image
        src={facebook}
        alt="share-facebook"
        width={imageSize}
        height={imageSize}
        onClick={handleShareFacebook}
        className="cursor-pointer"
      />
      <Image
        src={share}
        alt="share-normal"
        width={imageSize}
        height={imageSize}
        onClick={handleGeneralShare}
        className="lg:p-[1rem] sm:p-[0.7rem] cursor-pointer border border-gray-100 bg-white lg:rounded-[1.6rem] sm:rounded-[1.1rem]"
      />
    </>
  );
}
