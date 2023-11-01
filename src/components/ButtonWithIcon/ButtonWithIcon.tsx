import React, { ReactNode } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

interface ButtonWithIconIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  href?: string;
  variant?:
    | 'default'
    | 'link'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined;
}

const ButtonWithIcon: React.FC<ButtonWithIconIconProps> = ({
  children,
  href,
  variant,
  onClick,
}) => {
  return (
    <Button asChild onClick={onClick} variant={variant}>
      <Link href={href!}>{children}</Link>
    </Button>
  );
};

export default ButtonWithIcon;
