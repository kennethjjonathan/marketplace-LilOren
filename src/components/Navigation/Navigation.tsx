import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
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
import { Search, ShoppingCart, Store, User2 } from 'lucide-react';
import ButtonWithIcon from '@/components/ButtonWithIcon/ButtonWithIcon';
import EmptyCart from '@/components/EmptyCart/EmptyCart';
import { ICartHome, useHome } from '@/store/home/useHome';
import CartInHome from '@/components/CartInHome/CartInHome';
import styles from './Navigation.module.scss';
import { useUser } from '@/store/user/useUser';

const components: {
  title: string;
  href: string;
  description?: string;
}[] = [
  {
    title: 'My Profile',
    href: '/user?status=Info',
  },
  {
    title: 'My Order',
    href: '/user/order-detail',
  },
  {
    title: 'Whislist',
    href: '/user/wishlist?status=Wishlist',
  },
];

const user: {
  firstName: string;
  lastName: string;
  isSeller: boolean;
} = {
  firstName: 'Endriyani',
  lastName: 'Rahayu',
  isSeller: false,
};

const products: ICartHome[] = [
  {
    thumbnail_url:
      'https://images.tokopedia.net/img/cache/100-square/VqbcmM/2023/10/16/9a895898-56d6-4430-b338-bbd43107f091.png.webp?ect=4g',
    product_name: 'Bantal tidur silikon Restking Bantal tidur silikon Restking',
    price: 100000,
    quantity: 1,
  },
  {
    thumbnail_url:
      'https://images.tokopedia.net/img/cache/100-square/VqbcmM/2021/7/27/5b3236fd-45aa-42c0-85d7-477dc0abfa8f.png.webp?ect=4g',
    product_name: 'Bantal tidur silikon Restking',
    price: 100000,
    quantity: 12,
  },
  {
    thumbnail_url:
      'https://images.tokopedia.net/img/cache/100-square/VqbcmM/2021/3/21/19e19780-4bf2-46b7-bbc7-8ebf4652e0ee.jpg.webp?ect=4g',
    product_name: 'Bantal tidur silikon Restking',
    price: 100000,
    quantity: 3,
  },
  {
    thumbnail_url:
      'https://images.tokopedia.net/img/cache/100-square/VqbcmM/2022/9/21/1109807a-c380-46cb-b460-b72638fa5630.png.webp?ect=4g',
    product_name: 'Bantal tidur silikon Restking',
    price: 100000,
    quantity: 4,
  },
  {
    thumbnail_url:
      'https://images.tokopedia.net/img/cache/100-square/VqbcmM/2022/10/13/2247df4c-8508-4d2e-ac46-ab4cf57f44f8.jpg.webp?ect=4g',
    product_name: 'Bantal tidur silikon Restking',
    price: 100000,
    quantity: 5,
  },
  {
    thumbnail_url:
      'https://images.tokopedia.net/img/cache/100-square/VqbcmM/2022/10/13/2247df4c-8508-4d2e-ac46-ab4cf57f44f8.jpg.webp?ect=4g',
    product_name: 'Bantal tidur silikon Restking',
    price: 100000,
    quantity: 5,
  },
];

const Navigation = () => {
  const [searchKey, setSearchKey] = useState<string>('');
  const cartInHome = useHome.use.cart_in_home();
  const fetchCartInHome = useHome.use.fetchCartInHome();
  const user_details = useUser.use.user_details();
  const fetchUserDetails = useUser.use.fetchUserDetails();
  const loading_fetch_user_details = useUser.use.loading_fetch_user_details();

  const handleSearchProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    fetchCartInHome();
    fetchUserDetails();
  }, []);

  return (
    <div className={styles.navigation}>
      {loading_fetch_user_details ? (
        <div className="lg:hidden md:w-[80vw] text-right pb-2"></div>
      ) : (
        <div className="lg:hidden md:w-[80vw] text-right pb-2">
          {user_details.username === '' && (
            <>
              <ButtonWithIcon variant={'link'} href={'/signin'}>
                {'Login'}
              </ButtonWithIcon>
              <ButtonWithIcon
                variant={'link'}
                href={'/register'}
                className="text-muted-foreground"
              >
                {'Register'}
              </ButtonWithIcon>
            </>
          )}
        </div>
      )}
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
                  {user_details.username && cartInHome.length !== 0 && (
                    <div className="absolute right-0 w-[18px] h-[18px] pb-[19px] border-white bg-destructive text-white font-bold text-[10px] text-center rounded-full">
                      {cartInHome.length}
                    </div>
                  )}

                  <ButtonWithIcon href="/user/cart" variant={'ghost'}>
                    <ShoppingCart />
                  </ButtonWithIcon>
                </div>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {user_details.username ? (
                  <CartInHome products={cartInHome} />
                ) : (
                  <EmptyCart />
                )}
              </NavigationMenuContent>
            </NavigationMenuItem>
            {/* My Shop */}
            {user_details.is_seller ? (
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <div className="flex md:flex-row md:gap-3 items-center">
                    <ButtonWithIcon href="/user?status=Info" variant={'ghost'}>
                      <Store />
                      <p className="hidden md:hidden lg:block font-light pl-3">
                        {'My Shop'}
                      </p>
                    </ButtonWithIcon>
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div
                    className={`flex flex-col lg:w-[400px] justify-start items-start p-3 gap-3`}
                  >
                    <p className={'text-muted-foreground'}>
                      {
                        "Monitor incoming orders and check your shop's progress regularly in one place."
                      }
                    </p>
                    <ButtonWithIcon variant={'default'} href={'/seller'}>
                      {'Check my shop'}
                    </ButtonWithIcon>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <div className="flex md:flex-row md:gap-3 items-center">
                    <ButtonWithIcon href="/user" variant={'ghost'}>
                      <Store />
                      <p className="hidden md:hidden lg:block font-light pl-3">
                        {'Shop'}
                      </p>
                    </ButtonWithIcon>
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div
                    className={`flex flex-col lg:w-[300px] justify-center items-center p-3 gap-3`}
                  >
                    <p className={'text-muted-foreground'}>
                      {"You don't have a shop yet."}
                    </p>
                    <ButtonWithIcon
                      variant={'default'}
                      href={'/seller/onboarding'}
                    >
                      {'Open a free shop'}
                    </ButtonWithIcon>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
            {/* My Account */}
            <NavigationMenuItem>
              {/* check if user is logged in or not */}
              {user_details.username !== '' ? (
                <NavigationMenuTrigger>
                  <div className="flex md:flex-row md:gap-3 items-center">
                    <ButtonWithIcon href="/user?status=Info" variant={'ghost'}>
                      <User2 />
                      <p className="hidden md:hidden lg:block font-light pl-3">
                        {user_details.username}
                      </p>
                    </ButtonWithIcon>
                  </div>
                </NavigationMenuTrigger>
              ) : (
                <div className="hidden lg:flex flex-row gap-2 pl-2">
                  <ButtonWithIcon href={'/signin'}>{'Login'}</ButtonWithIcon>
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
          <div className="font-medium leading-none whitespace-nowrap overflow-hidden text-ellipsis w-[100px] sm:w-[150px] md:w-[180px] lg:w-[200px] text-[10px] sm:text-[12px] md:text-[14px]">
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
