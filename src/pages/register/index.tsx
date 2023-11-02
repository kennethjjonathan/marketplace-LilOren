import { InputWithLabel } from '@/components/InputWithLabel/InputWithLabel';
import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import AsyncButton from '@/components/AsyncButton/AsyncButton';
import axios from 'axios';
import CONSTANTS from '@/constants/constants';
import { signIn, getProviders, getCsrfToken } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { LiteralUnion, ClientSafeProvider } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';
import GoogleButton from '@/components/GoogleButton/GoogleButton';
import Link from 'next/link';
import Image from 'next/image';

interface RegisterProps {
  providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>;
}

function Register({ providers }: RegisterProps) {
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isDataValid, setIsDataValid] = useState({
    username: true,
    email: true,
    password: true,
    confirmPassword: true,
  });
  const [passwordMessage, setPasswordMessage] = useState<string>('');

  const handleRegisterData = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    setRegisterData({ ...registerData, [key]: e.target.value });
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateUsername = (): boolean => {
    const usernameRegex = /[a-zA-Z0-9]{3,}/gi;
    if (!usernameRegex.test(registerData.username)) {
      setIsDataValid({ ...isDataValid, username: false });
      return false;
    }
    setIsDataValid({ ...isDataValid, username: true });
    return true;
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
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!passwordRegex.test(registerData.password)) {
      setIsDataValid({ ...isDataValid, password: false });
      setPasswordMessage(
        'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and with a minimum of 8 characters',
      );
      return false;
    }
    if (
      registerData.password
        .toLowerCase()
        .includes(registerData.username.toLowerCase())
    ) {
      setIsDataValid({ ...isDataValid, password: false });
      setPasswordMessage('Password cannot contain username');
      return false;
    }
    setIsDataValid({ ...isDataValid, password: true });
    setPasswordMessage('');
    return true;
  };

  const validateConfirmPassword = (): boolean => {
    if (registerData.password !== registerData.confirmPassword) {
      setIsDataValid({ ...isDataValid, confirmPassword: false });
      return false;
    }
    setIsDataValid({ ...isDataValid, confirmPassword: true });
    return true;
  };

  const validateAll = (): boolean => {
    let isContinue: boolean = true;
    if (!validateUsername()) {
      isContinue = false;
    }
    if (!validateEmail()) {
      isContinue = false;
    }
    if (!validatePassword()) {
      isContinue = false;
    }
    if (!validateConfirmPassword()) {
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

  return (
    <section className="bg-gradient-to-t from-[#FF7337] to-[#F99116] flex flex-col justify-center items-center gap-5 sm:min-h-screen sm:py-6 xl:flex-row xl:justify-between xl:gap-10 xl:px-40 xl:items-start xl:py-20">
      <div className="hidden sm:flex flex-col items-center justify-center xl:justify-start xl:min-h-full xl:flex-1 xl:gap-40">
        <h1 className="font-bold text-3xl text-primary-foreground lg:text-4xl xl:w-full xl:text-left">
          LOGO
        </h1>
        <div className="hidden relative w-[424px] h-[424px] xl:block">
          <Image src={'/google.svg'} alt="Google's logo" fill sizes="40vw" />
        </div>
      </div>
      <div className="container pb-16 pt-6 flex flex-col items-center justify-center gap-5 bg-primary-foreground sm:max-w-lg sm:pb-6 sm:rounded-lg xl:my-auto">
        <h1 className="font-bold text-2xl text-primary sm:hidden">LOGO</h1>
        <div className="rounded-lg w-full flex flex-col items-baseline justify-center">
          <h1 className="font-light text-xl w-full text-left lg:text-2xl">
            Register
          </h1>
          <p className="font-light text-sm w-full text-justify mt-2 lg:text-base">
            By creating an account with us, you will be able to move through the
            checkout process faster, view and track your orders in your account
            and more.
          </p>
          <form
            className="mt-5 flex flex-col gap-3 w-full"
            onSubmit={handleSubmit}
          >
            <InputWithLabel
              type="text"
              label="Username"
              id="username-input"
              value={registerData.username}
              labelStyling="font-light"
              onChange={(e) => handleRegisterData(e, 'username')}
              onBlur={validateUsername}
              isValid={isDataValid.username}
              validation="Must consist of 3 alphanumeric characters minimum"
            />
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
            />
            <InputWithLabel
              type="password"
              label="Password"
              id="password-input"
              labelStyling="font-light"
              value={registerData.password}
              onBlur={validatePassword}
              onChange={(e) => handleRegisterData(e, 'password')}
              isValid={isDataValid.password}
              validation={passwordMessage}
            />
            <InputWithLabel
              type="password"
              label="Confirm Password"
              id="confirm-password-input"
              labelStyling="font-light"
              value={registerData.confirmPassword}
              onChange={(e) => handleRegisterData(e, 'confirmPassword')}
              onBlur={validateConfirmPassword}
              isValid={isDataValid.confirmPassword}
              validation="Must be the same with password"
            />
            <AsyncButton
              className="text-sm lg:text-base"
              type="submit"
              isLoading={isLoading}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Register
            </AsyncButton>
          </form>
          <div className="flex items-center w-full justify-between gap-3 mt-2">
            <div className="w-full h-px bg-gray-300" />
            <p className="text-sm text-gray-300 font-normal">OR</p>
            <div className="w-full h-px bg-gray-300" />
          </div>
          <div className="w-full mt-2">
            <GoogleButton onClick={() => signIn(providers.google.id)} />
          </div>
        </div>
        <p className="font-extralight mt-3 w-full text-center text-base lg:text-lg">
          Already have an account?{' '}
          <Link href="/signin" className="font-normal underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      providers: await getProviders(),
    },
  };
};
