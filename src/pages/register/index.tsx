import { InputWithLabel } from '@/components/inputWithLabel/InputWithLabel';
import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import AsyncButton from '@/components/asyncButton/AsyncButton';
import axios from 'axios';
import CONSTANTS from '@/constants/constants';
import { signIn, useSession } from 'next-auth/react';

function Register() {
  const { data: session } = useSession();
  console.log(session);
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
    const usernameRegex = /[a-zA-Z0-9]{8,}/gi;
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
    setIsLoading(true);
    if (!validateAll()) return;
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
    <section className="container pb-16 pt-6 flex flex-col items-center justify-center gap-5 bg-primary-foreground">
      <h1 className="font-bold text-2xl text-primary">LOGO</h1>
      <div className="rounded-lg w-full flex flex-col items-baseline justify-center">
        <h1 className="font-light text-xl w-full text-left">Register</h1>
        <p className="font-light text-sm w-full text-justify mt-2">
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
            validation="Username must consist of 8 alphanumeric characters minimum"
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
          <AsyncButton className="text-sm" type="submit" isLoading={false}>
            <UserPlus className="mr-2 h-4 w-4" />
            Register
          </AsyncButton>
        </form>
        <div className="flex items-center w-full justify-between gap-3 mt-2">
          <div className="w-full h-px bg-[#CCCCCC]" />
          <p className="text-sm text-[#CCCCCC] font-normal">OR</p>
          <div className="w-full h-px bg-[#CCCCCC]" />
        </div>
        <AsyncButton onClick={signIn}>Test</AsyncButton>
      </div>
    </section>
  );
}

export default Register;
