/**
 * @template PageComponent
 */
import cn from 'classnames';
import NextImage from 'next/image';
import NextLink from 'next/link';
import router from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import logoList from 'logoList.json';

import Loading from '@components/core/Loading';
import { Button, Link } from '@components/ui';

import { useSession } from '@lib/hooks/use-session';

export default function IndexPage() {
  const [sliderWidth, setSliderWidth] = useState<[number, number]>([3000, 3000]);

  const { user, loading } = useSession();

  const handleSlider = useCallback(() => {
    const sliderElems = document.getElementsByClassName('slider');

    if (sliderElems.length === 2) {
      setSliderWidth([sliderElems[0].scrollWidth, sliderElems[1].scrollWidth]);
    }
  }, []);

  useEffect(() => {
    handleSlider();
  }, [handleSlider]);

  useEffect(() => {
    if (user) router.replace('/analysis');
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div className="overflow-x-hidden h-full">
      <header className="sticky top-0 z-20 h-16 w-full bg-white shadow-md">
        <div className="flex justify-between px-8 items-center h-full">
          <NextImage width={201} height={64} src="/images/logo.png" objectFit="contain" />

          <Link href="/signin">
            <Button>Login</Button>
          </Link>
        </div>
      </header>
      <main className="flex flex-col justify-around h-full">
        <section className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl space-y-2">
              <p className="block">JBU GRADUATION PROJECT</p>
              <p className="block text-indigo-600">Window Artifacts Analysis</p>
            </h1>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <NextLink passHref href="/signin">
                <Button className="px-8 py-3" as="a">
                  Get started
                </Button>
              </NextLink>
            </div>
          </div>
        </section>
        <div
          onLoad={() => {
            handleSlider();
          }}
          className="my-12 space-y-8 md:mt-20 lg:space-y-16 lg:mt-32 lg:mb-24"
        >
          {logoList.map((array, index) => (
            <div
              style={{ width: sliderWidth[index] }}
              className={cn('slider inline-flex items-center flex-1 space-x-12', {
                'slider-left': index === 0,
                'slider-left2': index === 1,
              })}
              key={`slider-items-${index}`}
            >
              {[...array, ...array].map((logo, idx) => (
                <div key={`slider-item-row-${index}-${idx}`} className="relative flex-shrink-0">
                  {/*eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="object-contain h-20 lg:h-24"
                    alt={`logo-images-${logo}`}
                    src={`/images/logos/${index + 1}/${logo}`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
