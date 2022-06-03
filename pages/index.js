import Head from 'next/head';
import { useRouter } from 'next/router';
// import Layout from '../components/layout';
import ProductItem from '../components/ProductItem';

import data from '../utils/data';
// import dataEN from '../utils/data-en';
// import dataIT from '../utils/data-it';

function Home() {
  const router = useRouter();
  const { locale } = router;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {locale === 'en' && (
        <>
          <Head>
            <title>Next Amazona - English</title>
            <meta name="description" content="Best apparel for slim people" />
          </Head>
          {data.products.map((product) => (
            <ProductItem product={product} key={product.id}></ProductItem>
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
          {data.products.map((product) => (
            <ProductItem product={product} key={product.id}></ProductItem>
          ))}
        </>
      )}
    </div>
  );
}

export default Home;
