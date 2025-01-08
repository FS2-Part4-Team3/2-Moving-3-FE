import { ModalWrapper } from "../common/headless/Modal";
import SearchBar from "../common/searchbar/SearchBar";

export default function AddressModal() {
  const handleModalClose = () => {
    return;
  };
  return (
    <ModalWrapper onClose={handleModalClose}>
      <ModalWrapper.Header>출발지를 선택해주세요</ModalWrapper.Header>
      <ModalWrapper.Content>
        <>
          <SearchBar />
          <div className="lg:w-[56rem] rounded-[1.6rem] border border-line-100 bg-white px-[1.6rem] py-[2rem] mt-[2.4rem]">
            <ul className="flex flex-col gap-[1rem]">
              <h1 className="text-[1.6rem] font-semibold text-black-400">
                주소찾기 방법
              </h1>
              <li className="text-[1.6rem] font-normal text-black-400">
                도로명 + 건물번호{" "}
                <span className="text-blue-300">
                  예) 은행로11, 강남대로 422
                </span>
              </li>
              <li className="text-[1.6rem] font-normal text-black-400">
                지역명(동/리) + 번지{" "}
                <span className="text-blue-300">
                  예) 여의도동 15-15, 역삼동 816
                </span>
              </li>
              <li className="text-[1.6rem] font-normal text-black-400">
                지역명(동/리) + 건물명(아파트명){" "}
                <span className="text-blue-300">
                  예) 여의도동 일산빌딩, 하연동 주공
                </span>
              </li>
              <li className="text-[1.6rem] font-normal text-black-400">
                사서함명 + 번호{" "}
                <span className="text-blue-300">
                  예) 영등포우체국사서함 399
                </span>
              </li>
            </ul>
          </div>
        </>
      </ModalWrapper.Content>
      <ModalWrapper.Footer isDisabled>선택완료</ModalWrapper.Footer>
    </ModalWrapper>
  );
}
