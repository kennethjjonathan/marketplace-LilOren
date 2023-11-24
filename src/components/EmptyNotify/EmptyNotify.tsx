import React from 'react';

interface EmptyNotifyProps {
  message: string;
}

const EmptyNotify = ({ message }: EmptyNotifyProps) => {
  return (
    <div className="max-h-max flex flex-col gap-4 justify-center items-center pt-3 lg:pt-3">
      <img
        src="/empty-wishlist.png"
        alt="empty-wishlist"
        className="w-[200px]"
      />
      <div className="w-[250px] md:w-[400px] lg:w-[300px] flex flex-col gap-3 items-center justify-center">
        <p className="font-bold">{message}</p>
      </div>
    </div>
  );
};

export default EmptyNotify;
