'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import search from '@/../public/assets/common/searchbar/ic_search.svg';
import x from '@/../public/assets/common/searchbar/ic_x_circle.svg';
import { setKeyword } from '@/store/slices/driversSlice';
import { InputWrapper } from '../headless/Input';
import SpeechToTextSearch from './SpeechToTextSearch';

export default function SearchBar() {
  const dispatch = useDispatch();

  const [value, setValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    dispatch(setKeyword(newValue));
  };

  return (
    <div className="w-full md:h-[6.4rem] rounded-[1.6rem] py-[1.4rem] lg:px-[2.4rem] sm:px-[1.6rem] md:gap-[0.8rem] sm:gap-[0.6rem] flex items-center bg-background-200">
      {!isFocused && (
        <>
          <Image src={search} alt="search" width={36} height={36} className="lg:block sm:hidden" />
          <Image src={search} alt="search" width={24} height={24} className="lg:hidden sm:block" />
        </>
      )}
      <InputWrapper value={value} onChange={handleChange}>
        <InputWrapper.Input
          className="w-full font-normal lg:text-[2rem] sm:text-[1.4rem] md:leading-[3.2rem] sm:leading-[2.4rem] placeholder:text-gray-400 focus:outline-none bg-background-200 text-black-400"
          placeholder="텍스트를 입력해주세요"
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
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
              dispatch(setKeyword(''));
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
              dispatch(setKeyword(''));
            }}
          />
          <Image src={search} alt="search" width={24} height={24} className="lg:hidden sm:block" />
        </>
      )}
      <SpeechToTextSearch setText={value => setValue(value)} />
    </div>
  );
}
