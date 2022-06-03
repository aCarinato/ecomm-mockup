import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useContext, useEffect } from 'react';
// import dataEN from '../../utils/data-en';
// import dataIT from '../../utils/data-it';

import data from '../../utils/data';

import { Store } from '../../utils/Store';

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { query, locale } = router;
  const { slug } = query;
  // const product = dataEN.products.find((x) => x.slug === slug);
  const product = data.products.find((x) => x.slugEN === slug);
  if (!product) {
    return <div>Produt Not Found</div>;
  }
  const productId = product.id;

  const addToCartHandler = () => {
    // const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const existItem = state.cart.cartItems.find((x) => x.id === product.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert('Sorry. Product is out of stock');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  useEffect(() => {
    if (locale === 'it') {
      // const productIT = dataIT.products.find((x) => x.id === productId);
      const productITSlug = product.slugIT;
      //   console.log(productITSlug);
      router.push(`/prodotti/${productITSlug}`);
    }
  }, [locale]);

  return (
    <Fragment>
      <Head>
        <title>{product.nameEN}</title>
        <meta name="description" content={product.descriptionEN} />
      </Head>
      {locale === 'en' && (
        <>
          <div className="py-2">
            <Link href="/">back to products</Link>
          </div>
          <div className="grid md:grid-cols-4 md:gap-3">
            <div className="md:col-span-2">
              <Image
                src={product.image}
                alt={product.nameEN}
                width={640}
                height={640}
                layout="responsive"
              ></Image>
            </div>
            <div>
              <ul>
                <li>
                  <h1 className="text-lg">{product.nameEN}</h1>
                </li>
                <li>Category: {product.categoryEN}</li>
                <li>Brand: {product.brand}</li>
                <li>
                  {product.rating} of {product.numReviews} reviews
                </li>
                <li>Description: {product.descriptionEN}</li>
              </ul>
            </div>
            <div>
              <div className="card p-5">
                <div className="mb-2 flex justify-between">
                  <div>Price</div>
                  <div>${product.price}</div>
                </div>
                <div className="mb-2 flex justify-between">
                  <div>Status</div>
                  <div>
                    {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                  </div>
                </div>
                <button
                  className="primary-button w-full"
                  onClick={addToCartHandler}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
}
