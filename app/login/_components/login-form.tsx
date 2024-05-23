'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { handleRequestError } from '@/lib/utils';
import notify from '@/lib/notify';
import API from '@/lib/API';
import { loginFormSchema } from '@/schemas';
import { LOGIN_DEFAULT_VALUES } from '@/constants';
import { LoginFormValues } from '@/types';

const LoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: LOGIN_DEFAULT_VALUES,
  });

  async function onSubmit({ email }: LoginFormValues) {
    try {
      const res = await API.post('/auth/login', {
        email: email.trim().toLowerCase(),
      });

      notify('success', res.data.message);
    } catch (err) {
      handleRequestError(err);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4 rounded bg-white p-8 shadow-lg md:w-[520px]'
      >
        <h4 className='text-center text-2xl font-semibold'>Login</h4>

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='example@gmail.com' {...field} />
              </FormControl>
              <FormDescription className='!mt-4'>
                If you already have an account it will login, if not it will create one.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={form.formState.isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
