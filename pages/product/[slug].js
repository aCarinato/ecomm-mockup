import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../../components/layout';
import dataEN from '../../utils/data-en';
import dataIT from '../../utils/data-it';

export default function ProductScreen() {
  const router = useRouter();
  const { query, locale } = router;
  const { slug } = query;
  const product = dataEN.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Produt Not Found</div>;
  }
  const productId = product.id;

  useEffect(() => {
    if (locale === 'it') {
      const productIT = dataIT.products.find((x) => x.id === productId);
      const productITSlug = productIT.slug;
      console.log(productITSlug);
      router.push(`/prodotti/${productITSlug}`);
    }
  }, [locale]);

  return (
    <Layout title={product.name}>
      {locale === 'en' && (
        <>
          <div className="py-2">
            <Link href="/">back to products</Link>
          </div>
          <div className="grid md:grid-cols-4 md:gap-3">
            <div className="md:col-span-2">
              <Image
                src={product.image}
                alt={product.name}
                width={640}
                height={640}
                layout="responsive"
              ></Image>
            </div>
            <div>
              <ul>
                <li>
                  <h1 className="text-lg">{product.name}</h1>
                </li>
                <li>Category: {product.category}</li>
                <li>Brand: {product.brand}</li>
                <li>
                  {product.rating} of {product.numReviews} reviews
                </li>
                <li>Description: {product.description}</li>
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
                <button className="primary-button w-full">Add to cart</button>
              </div>
            </div>
          </div>
        </>
      )}
      {/* {locale === 'it' && <></>} */}
    </Layout>
  );
}
