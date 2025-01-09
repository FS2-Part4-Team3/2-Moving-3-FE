'use client';

import { useEffect, useState } from 'react';
import { getAddressData } from '@/api/AddressService';
import { type AddressData, type AddressModalProps } from '@/interfaces/Modal/AddressModalInterface';
import { ModalWrapper } from '../common/headless/Modal';
import SearchBar from '../common/searchbar/SearchBar';

export default function AddressModal({ handleModalClose, isArrivalModalOpen, isStartModalOpen, setRegions }: AddressModalProps) {
  const [addressData, setAddressData] = useState<AddressData[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState<AddressData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAddressData();
      setAddressData(data);
    };
    fetchData();
    if (searchValue.trim() === '') {
      setFilteredData([]);
    }
  }, [searchValue]);

  const handleSearch = () => {
    if (searchValue.trim() === '') {
      setFilteredData([]);
    } else {
      const filtered = addressData.filter(address => address.loadName.includes(searchValue));
      setFilteredData(filtered);
    }
  };

  const handleClick = (address: AddressData) => {
    if (isStartModalOpen) {
      setRegions(prevState => ({ ...prevState, start: address.regionName }));
    }
    if (isArrivalModalOpen) {
      setRegions(prevState => ({ ...prevState, arrival: address.regionName }));
    }
    handleModalClose();
  };

  return (
    <ModalWrapper onClose={handleModalClose}>
      <ModalWrapper.Header>
        {isStartModalOpen ? '출발지를 선택해주세요' : isArrivalModalOpen ? '도착지를 선택해주세요' : ''}
      </ModalWrapper.Header>
      <ModalWrapper.Content>
        <>
          <SearchBar value={searchValue} setValue={setSearchValue} handleSearch={handleSearch} />
          <div className="lg:w-[56rem] rounded-[1.6rem] border border-line-100 bg-white px-[1.6rem] py-[2rem] mt-[2.4rem] flex flex-col gap-[1.8rem]">
            {filteredData.length > 0 && searchValue ? (
              filteredData.map((address, index) => (
                <div
                  key={address.id}
                  onClick={() => handleClick(address)}
                  className={`cursor-pointer flex flex-col gap-[1.6rem] ${index === filteredData.length - 1 ? '' : 'border-b-[0.5rem] border-blue-100'} pb-[1.2rem]`}
                >
                  <h1 className="text-[1.6rem] font-semibold text-black-400">{address.postNumber}</h1>
                  <div className="flex items-center gap-[0.8rem]">
                    <div className="w-[5.4rem] h-[2.8rem] rounded-[1.6rem] px-[0.4rem] py-[0.2rem] bg-blue-100 text-[1.4rem] font-semibold text-blue-300 text-center">
                      도로명
                    </div>
                    <span className="text-[1.6rem] font-normal text-black-400">{address.loadName}</span>
                  </div>
                  <div className="flex items-center gap-[0.8rem]">
                    <div className="w-[5.4rem] h-[2.8rem] rounded-[1.6rem] px-[0.4rem] py-[0.2rem] bg-blue-100 text-[1.4rem] font-semibold text-blue-300 text-center">
                      지명
                    </div>
                    <span className="text-[1.6rem] font-normal text-black-400">{address.regionName}</span>
                  </div>
                </div>
              ))
            ) : (
              <ul className="flex flex-col gap-[1rem]">
                <h1 className="text-[1.6rem] font-semibold text-black-400">주소찾기 방법</h1>
                <li className="text-[1.6rem] font-normal text-black-400">
                  도로명 + 건물번호 <span className="text-blue-300">예) 은행로11, 강남대로 422</span>
                </li>
                <li className="text-[1.6rem] font-normal text-black-400">
                  지역명(동/리) + 번지 <span className="text-blue-300">예) 여의도동 15-15, 역삼동 816</span>
                </li>
                <li className="text-[1.6rem] font-normal text-black-400">
                  지역명(동/리) + 건물명(아파트명) <span className="text-blue-300">예) 여의도동 일산빌딩, 하연동 주공</span>
                </li>
                <li className="text-[1.6rem] font-normal text-black-400">
                  사서함명 + 번호 <span className="text-blue-300">예) 영등포우체국사서함 399</span>
                </li>
              </ul>
            )}
          </div>
        </>
      </ModalWrapper.Content>
      <ModalWrapper.Footer isDisabled>선택완료</ModalWrapper.Footer>
    </ModalWrapper>
  );
}
