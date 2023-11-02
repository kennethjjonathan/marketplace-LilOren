import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Utils } from '@/utils';

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
import ButtonWithIcon from '../ButtonWithIcon/ButtonWithIcon';
import styles from './Navigation.module.scss';
import EmptyCart from '../EmptyCart/EmptyCart';
import { className } from '../../../node_modules/@sinonjs/commons/types/index.d';

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
  const [searchKey, setSearchKey] = useState<string>('');

  const handleSearchProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.navigation}>
      <div className="lg:hidden md:w-[80vw] text-right pb-2">
        <ButtonWithIcon variant={'link'} href={'/login'}>
          {'Login'}
        </ButtonWithIcon>
        <ButtonWithIcon
          variant={'link'}
          href={'/register'}
          className="text-muted-foreground"
        >
          {'Register'}
        </ButtonWithIcon>
      </div>
      <div className={styles.navigationContent}>
        <div className={styles.logo}>LOGO</div>
        <div className={styles.searchInput}>
          <form onSubmit={handleSearchProduct}>
            <Search className="absolute text-primary top-[8px] left-[12px]" />
            <input className={styles.inputField} placeholder="Cari produk" />
          </form>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            {/* Cart */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <div className="cartWrapper relative w-full">
                  {user.firstName && products.length !== 0 && (
                    <div className="absolute right-0 w-[18px] h-[18px] pb-[19px] border-white bg-destructive text-white font-bold text-[10px] text-center rounded-full">
                      {products.length}
                    </div>
                  )}

                  <ButtonWithIcon href="/cart" variant={'ghost'}>
                    <ShoppingCart />
                  </ButtonWithIcon>
                </div>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {user.firstName ? (
                  <div className={styles.cart}>
                    <div className={styles.cartHeader}>
                      <p
                        className={styles.totalCartItems}
                      >{`Cart (${products.length})`}</p>
                      <Button
                        variant={'link'}
                        className="p-0 text-[10px] sm:text-[12px] md:text-[14px]"
                      >
                        <Link href="/cart">See My Cart</Link>
                      </Button>
                    </div>
                    <ul className={styles.cartItemsWrapper}>
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
                <div className="hidden lg:flex flex-row gap-2 pl-2">
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

export const ListItem = React.forwardRef<
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
