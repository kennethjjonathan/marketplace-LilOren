import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
import { Utils } from '@/utils';
import { Button } from '../ui/button';
import ButtonWithIcon from '../ButtonWithIcon/ButtonWithIcon';
import styles from './Navigation.module.scss';
import EmptyCart from '../EmptyCart/EmptyCart';

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
  firstName: '',
  lastName: 'Rahayu',
};

const products: {
  name: string;
  price: number;
  quantity: number;
}[] = [
  {
    name: 'Bantal tidur silikon Restking Bantal tidur silikon Restking',
    price: 100000,
    quantity: 1,
  },
  {
    name: 'Bantal tidur silikon Restking',
    price: 100000,
    quantity: 12,
  },
  {
    name: 'Bantal tidur silikon Restking',
    price: 100000,
    quantity: 3,
  },
  {
    name: 'Bantal tidur silikon Restking',
    price: 100000,
    quantity: 4,
  },
  {
    name: 'Bantal tidur silikon Restking',
    price: 100000,
    quantity: 5,
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
                <ButtonWithIcon href="/cart" variant={'ghost'}>
                  <ShoppingCart />
                </ButtonWithIcon>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {user.firstName ? (
                  <div className="Cart hidden sm:block">
                    <div className="flex flex-row justify-between items-center px-5 pt-5">
                      <p className="totalCartItems text-[10px] sm:text-[12px] md:text-[14px]">{`Cart (${products.length})`}</p>
                      <Button
                        variant={'link'}
                        className="p-0 text-[10px] sm:text-[12px] md:text-[14px]"
                      >
                        <Link href="/cart">See My Cart</Link>
                      </Button>
                    </div>
                    <ul className="grid gap-3 p-2 sm:w-[200px] md:w-[200px] lg:w-[290px] lg:grid-rows-[.75fr_1fr]">
                      {products.length !== 0 ? (
                        products.map((product) => (
                          <ListItem
                            key={`key:${product.name}`}
                            href="/cart"
                            title={product.name}
                          >
                            <div className="flex justify-between items-center pt-1">
                              <p className="quantityinCart text-[10px] sm:text-[12px] md:text-[14px]">
                                {`${product.quantity} ${
                                  product.quantity > 1 ? 'items' : 'item'
                                }`}
                              </p>
                              <p className="priceInCart text-primary text-[10px] sm:text-[12px] md:text-[14px]">
                                {Utils.convertPrice(product.price)}
                              </p>
                            </div>
                          </ListItem>
                        ))
                      ) : (
                        <EmptyCart />
                      )}
                    </ul>
                  </div>
                ) : (
                  <EmptyCart />
                )}
              </NavigationMenuContent>
            </NavigationMenuItem>
            {/* My Account */}
            <NavigationMenuItem>
              {/* check if user is logged in or not */}
              {user.firstName !== '' ? (
                <NavigationMenuTrigger>
                  <div className="flex md:flex-row md:gap-3 items-center">
                    <ButtonWithIcon href="/profile" variant={'ghost'}>
                      <User2 />
                      <p className="hidden md:hidden lg:block font-light pl-3">
                        {user.firstName}
                      </p>
                    </ButtonWithIcon>
                  </div>
                </NavigationMenuTrigger>
              ) : (
                <div className="hidden lg:flex flex-row gap-2">
                  <ButtonWithIcon href={'/login'}>{'Login'}</ButtonWithIcon>
                  <ButtonWithIcon variant={'outline'} href={'/register'}>
                    {'Register'}
                  </ButtonWithIcon>
                </div>
              )}
              <NavigationMenuContent>
                <ul className="hidden sm:grid gap-3 p-6 sm:w-[200px] md:w-[200px] lg:w-[290px] lg:grid-rows-[.75fr_1fr] ">
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
    <li className="border-b-[1px]">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="font-medium leading-none whitespace-nowrap overflow-hidden text-ellipsis w-[100px] sm:w-[150px] md:w-[120px] lg:w-[230px] text-[10px] sm:text-[12px] md:text-[14px]">
            {title}
          </div>
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
