import React from 'react';
import { Menu } from 'lucide-react';
import classNames from 'classnames';

interface NavbarProps {
  onMenuButtonClick: () => void;
}

const Navbar = (props: NavbarProps) => {
  return (
    <nav
      className={classNames({
        'bg-white text-zinc-500': true, // colors
        'flex items-center': true, // layout
        'w-full fixed z-10 px-4 shadow-sm h-16': true, //positioning & styling
      })}
    >
      <div className="font-bold text-lg text-primary">LOGO</div>
      <div className="flex-grow"></div> {/** spacer */}
      <button className="md:hidden" onClick={props.onMenuButtonClick}>
        <Menu className="h-6 w-6" />
      </button>
    </nav>
  );
};

export default Navbar;
