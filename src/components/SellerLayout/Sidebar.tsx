import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useOnClickOutside } from 'usehooks-ts';
import classNames from 'classnames';
import DefaultNavbarItems from './DefaultNavbarItems';
import { withBasePath } from '@/lib/nextUtils';
import { IUserDetails } from '@/interface/user';
import { useUser } from '@/store/user/useUser';

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
  const user_details = useUser.use.user_details();
  const fetchUserDetails = useUser.use.fetchUserDetails();
  const router = useRouter();

  useOnClickOutside(ref, (e) => {
    setOpen(false);
  });

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div
      className={classNames({
        'flex flex-col justify-between': true,
        'bg-white text-primary': true,
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
                    'text-primary hover:text-white hover:bg-primary': true,
                    'flex gap-4 items-center ': true,
                    'transition-colors duration-300': true,
                    'rounded-md p-2 mx-2': true,
                    'bg-primary text-white':
                      router.pathname === item.href ||
                      router.pathname === `${item.href}/shipment` ||
                      router.pathname === `${item.href}/create` ||
                      router.pathname.includes(`${item.href}?`),
                  })}
                >
                  {item.icon} {item.label}
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
      <div className="border-t border-t-primary p-4 bg-primary-foreground">
        <div className="flex gap-4 items-center">
          <Image
            src={withBasePath('blank-profile.webp')}
            height={36}
            width={36}
            alt="profile image"
            className="rounded-full"
          />
          <div className="flex flex-col ">
            <span className="text-primary my-0 font-semibold">
              {user_details.username}
            </span>
            <Link
              href="/user?status=Info"
              className="text-muted-foreground text-sm"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
