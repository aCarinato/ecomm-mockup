import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout';
import { StoreProvider } from '../utils/Store';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </SessionProvider>
  );
}

export default MyApp;
