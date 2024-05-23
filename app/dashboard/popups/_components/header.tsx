'use client';

import useGroupedParams from '@/hooks/useGroupedParams';

const Header = () => {
  const { value } = useGroupedParams();

  return (
    <h1 className='text-2xl font-semibold'>
      Popup editor : <span className='text-base'>( {value} )</span>
    </h1>
  );
};

export default Header;
