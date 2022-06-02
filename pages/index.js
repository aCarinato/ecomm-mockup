import Head from 'next/head';
import { useRouter } from 'next/router';
// import Layout from '../components/layout';
import ProductItem from '../components/ProductItem';

import dataEN from '../utils/data-en';
import dataIT from '../utils/data-it';

// import dynamic from 'next/dynamic';
// import { useEffect } from 'react';

// const DataEN = dynamic(() => import('../utils/data-en'));
// const DataIT = dynamic(() => import('../utils/data-it'));

function Home() {
  const router = useRouter();
  const { locale } = router;

  //   useEffect(() => {

  //   }, [])

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {locale === 'en' && (
        <>
          <Head>
            <title>Next Amazona - English</title>
            <meta name="description" content="Best apparel for slim people" />
          </Head>
          {dataEN.products.map((product) => (
            <ProductItem product={product} key={product.slug}></ProductItem>
          ))}
        </>
      )}
      {locale === 'it' && (
        <>
          <Head>
            <title>Next Amazona - ITA</title>
            <meta
              name="description"
              content="Il migliori capi di abbigliamento per gente magra"
            />
          </Head>
          {dataIT.products.map((product) => (
            <ProductItem product={product} key={product.slug}></ProductItem>
          ))}
        </>
      )}
    </div>
  );
}

export default Home;
