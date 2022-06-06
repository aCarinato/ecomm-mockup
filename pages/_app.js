import '../styles/globals.css';
import { SessionProvider, useSession } from 'next-auth/react';
import Layout from '../components/layout';
import { StoreProvider } from '../utils/Store';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <Layout>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </StoreProvider>
    </SessionProvider>
  );
}

function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
    },
  });
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return children;
}

export default MyApp;
