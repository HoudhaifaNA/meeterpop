import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { Button } from '../ui/button';
import useLoggedIn from '@/hooks/useLoggedIn';
import { MAIN_LINKS, LOGGED_IN_LINKS } from '@/constants';

const HeaderList = () => {
  const { data } = useLoggedIn();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isAuthenticated = data?.user;
  const headerLinks = isAuthenticated ? LOGGED_IN_LINKS : MAIN_LINKS;
  const btnLink = isAuthenticated ? '/api/auth/logout' : '/login';
  const btnText = isAuthenticated ? 'Logout' : 'Start poping';

  useEffect(() => {
    const bodyStyle = document.body.style;
    if (isMenuOpen && document) {
      bodyStyle.overflow = 'hidden';
    } else {
      bodyStyle.overflow = 'auto';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const renderBurgerMenu = () => {
    const generatedLines = Array.from({ length: 3 });

    return (
      <button
        onClick={toggleMenu}
        className='absolute right-4 top-8 z-50 h-6 w-6 cursor-pointer space-y-1 focus:outline-none md:hidden'
      >
        {generatedLines.map((_, index) => {
          const style = {
            'h-1 w-[100%] cursor-pointer space-x-4 bg-black transition-all': true,
            'translate-y-[7px] rotate-45': index == 0 && isMenuOpen,
            'opacity-0': index == 1 && isMenuOpen,
            'translate-y-[-9px] -rotate-45': index == 2 && isMenuOpen,
          };

          return <div key={index} className={clsx(style)} />;
        })}
      </button>
    );
  };

  return (
    <div className='flex-1'>
      {renderBurgerMenu()}
      <ul
        className={clsx(
          'items-center gap-8 overflow-y-auto bg-cyan-50 pb-40 md:relative md:top-0 md:flex md:h-auto md:w-auto md:flex-row md:justify-end md:p-0',
          isMenuOpen ? 'fixed left-0 top-24 flex h-full w-full flex-col pt-8' : 'hidden'
        )}
      >
        {headerLinks.map(({ link, title }, ind) => {
          const isActiveLink = link === pathname;

          return (
            <li className={clsx('py-2 font-medium', isActiveLink && 'border-b-2 border-b-cyan-600')} key={ind}>
              <Link href={link}>{title}</Link>
            </li>
          );
        })}

        <Button asChild>
          <li>
            <Link href={btnLink}>{btnText}</Link>
          </li>
        </Button>
      </ul>
    </div>
  );
};

export default HeaderList;
