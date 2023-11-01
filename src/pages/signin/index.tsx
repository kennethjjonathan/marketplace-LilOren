import React, { useState } from 'react';
import Image from 'next/image';
import { InputWithLabel } from '@/components/InputWithLabel/InputWithLabel';
import AsyncButton from '@/components/AsyncButton/AsyncButton';
import { LogIn } from 'lucide-react';
import GoogleButton from '@/components/GoogleButton/GoogleButton';
import { GetServerSideProps } from 'next';
import { signIn, getProviders } from 'next-auth/react';
import { LiteralUnion, ClientSafeProvider } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';
import Link from 'next/link';
import axios from 'axios';
import CONSTANTS from '@/constants/constants';

interface SignInPageProps {
  providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>;
}

function SignInPage({ providers }: SignInPageProps) {
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
  });
  const [isDataValid, setIsDataValid] = useState({
    email: true,
    password: true,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegisterData = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    setRegisterData({ ...registerData, [key]: e.target.value });
  };

  const validateEmail = (): boolean => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
    if (!emailRegex.test(registerData.email)) {
      setIsDataValid({ ...isDataValid, email: false });
      return false;
    }
    setIsDataValid({ ...isDataValid, email: true });
    return true;
  };

  const validatePassword = (): boolean => {
    if (registerData.password.length === 0) {
      setIsDataValid({ ...isDataValid, password: false });
      return false;
    }
    setIsDataValid({ ...isDataValid, password: true });
    return true;
  };

  const validateAll = (): boolean => {
    let isContinue: boolean = true;
    if (!validateEmail()) {
      isContinue = false;
    }
    if (!validatePassword()) {
      isContinue = false;
    }
    return isContinue;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${CONSTANTS.BASEURL}/users`,
        registerData,
      );
      console.log('Berhasil');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    if (providers && providers.google) {
      signIn(providers.google.id);
      return;
    }
    return;
  };

  return (
    <section className="bg-gradient-to-t from-[#FF7337] to-[#F99116] flex flex-col justify-center items-center gap-5 sm:min-h-screen sm:py-6 xl:flex-row xl:justify-between xl:gap-10 xl:px-40 xl:items-start xl:py-20">
      <div className="hidden sm:flex flex-col items-center justify-center xl:justify-start xl:min-h-full xl:flex-1 xl:gap-40">
        <h1 className="font-bold text-3xl text-primary-foreground lg:text-4xl xl:w-full xl:text-left">
          LOGO
        </h1>
        <div className="hidden relative w-[424px] h-[424px] xl:block my-auto">
          <Image src={'/google.svg'} alt="Google's logo" fill sizes="40vw" />
        </div>
      </div>
      <div className="container pb-16 pt-6 flex flex-col items-center justify-center gap-5 bg-primary-foreground sm:max-w-lg sm:pb-6 sm:rounded-lg xl:my-auto">
        <h1 className="font-bold text-2xl text-primary sm:hidden">LOGO</h1>
        <div className="rounded-lg w-full flex flex-col items-baseline justify-center">
          <h1 className="font-light text-xl w-full text-left lg:text-2xl">
            Sign In
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
              value={registerData.email}
              onChange={(e) => handleRegisterData(e, 'email')}
              isValid={isDataValid.email}
              onBlur={validateEmail}
              validation="Please put in a valid email"
              required
            />
            <InputWithLabel
              type="password"
              label="Password"
              id="password-input"
              labelStyling="font-light"
              value={registerData.password}
              onChange={(e) => handleRegisterData(e, 'password')}
              isValid={isDataValid.password}
              onBlur={validatePassword}
              validation="Please put in your password"
              required
            />
            <AsyncButton
              className="text-sm lg:text-base"
              type="submit"
              isLoading={isLoading}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </AsyncButton>
          </form>
          <div className="flex items-center w-full justify-between gap-3 mt-2">
            <div className="w-full h-px bg-gray-300" />
            <p className="text-sm text-gray-300 font-normal">OR</p>
            <div className="w-full h-px bg-gray-300" />
          </div>
          <div className="w-full mt-2">
            <GoogleButton onClick={handleGoogleSignIn} />
          </div>
        </div>
        <p className="font-extralight mt-3 w-full text-center text-base lg:text-lg">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-normal underline">
            Register
          </Link>
        </p>
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
