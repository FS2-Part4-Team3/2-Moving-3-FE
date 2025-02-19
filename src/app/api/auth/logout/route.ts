import { cookies } from 'next/headers';

export async function POST() {
  cookies().delete('local-access-token');

  return Response.json({ success: true });
}
