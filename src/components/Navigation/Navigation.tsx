import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Search, ShoppingCart, User2 } from 'lucide-react';
import styles from './Navigation.module.scss';
import { Button } from '../ui/button';
import ButtonWithIcon from '../ButtonWithIcon/ButtonWithIcon';
import { Utils } from '@/utils';

// For Empty Cart or if user is not logged in
const emptyCart: {
  title: string;
  icon: React.ReactNode;
} = {
  title: 'An order must have at least one item. Your order is empty.',
  icon: <ShoppingCart />,
};

const components: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description: 'A modal dialog that ',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description: 'For sighted users to preview ',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description: 'Displays an indicator',
  },
];

const user: {
  firstName: string;
  lastName: string;
} = {
  firstName: 'Endriyani',
  lastName: 'Rahayu',
};

const products: {
  name: string;
  price: number;
  quantity: number;
}[] = [
  {
    name: 'Bantal tidur silikon Restking',
    price: 0,
    quantity: 0,
  },
  {
    name: 'Bantal tidur silikon Restking',
    price: 0,
    quantity: 0,
  },
  {
    name: 'Bantal tidur silikon Restking',
    price: 0,
    quantity: 0,
  },
  {
    name: 'Bantal tidur silikon Restking',
    price: 0,
    quantity: 0,
  },
  {
    name: 'Bantal tidur silikon Restking',
    price: 0,
    quantity: 0,
  },
];

const Navigation = () => {
  return (
    <div className={styles.navigation}>
      <div className="px-3 flex flex-row justify-between items-center md:w-[75vw] gap-2 md:gap-[50px]">
        <div className="hidden md:block font-bold text-primary md:text-[24px]">
          LOGO
        </div>
        <div className="SearchInput relative w-full">
          <form action="">
            <Search className="absolute text-primary top-[8px] left-[12px]" />
            <input
              className="py-2 pl-[50px] pr-2 w-full rounded-[10px] focus:outline-primary"
              placeholder="Cari produk"
            />
          </form>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            {/* Cart */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <ShoppingCart />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {user.firstName ? (
                  <ul className="grid gap-3 p-6 sm:w-[200px] md:w-[200px] lg:w-[290px] lg:grid-rows-[.75fr_1fr]">
                    {products.map((product) => (
                      <ListItem
                        key={`key:${product.name}`}
                        href="/cart"
                        title={product.name}
                      >
                        <div className="flex justify-between items-center">
                          <p className="quantityinCart"></p>
                          <p className="priceInCart">
                            {Utils.convertPrice(product.price)}
                          </p>
                        </div>
                      </ListItem>
                    ))}
                  </ul>
                ) : (
                  <div className="grid gap-3 p-6 md:w-[200px] lg:w-[300px] lg:grid-rows-[.75fr_1fr]">
                    <p>{emptyCart.title}</p>
                  </div>
                )}
              </NavigationMenuContent>
            </NavigationMenuItem>
            {/* My Account */}
            <NavigationMenuItem>
              {user.firstName || components.length !== 0 ? (
                <NavigationMenuTrigger>
                  <div className="flex md:flex-row md:gap-3 items-center">
                    <User2 />
                    <div className="hidden md:hidden lg:flex flex-col justify-start items-start">
                      <p className="hidden md:hidden lg:block font-light">
                        {'Endriyani'}
                      </p>
                    </div>
                  </div>
                </NavigationMenuTrigger>
              ) : (
                <>
                  <div className="lg:hidden">
                    <ButtonWithIcon variant={'ghost'} href={'/register'}>
                      <User2 />
                    </ButtonWithIcon>
                  </div>
                  <div className="hidden lg:flex flex-row gap-2">
                    <ButtonWithIcon href={'/login'}>{'Login'}</ButtonWithIcon>
                    <ButtonWithIcon variant={'outline'} href={'/register'}>
                      {'Register'}
                    </ButtonWithIcon>
                  </div>
                </>
              )}
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 sm:w-[200px] md:w-[200px] lg:w-[290px] lg:grid-rows-[.75fr_1fr] ">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default Navigation;
