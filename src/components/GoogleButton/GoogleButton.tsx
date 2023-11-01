import React from 'react';
import Image from 'next/image';

interface GoogleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function GoogleButton({ ...props }: GoogleButtonProps) {
  return (
    <button
      className="flex items-center justify-center rounded-md border-2 w-full py-2 px-10 gap-3 duration-300 bg-white hover:bg-gray-100 cursor-pointer"
      {...props}
    >
      <div className="relative w-6 h-6">
        <Image
          src={'/google.svg'}
          alt="Google's logo"
          fill
          sizes="{max-width: 768px} 10vw, 20vw"
        />
      </div>
      <span className="font-light text-[#5F5F5F] text-sm lg:text-base">
        Sign in With Google
      </span>
    </button>
  );
}

export default GoogleButton;
