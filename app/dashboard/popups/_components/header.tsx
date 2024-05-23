'use client';

import useGroupedParams from '@/hooks/useGroupedParams';

const Header = () => {
  const { value } = useGroupedParams();

  return (
    <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
      <span className='text-2xl font-semibold'>Popup editor :</span>
      <span className='text-base'>( {value} )</span>
    </div>
  );
};

export default Header;
