'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMoveDetailData, getMoveInfoEditability } from '@/api/MovesService';
import { ButtonWrapper } from '@/components/common/headless/Button';
import { ModalWrapper } from '@/components/common/headless/Modal';
import MyQuoteEditToast from '@/components/toasts/MyQuoteEditToast';
import { setMoveInfoId } from '@/store/slices/SignInSlice';
import { RootState } from '@/store/store';

export default function MyQuoteEditClient() {
  const dispatch = useDispatch();
  const moveInfoId = useSelector((state: RootState) => state.signIn.moveInfoId);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [editStatus, setEditStatus] = useState<boolean>(false);

  useEffect(() => {
    if (moveInfoId) {
      const getData = async () => {
        try {
          const data = await getMoveInfoEditability(moveInfoId);
          setEditStatus(data.isMoveInfoEditable);
        } catch (error) {
          alert('문제가 발생했습니다. 다시 시도해주세요.');
        }
      };

      getData();
    }
  }, [moveInfoId]);

  const deleteData = async () => {
    try {
      await deleteMoveDetailData(moveInfoId);
      alert('삭제 완료되었습니다.');
      dispatch(setMoveInfoId(''));
      handleCloseModal();
    } catch (error) {
      alert('문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const router = useRouter();

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="w-full flex items-center lg:gap-[1.1rem] sm:gap-[1.6rem] md:flex-row sm:flex-col">
        <ButtonWrapper
          id="edit-quotation"
          onClick={() => (editStatus ? router.push('/normal/request-quote?edit=true') : handleShowToast)}
        >
          <ButtonWrapper.Button
            className="w-full lg:h-[6.4rem] sm:h-[4.8rem] lg:rounded-[1.6rem] sm:rounded-[0.8rem] p-[1.6rem] flex items-center justify-center font-semibold lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.6rem] sm:leading-[2.6rem] text-white"
            disabled={!moveInfoId}
          >
            견적서 수정하기
          </ButtonWrapper.Button>
        </ButtonWrapper>
        <ButtonWrapper id="delete-quotation" onClick={handleShowModal}>
          <ButtonWrapper.Button
            className="w-full lg:h-[6.4rem] sm:h-[4.8rem] lg:rounded-[1.6rem] sm:rounded-[0.8rem] py-[1.6rem] px-[2.4rem] flex items-center justify-center border border-blue-300 bg-white font-semibold lg:text-[2rem] lg:leading-[3.2rem] sm:text-[1.6rem] sm:leading-[2.6rem] text-blue-300"
            disabled={!moveInfoId}
          >
            견적서 삭제하기
          </ButtonWrapper.Button>
        </ButtonWrapper>
      </div>
      {showToast && <MyQuoteEditToast onClose={handleCloseToast} />}
      {showModal && (
        <div>
          <div>
            <ModalWrapper onClose={handleCloseModal}>
              <ModalWrapper.Header>견적 삭제하기</ModalWrapper.Header>
              <ModalWrapper.Content>
                <p className="font-semibold lg:text-[2.4rem] lg:leading-[3.2rem] sm:text-[1.6rem] sm:leading-[2.6rem] text-black-300 flex items-center justify-center">
                  정말 삭제하시겠습니까?
                </p>
              </ModalWrapper.Content>
              <ModalWrapper.Footer isDisabled={false} onClick={deleteData}>
                견적 삭제하기
              </ModalWrapper.Footer>
            </ModalWrapper>
          </div>
        </div>
      )}
    </>
  );
}
