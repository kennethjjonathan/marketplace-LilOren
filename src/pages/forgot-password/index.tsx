import AsyncButton from '@/components/AsyncButton/AsyncButton';
import { InputWithLabel } from '@/components/InputWithLabel/InputWithLabel';
import { authClient } from '@/service/auth/AuthClient';
import { Utils } from '@/utils';
import { GetServerSideProps } from 'next';
import { getProviders } from 'next-auth/react';
import Image from 'next/image';
import { FormEventHandler, PropsWithoutRef, useState } from 'react';
import { ToastContent } from 'react-toastify';

function SignInPage({}: PropsWithoutRef<Record<string, unknown>>) {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await authClient
      .requestResetPassword({
        email,
      })
      .then((res) => {
        Utils.notify(
          'Request has been sent. Kindly check your email inbox.' as ToastContent,
          'success',
          'colored',
        );
        setEmail('');
      })
      .catch((err) => {
        Utils.notify(err.message as ToastContent, 'error', 'colored');
      });

    setLoading(false);
  };

  return (
    <section className="bg-gradient-to-t from-[#FF7337] to-[#F99116] flex flex-col justify-center items-center gap-5 sm:min-h-screen sm:py-6 xl:flex-row xl:justify-between xl:gap-10 xl:px-40 xl:items-start xl:py-20">
      <div className="hidden sm:flex flex-col items-center justify-center xl:justify-start xl:min-h-full xl:flex-1 xl:gap-40">
        <h1 className="font-bold text-3xl text-primary-foreground lg:text-4xl xl:w-full xl:text-left">
          LilOren
        </h1>
        <div className="hidden relative aspect-square w-[470px] xl:block">
          <Image src={'/Logo_.svg'} alt="Google's logo" fill sizes="40vw" />
        </div>
      </div>
      <div className="container pb-16 pt-6 flex flex-col items-center justify-center gap-5 bg-primary-foreground sm:max-w-lg sm:pb-6 sm:rounded-lg xl:my-auto">
        <h1 className="font-bold text-2xl text-primary sm:hidden">LilOren</h1>
        <div className="rounded-lg w-full flex flex-col items-baseline justify-center">
          <h1 className="font-light text-xl w-full text-left lg:text-2xl">
            Reset Password Code Request
          </h1>
          <form
            className="mt-5 flex flex-col gap-3 w-full"
            onSubmit={handleSubmit}
          >
            <InputWithLabel
              type="email"
              label="Email"
              id="email-input"
              labelStyling="font-light"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              required
            />
            <AsyncButton className="text-sm lg:text-base" type="submit">
              Request
            </AsyncButton>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignInPage;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      providers: await getProviders(),
    },
  };
};
