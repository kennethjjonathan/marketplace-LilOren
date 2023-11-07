import React from 'react';
import {
  ClipboardList,
  Home,
  Package,
  ShoppingCart,
  Truck,
} from 'lucide-react';
import { NavItem } from './Sidebar';

export const defaultNavItems: NavItem[] = [
  {
    label: 'Home',
    href: '/seller/home',
    icon: <Home className="w-6 h-6" />,
  },
  {
    label: 'Product',
    href: '/seller/product',
    icon: <Package className="w-6 h-6" />,
  },
  {
    label: 'Order',
    href: '/seller/order',
    icon: <ClipboardList className="w-6 h-6" />,
  },
  {
    label: 'Delivery',
    href: '/seller/delivery',
    icon: <Truck className="w-6 h-6" />,
  },
];

export default defaultNavItems;
