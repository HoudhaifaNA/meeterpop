'use client';
import Image from 'next/image';

import LoginForm from './_components/login-form';

const LoginPage = () => {
  return (
    <main className='p-child py-12'>
      <div className='flex items-center justify-center'>
        <Image src='/logo-icon.png' alt='meeterpop' width={60} height={60} />
      </div>
      <div className='mt-12 flex flex-col items-center justify-center'>
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
