import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileProps } from '@/interfaces/CommonComp/GnbInterface';
import { setSignOut } from '@/store/slices/SignInSlice';
import { RootState } from '@/store/store';

export default function Profile({ closeModal }: ProfileProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.signIn);

  const userName = user.name;
  const status = user.type === 'user' ? 'user' : 'driver';

  const handleLogout = () => {
    dispatch(setSignOut());
    closeModal();
    router.push('/');
  };

  return (
    <div className="bg-white rounded-[1.6rem] border border-line-200 pt-[1.6rem] pb-[0.6rem] px-[0.4rem] shadow-profileShadow">
      <div className="flex flex-col">
        <p className="w-[24rem] py-[1.4rem] px-[2.4rem] font-bold text-[1.8rem] leading-[2.6rem] text-black-300">
          {userName} 고객님
        </p>
        <p
          className="w-[24rem] py-[1.4rem] px-[2.4rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400"
          onClick={closeModal}
        >
          <Link href={`/${status === 'user' ? 'normal' : 'driver'}/my-page/edit-profile`}>프로필 수정</Link>
        </p>
        <p
          className="w-[24rem] py-[1.4rem] px-[2.4rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400"
          onClick={closeModal}
        >
          <Link href={`/${status === 'user' ? 'normal/my-page/dibs-driver' : 'driver/my-page/edit-basic-info'}`}>
            {status === 'user' ? '찜한 기사님' : '기본정보 수정'}
          </Link>
        </p>
        <p
          className="w-[24rem] pt-[1.4rem] pb-[2.4rem] px-[2.4rem] font-medium text-[1.6rem] leading-[2.6rem] text-black-400"
          onClick={closeModal}
        >
          <Link href={`/${status === 'user' ? 'normal/my-page/written-review' : 'driver/my-page'}`}>
            {status === 'user' ? '이사 리뷰' : '마이페이지'}
          </Link>
        </p>
        <p
          className="border-t border-line-100 pt-[1.4rem] pb-[0.8rem] px-[2.4rem] flex items-center justify-center font-normal text-[1.6rem] leading-[2.6rem] text-gray-500 cursor-pointer"
          onClick={handleLogout}
        >
          로그아웃
        </p>
      </div>
    </div>
  );
}
