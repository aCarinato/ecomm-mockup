// import Head from 'next/head';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Menu } from '@headlessui/react';

import { Store } from '../utils/Store';

import DropdownLink from './DropdownLink';
import classes from './layout.module.css';

export default function Layout({ children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const router = useRouter();
  const { locales, locale } = router;

  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const cartCounter = cartItemsCount > 0 && (
    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
      {cartItemsCount}
    </span>
  );

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/">
              <a className="text-lg font-bold">amazona</a>
            </Link>
            <div className="flex">
              <div>
                {locale === 'en' && (
                  <>
                    <Link href="/cart">
                      <a className="p-2">
                        Cart
                        {cartCounter}
                      </a>
                    </Link>
                    {status === 'loading' ? (
                      'Loading'
                    ) : session?.user ? (
                      <Menu as="div" className="relative inline-block">
                        <Menu.Button className="text-blue-600">
                          {session.user.name}
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                          <Menu.Item>
                            <DropdownLink
                              className="dropdown-link"
                              href="/profile"
                            >
                              Profile
                            </DropdownLink>
                          </Menu.Item>
                          <Menu.Item>
                            <DropdownLink
                              className="dropdown-link"
                              href="/order-history"
                            >
                              Order History
                            </DropdownLink>
                          </Menu.Item>
                          <Menu.Item>
                            <a
                              className="dropdown-link"
                              href="#"
                              onClick={logoutClickHandler}
                            >
                              Logout
                            </a>
                          </Menu.Item>
                        </Menu.Items>
                      </Menu>
                    ) : (
                      <Link href="/login">
                        <a className="p-2">Login</a>
                      </Link>
                    )}
                  </>
                )}
                {locale === 'de' && (
                  <>
                    <Link href="/cart">
                      <a className="p-2">
                        Kart
                        {cartCounter}
                      </a>
                    </Link>
                    {status === 'loading' ? (
                      'Loading'
                    ) : session?.user ? (
                      <Menu as="div" className="relative inline-block">
                        <Menu.Button className="text-blue-600">
                          {session.user.name}
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                          <Menu.Item>
                            <DropdownLink
                              className="dropdown-link"
                              href="/profile"
                            >
                              Profilen
                            </DropdownLink>
                          </Menu.Item>
                          <Menu.Item>
                            <DropdownLink
                              className="dropdown-link"
                              href="/order-history"
                            >
                              Orderen
                            </DropdownLink>
                          </Menu.Item>
                          <Menu.Item>
                            <a
                              className="dropdown-link"
                              href="#"
                              onClick={logoutClickHandler}
                            >
                              Logout
                            </a>
                          </Menu.Item>
                        </Menu.Items>
                      </Menu>
                    ) : (
                      <Link href="/login">
                        <a className="p-2">Login</a>
                      </Link>
                    )}
                  </>
                )}
                {locale === 'it' && (
                  <>
                    <Link href="/carrello">
                      <a className="p-2">
                        Carrello
                        {cartCounter}
                      </a>
                    </Link>
                    {status === 'loading' ? (
                      'Loading'
                    ) : session?.user ? (
                      <Menu as="div" className="relative inline-block">
                        <Menu.Button className="text-blue-600">
                          {session.user.name}
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                          <Menu.Item>
                            <DropdownLink
                              className="dropdown-link"
                              href="/profile"
                            >
                              Profilo
                            </DropdownLink>
                          </Menu.Item>
                          <Menu.Item>
                            <DropdownLink
                              className="dropdown-link"
                              href="/order-history"
                            >
                              Ordini
                            </DropdownLink>
                          </Menu.Item>
                          <Menu.Item>
                            <a
                              className="dropdown-link"
                              href="#"
                              onClick={logoutClickHandler}
                            >
                              Logout
                            </a>
                          </Menu.Item>
                        </Menu.Items>
                      </Menu>
                    ) : (
                      <Link href="/loginIT">
                        <a className="p-2">Login</a>
                      </Link>
                    )}
                  </>
                )}
              </div>
              <div>
                {locales.map((l, i) => {
                  const { pathname, query, asPath } = router;
                  return (
                    <span key={i} className={classes.lang}>
                      <Link href={{ pathname, query }} as={asPath} locale={l}>
                        <a>{l}</a>
                      </Link>
                    </span>
                  );
                })}
              </div>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © 2022 Amazona</p>
        </footer>
      </div>
    </>
  );
}
