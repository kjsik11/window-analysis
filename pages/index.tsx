/**
 * @template PageComponent
 */
import router from 'next/router';
import { useEffect } from 'react';

import Loading from '@components/core/Loading';
import { Button, Link } from '@components/ui';

import { useSession } from '@lib/hooks/use-session';

export default function IndexPage() {
  const { user, loading } = useSession();

  useEffect(() => {
    if (user) router.replace('/home');
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div>
      <header className="sticky top-0 z-20 h-16 w-full bg-gray-200 shadow-md">
        <div className="flex justify-between px-8 items-center h-full">
          <p>로고자리</p>
          <Link href="/signin">
            <Button>Login</Button>
          </Link>
        </div>
      </header>
      <main className="flex justify-center items-center pt-28">대충 설명 들어갈 자리</main>
    </div>
  );
}
