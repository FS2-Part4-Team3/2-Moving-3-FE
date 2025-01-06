import search from "@/../public/assets/common/searchbar/ic_search.svg";
import Image from "next/image";
import { InputWrapper } from "../headless/Input";
import { useState } from "react";

export default function SearchBar() {
  const [value, setValue] = useState<string>("");
  return (
    <div className="md:w-[56rem] sm:w-[26rem] md:h-[6.4rem] sm:w-[32.7rem] rounded-[1.6rem] py-[1.4rem] px-[2.4rem] md:gap-[0.8rem] sm:gap-[0.6rem] flex items-center bg-background-200">
      <Image src={search} alt="search" width={36} height={36} />
      <InputWrapper value={value} onChange={(e) => setValue(e.target.value)}>
        <InputWrapper.Input
          className="w-full font-normal md:text-[2rem] sm:text-[1.4rem] md:leading-[3.2rem] sm:leading-[2.4rem] placeholder:text-gray-400 focus:outline-none bg-background-200"
          placeholder="텍스트를 입력해주세요"
        />
      </InputWrapper>
    </div>
  );
}
