import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import classes from './layout.module.css';

export default function Layout({ title, children }) {
  const router = useRouter();
  const { locales, locale } = router;
  return (
    <>
      <Head>
        <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
                      <a className="p-2">Cart</a>
                    </Link>
                    <Link href="/login">
                      <a className="p-2">Login</a>
                    </Link>
                  </>
                )}
                {locale === 'de' && (
                  <>
                    <Link href="/cart">
                      <a className="p-2">Kart</a>
                    </Link>
                    <Link href="/login">
                      <a className="p-2">Login</a>
                    </Link>
                  </>
                )}
                {locale === 'it' && (
                  <>
                    <Link href="/cart">
                      <a className="p-2">Carrello</a>
                    </Link>
                    <Link href="/login">
                      <a className="p-2">Login</a>
                    </Link>
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
