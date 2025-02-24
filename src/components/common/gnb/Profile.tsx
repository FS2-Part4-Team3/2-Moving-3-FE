import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRefresh } from '@/api/UserService';
import { ProfileProps } from '@/interfaces/CommonComp/GnbInterface';
import { setInfoSignOut } from '@/store/slices/InfoSlice';
import { setProfileSignOut } from '@/store/slices/ProfileSlice';
import { setSignOut } from '@/store/slices/SignInSlice';
import { setChatSignOut } from '@/store/slices/chatSlice';
import { setDriverDataInitialization } from '@/store/slices/driversSlice';
import { setDeleteEstimationKeys } from '@/store/slices/estimationSlice';
import { setMovesDataInitialization } from '@/store/slices/movesSlice';
import { RootState } from '@/store/store';

export default function Profile({ closeModal, setNotifications }: ProfileProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.signIn);
  const user_info = useSelector((state: RootState) => state.info);

  const userName = user.name;
  const status = user.type === 'user' ? 'user' : 'driver';

  const signOutMutation = useMutation({
    mutationFn: async () => {
      await deleteRefresh();
      dispatch(setSignOut());
      dispatch(setInfoSignOut());
      dispatch(setProfileSignOut());
      dispatch(setMovesDataInitialization());
      dispatch(setDriverDataInitialization());
      dispatch(setDeleteEstimationKeys());
      dispatch(setChatSignOut());
      setNotifications([]);
      closeModal();
      router.push('/');
    },
    onSuccess: () => {
      alert('로그아웃 되었습니다.');
    },
    onError: () => {
      alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleLogout = async () => {
    signOutMutation.mutate();
  };

  return (
    <div className="bg-white dark:bg-dark-p rounded-[1.6rem] border border-line-200 lg:pt-[1.6rem] sm:pt-[1rem] pb-[0.6rem] lg:px-[0.4rem] sm:px-[0.6rem] shadow-profileShadow dark:shadow">
      <div className="flex flex-col">
        <p className="lg:w-[24rem] sm:w-[14rem] lg:py-[1.4rem] lg:px-[2.4rem] sm:py-[0.8rem] sm:px-[1.2rem] font-bold lg:text-[1.8rem] sm:text-[1.6rem] leading-[2.6rem] text-black-300 dark:text-dark-t">
          {user_info.name || userName} 고객님
        </p>
        <p
          className="lg:w-[24rem] sm:w-[14rem] lg:py-[1.4rem] lg:px-[2.4rem] sm:py-[0.8rem] sm:px-[1.2rem] font-medium lg:text-[1.6rem] sm:text-[1.4rem] leading-[2.6rem] text-black-400 dark:text-dark-t"
          onClick={closeModal}
        >
          <Link href={`/${status === 'user' ? 'normal' : 'driver'}/my-page/edit-profile`}>프로필 수정</Link>
        </p>
        <p
          className="lg:w-[24rem] sm:w-[14rem] lg:py-[1.4rem] lg:px-[2.4rem] sm:py-[0.8rem] sm:px-[1.2rem] font-medium lg:text-[1.6rem] sm:text-[1.4rem] leading-[2.6rem] text-black-400 dark:text-dark-t"
          onClick={closeModal}
        >
          <Link href={`/${status === 'user' ? 'normal/my-page/dibs-driver' : 'driver/my-page/edit-basic-info'}`}>
            {status === 'user' ? '찜한 기사님' : '기본정보 수정'}
          </Link>
        </p>
        <p
          className="lg:w-[24rem] sm:w-[14rem] lg:pt-[1.4rem] lg:pb-[2.4rem] lg:px-[2.4rem] sm:pt-[0.8rem] sm:pb-[1.6rem] sm:px-[1.2rem] font-medium lg:text-[1.6rem] sm:text-[1.4rem] leading-[2.6rem] text-black-400 dark:text-dark-t"
          onClick={closeModal}
        >
          <Link href={`/${status === 'user' ? 'normal/my-page/written-review' : `driver/my-page?id=${user.id}`}`}>
            {status === 'user' ? '이사 리뷰' : '마이페이지'}
          </Link>
        </p>
        <p
          className="border-t border-line-100 lg:pt-[1.4rem] sm:pt-[1.2rem] pb-[0.8rem] lg:px-[2.4rem] sm:px-[1.2rem] flex items-center justify-center font-normal lg:text-[1.6rem] sm:text-[1.2rem] lg:leading-[2.6rem] sm:leading-[1.8rem] text-gray-500 cursor-pointer dark:text-dark-t"
          onClick={handleLogout}
        >
          로그아웃
        </p>
      </div>
    </div>
  );
}
