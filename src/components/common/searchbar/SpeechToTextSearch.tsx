'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import mike from '@/../public/assets/common/searchbar/ic_mike.svg';
import mike_on from '@/../public/assets/common/searchbar/ic_mike_on.svg';
import { SpeechToTextSearchProps } from '@/interfaces/CommonComp/SearchInterface';

export default function SpeechToTextSearch({ text, setText }: SpeechToTextSearchProps) {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const speechRecognition = new SpeechRecognition();
        speechRecognition.lang = 'ko-KR';
        speechRecognition.continuous = false;
        speechRecognition.interimResults = false;

        speechRecognition.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript;
          setText(transcript);
          setIsListening(false);
        };

        speechRecognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('음성 인식 오류:', event.error);
          setIsListening(false);
        };

        setRecognition(speechRecognition);
      }
    }
  }, []);

  const handleSpeechRecognition = () => {
    if (!recognition) {
      alert('이 브라우저는 음성 인식을 지원하지 않습니다.');
      return;
    }

    if (!isListening) {
      setIsListening(true);
      recognition.start();
    }
  };

  return (
    <div onClick={handleSpeechRecognition} className={`${isListening ? 'cursor-not-allowed' : ''}`}>
      <Image src={isListening ? mike_on : mike} alt="mike" width={32} height={32} />
    </div>
  );
}
