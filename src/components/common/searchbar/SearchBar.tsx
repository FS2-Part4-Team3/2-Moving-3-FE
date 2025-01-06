import type { SearchBarProps } from "@/interfaces/CommonComp/SearchBarInterface";
import search from "@/../public/assets/common/searchbar/ic_search.svg";
import x from "@/../public/assets/common/searchbar/ic_x_circle.svg";
import Image from "next/image";
import { InputWrapper } from "../headless/Input";
import { useState } from "react";

export default function SearchBar({ type }: SearchBarProps) {
  const [value, setValue] = useState<string>("");
  return (
    <div>
      <Image src={search} alt="search" width={36} height={36} />
      <InputWrapper value={value} onChange={(e) => setValue(e.target.value)}>
        <InputWrapper.Input placeholder="텍스트를 입력해주세요" />
      </InputWrapper>
    </div>
  );
}
