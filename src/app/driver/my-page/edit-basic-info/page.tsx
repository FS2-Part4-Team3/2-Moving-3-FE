import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import InfoEditForDriver from '@/_pages/InfoEditForDiver';
import { getAuthIsLoggedIn } from '@/api/UserService';

export default async function InfoEditForDriverPage() {
  const cookieStore = await cookies();
  // const accessToken = cookieStore.has('accessToken');
  const getAll = cookieStore.getAll();
  console.log('ACCESS TOKEN', getAll, 'END');

  const loggedInUser = await getAuthIsLoggedIn();
  revalidatePath('/driver/my-page/edit-basic-info');

  console.log('page', loggedInUser);

  if (loggedInUser?.userType) {
    if (loggedInUser.userType === 'user') {
      redirect('/normal/my-page/edit');
    }
    if (!loggedInUser.isAccessTokenValid) {
      redirect('/normal/sign-in');
    }
  }

  return (
    <div>
      <InfoEditForDriver />
    </div>
  );
}
