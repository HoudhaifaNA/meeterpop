'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import HeaderList from './header-list';

const Header = () => {
  const hasRendered = useRef(false);
  const pathname = usePathname();
  const [windowWidth, setWindowWidth] = useState<number>();

  const isSmallDevice = windowWidth && windowWidth < 400;
  const isLoginPage = pathname === '/login';

  const logoImgProps = {
    src: '/logo' + (isSmallDevice ? '-icon.png' : '.png'),
    width: isSmallDevice ? 50 : 164,
    height: isSmallDevice ? 50 : 32,
  };

  useEffect(() => {
    hasRendered.current = true;
  }, []);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const onWindowWidthChange = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', onWindowWidthChange);

    return () => window.removeEventListener('resize', onWindowWidthChange);
  }, [hasRendered]);

  return (
    <>
      {!isLoginPage && (
        <header className='p-child fixed left-0 top-0 z-50 flex h-24 w-full items-center justify-between border-b border-black/15 bg-cyan-50'>
          <Link href='/'>
            <Image {...logoImgProps} alt='meeterpop logo' />
          </Link>
          <HeaderList />
        </header>
      )}
    </>
  );
};

export default Header;
