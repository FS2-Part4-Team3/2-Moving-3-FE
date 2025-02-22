import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { cookie } = await request.json();

  cookies().set({
    name: 'local-access-token',
    value: cookie,
  });

  return Response.json({ success: true });
}
