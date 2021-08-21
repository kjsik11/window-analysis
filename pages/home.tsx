import NextLink from 'next/link';

// components
import { Button } from '@components/ui';
import { UserLayout } from '@components/layout';

export default function HomePage() {
  return (
    <div className="ml-4 mt-4">
      <NextLink href="/api/signout" passHref>
        <Button as="a">Signout</Button>
      </NextLink>
    </div>
  );
}

HomePage.Layout = UserLayout;