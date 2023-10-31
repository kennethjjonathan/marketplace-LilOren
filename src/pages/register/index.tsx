import { InputWithLabel } from '@/components/inputWithLabel/InputWithLabel';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';

function Register() {
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegisterData = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    setRegisterData({ ...registerData, [key]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            required
            value={registerData.username}
            labelStyling="font-light"
            onChange={(e) => handleRegisterData(e, 'username')}
            pattern="[a-zA-Z0-9]{8,}"
            validation="Username must consist of 8 alphanumeric characters minimum"
          />
          <InputWithLabel
            type="email"
            label="Email"
            id="email-input"
            required
            labelStyling="font-light"
            value={registerData.email}
            onChange={(e) => handleRegisterData(e, 'email')}
          />
          <InputWithLabel
            type="password"
            label="Password"
            id="password-input"
            required
            labelStyling="font-light"
            value={registerData.password}
            onChange={(e) => handleRegisterData(e, 'password')}
          />
          <InputWithLabel
            type="password"
            label="Confirm Password"
            id="confirm-password-input"
            required
            labelStyling="font-light"
            value={registerData.confirmPassword}
            onChange={(e) => handleRegisterData(e, 'confirmPassword')}
          />
          <Button className="text-sm" type="submit">
            <UserPlus className="mr-2 h-4 w-4" />
            Register
          </Button>
        </form>
        <div className="flex items-center w-full justify-between gap-3 mt-2">
          <div className="w-full h-px bg-[#CCCCCC]" />
          <p className="text-sm text-[#CCCCCC] font-normal">OR</p>
          <div className="w-full h-px bg-[#CCCCCC]" />
        </div>
      </div>
    </section>
  );
}

export default Register;
