import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';

import { toast } from 'react-toastify';
import db from '../utils/db';
import { Store } from '../utils/Store';

function Home({ products }) {
  const router = useRouter();
  const { locale } = router;

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.id === product.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('Product added to the cart');
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {locale === 'en' && (
        <>
          <Head>
            <title>Next Amazona - English</title>
            <meta name="description" content="Best apparel for slim people" />
          </Head>
          {products.map((product) => (
            <ProductItem
              addToCartHandler={addToCartHandler}
              product={product}
              key={product.id}
            ></ProductItem>
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
          {products.map((product) => (
            <ProductItem
              addToCartHandler={addToCartHandler}
              product={product}
              key={product.id}
            ></ProductItem>
          ))}
        </>
      )}
    </div>
  );
}

export default Home;

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
