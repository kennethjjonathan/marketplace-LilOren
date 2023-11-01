import React, { ReactNode } from 'react';
import { Button } from '../ui/button';

interface AsyncButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

function AsyncButton({
  isLoading = false,
  children,
  onClick,
  ...props
}: AsyncButtonProps) {
  if (isLoading) {
    return (
      <Button {...props} disabled>
        <div className="mr-2 h-4 w-4 animate-spin border-4 border-b-transparent rounded-full border-primary-foreground " />
        Loading
      </Button>
    );
  }

  return (
    <Button {...props} onClick={onClick}>
      {children}
    </Button>
  );
}

export default AsyncButton;
