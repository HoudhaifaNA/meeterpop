import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main>
      <section className='p-child flex flex-col items-center gap-8 py-12'>
        <div className='flex flex-col gap-8 text-center sm:w-[75%]'>
          <h1 className='text-3xl font-bold leading-relaxed sm:text-4xl lg:text-6xl lg:leading-snug '>
            Start making money with the best <span className='text-cyan-600'>PainCall</span> service you will pop up
            with.
          </h1>
          <p className='text-base leading-relaxed sm:text-lg md:text-xl'>
            A great way to attract customers with our software that is easy to use and very customizable to your needs.
          </p>
        </div>

        <Button asChild className='w-max'>
          <Link href='/login'>Start poping</Link>
        </Button>
      </section>
      <section className='p-child flex flex-col items-center gap-20 bg-cyan-900 py-12'>
        <h4 className='text-center text-lg font-semibold text-white'>Two steps, One minute, More customers.</h4>

        <div className='flex flex-col items-center justify-center gap-12 md:flex-row lg:gap-20'>
          <div className='flex flex-col items-center justify-center gap-4 text-center text-white'>
            <div className='flex h-12 w-12 items-center justify-center rounded bg-white text-xl font-semibold text-cyan-600'>
              1
            </div>
            <p className='text-base'>Add customizable popups with your website domains</p>
          </div>
          <div className='flex flex-col items-center justify-center gap-4 text-center text-white'>
            <div className='flex h-12 w-12 items-center justify-center rounded bg-white text-xl font-semibold text-cyan-600'>
              2
            </div>
            <p className='text-base'>Add the script to your website and you are done</p>
          </div>
        </div>
      </section>
    </main>
  );
}
