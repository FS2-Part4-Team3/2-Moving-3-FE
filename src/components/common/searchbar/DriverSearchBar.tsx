'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import search from '@/../public/assets/common/searchbar/ic_search.svg';
import x from '@/../public/assets/common/searchbar/ic_x_circle.svg';
import { setKeyword } from '@/store/slices/movesSlice';
import { InputWrapper } from '../headless/Input';
import SpeechToTextSearch from './SpeechToTextSearch';

export default function DriverSearchBar() {
  const dispatch = useDispatch();

  const [value, setValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(setKeyword(value));
    }
  };

  return (
    <div className="w-full md:h-[6.4rem] rounded-[1.6rem] py-[1.4rem] lg:px-[2.4rem] sm:px-[1.6rem] md:gap-[0.8rem] sm:gap-[0.6rem] flex items-center bg-background-200">
      {!isFocused && (
        <>
          <Image src={search} alt="search" width={36} height={36} className="lg:block sm:hidden" />
          <Image src={search} alt="search" width={24} height={24} className="lg:hidden sm:block" />
        </>
      )}
      <InputWrapper value={value} onChange={e => setValue(e.target.value)}>
        <InputWrapper.Input
          className="w-full font-normal lg:text-[2rem] sm:text-[1.4rem] md:leading-[3.2rem] sm:leading-[2.4rem] placeholder:text-gray-400 focus:outline-none bg-background-200"
          placeholder="어떤 고객님을 찾고 계세요?"
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          onKeyDown={handleKeyDown}
        />
      </InputWrapper>
      {isFocused && (
        <>
          <Image
            src={x}
            alt="x"
            width={36}
            height={36}
            className="lg:block sm:hidden cursor-pointer"
            onMouseDown={e => {
              e.preventDefault();
              setValue('');
            }}
          />
          <Image src={search} alt="search" width={36} height={36} className="lg:block sm:hidden" />
          <Image
            src={x}
            alt="x"
            width={24}
            height={24}
            className="lg:hidden sm:block cursor-pointer"
            onMouseDown={e => {
              e.preventDefault();
              setValue('');
            }}
          />
          <Image src={search} alt="search" width={24} height={24} className="lg:hidden sm:block" />
        </>
      )}
      <SpeechToTextSearch setText={value => setValue(value)} />
    </div>
  );
}
