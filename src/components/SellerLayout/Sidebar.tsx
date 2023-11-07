import React, { useRef } from 'react';
import Link from 'next/link';
import { useOnClickOutside } from 'usehooks-ts';
import classNames from 'classnames';
import DefaultNavbarItems from './DefaultNavbarItems';

export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

interface SidebarProps {
  open: boolean;
  navItems?: NavItem[];
  setOpen: (open: boolean) => void;
}

const Sidebar = ({
  open,
  navItems = DefaultNavbarItems,
  setOpen,
}: SidebarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, (e) => {
    setOpen(false);
  });

  return (
    <div
      className={classNames({
        'flex flex-col justify-between': true,
        'bg-primary/80 text-white': true,
        'md:w-full md:sticky md:top-16 md:z-0 top-0 z-20 fixed': true,
        'md:h-[calc(100vh_-_64px)] h-full w-[300px]': true,
        'transition-transform .3s ease-in-out md:translate-x-0': true,
        '-translate-x-full ': !open,
      })}
      ref={ref}
    >
      <nav className="md:sticky top-0 md:top-16">
        <ul className="py-2 flex flex-col gap-2">
          {navItems.map((item, index) => {
            return (
              <Link key={`key:${index.toString()}`} href={item.href}>
                <li
                  className={classNames({
                    'text-white hover:text-white hover:bg-primary': true,
                    'flex gap-4 items-center ': true,
                    'transition-colors duration-300': true,
                    'rounded-md p-2 mx-2': true,
                  })}
                >
                  {item.icon} {item.label}
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
