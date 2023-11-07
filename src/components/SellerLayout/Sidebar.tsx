import React from 'react';
import classNames from 'classnames';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  return (
    <div
      className={classNames({
        'flex flex-col justify-between': true, // layout
        'bg-indigo-700 text-zinc-50': true, // colors
        'md:w-full md:sticky md:top-16 md:z-0 top-0 z-20 fixed': true, // positioning
        'md:h-[calc(100vh_-_64px)] h-full w-[300px]': true, // for height and width
        'transition-transform .3s ease-in-out md:translate-x-0': true, //animations
        '-translate-x-full ': !open, //hide sidebar to the left when closed
      })}
    ></div>
  );
};

export default Sidebar;
