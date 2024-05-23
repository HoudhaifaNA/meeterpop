'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import API from '@/lib/API';
import notify from '@/lib/notify';
import useMutate from '@/hooks/useMutate';
import { copyScript, handleRequestError } from '@/lib/utils';
import useTimingSetter from '@/hooks/useTimingSetter';
import useGroupedParams from '@/hooks/useGroupedParams';
import { timingFormSchema } from '@/schemas';
import { TIMING_FORM_DEFAULT_VALUES } from '@/constants';
import { TimingFormValues } from '@/types';

const TimingForm = () => {
  const { refresh } = useMutate();
  const [isCoppied, setCoppied] = useState(false);
  const { isDomain, value } = useGroupedParams();

  const form = useForm<TimingFormValues>({
    resolver: zodResolver(timingFormSchema),
    defaultValues: TIMING_FORM_DEFAULT_VALUES,
    disabled: !isDomain,
  });

  useTimingSetter(form.setValue);

  useEffect(() => {
    setTimeout(() => {
      setCoppied(false);
    }, 1000);
  }, [isCoppied]);

  async function onSubmit(values: TimingFormValues) {
    if (isDomain) {
      try {
        const res = await API.patch(`/domains/${value}`, values);

        notify('success', res.data.message);
        refresh(/^\/domains/);
        refresh(/^\/popups/);
      } catch (err) {
        handleRequestError(err);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={clsx('flex flex-col gap-4 rounded bg-white px-6 py-4 lg:w-2/5', !isDomain && 'opacity-80')}
      >
        <h4 className='text-xl font-semibold'>Time settings :</h4>
        <FormField
          control={form.control}
          name='startingTime'
          render={({ field: { onChange, ...restField } }) => (
            <FormItem>
              <FormLabel>Start popup after (ms) :</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='1000'
                  onChange={(e) => onChange(e.target.valueAsNumber)}
                  {...restField}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='intervalTime'
          render={({ field: { onChange, ...restField } }) => (
            <FormItem>
              <FormLabel>Show another popup every (ms) :</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='1000'
                  onChange={(e) => onChange(e.target.valueAsNumber)}
                  {...restField}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='endTime'
          render={({ field: { onChange, ...restField } }) => (
            <FormItem>
              <FormLabel>Hide popup after (ms) :</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='4000'
                  onChange={(e) => onChange(e.target.valueAsNumber)}
                  {...restField}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={!isDomain}>
          Save
        </Button>

        {isDomain && (
          <div className='flex max-w-full flex-col gap-4'>
            <span className='text-base font-semibold'>Click to copy to clipboard</span>
            <code
              className='h-32 max-w-full cursor-pointer overflow-x-auto rounded bg-blue-950 p-4 text-white'
              onClick={() => {
                if (!isCoppied) {
                  setCoppied(copyScript());
                }
              }}
            >
              {isCoppied ? 'Copied' : `<script src="${location.origin}/js/script.js"></script>`}
            </code>
          </div>
        )}
      </form>
    </Form>
  );
};

export default TimingForm;
