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
  const product = dataIT.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Articolo non trovato</div>;
  }
  const productId = product.id;

  useEffect(() => {
    if (locale === 'en') {
      const productEN = dataEN.products.find((x) => x.id === productId);
      const productENSlug = productEN.slug;
      // console.log(productITSlug);
      router.push(`/product/${productENSlug}`);
    }
  }, [locale]);

  return (
    <Layout title={product.name}>
      {locale === 'it' && (
        <>
          <div className="py-2">
            <Link href="/">Indietro</Link>
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
                <li>Categoria: {product.category}</li>
                <li>Brand: {product.brand}</li>
                <li>
                  {product.rating} of {product.numReviews} recensioni
                </li>
                <li>Descrizione: {product.description}</li>
              </ul>
            </div>
            <div>
              <div className="card p-5">
                <div className="mb-2 flex justify-between">
                  <div>Prezzo</div>
                  <div>${product.price}</div>
                </div>
                <div className="mb-2 flex justify-between">
                  <div>Stato</div>
                  <div>
                    {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                  </div>
                </div>
                <button className="primary-button w-full">
                  Aggiungi al carrelo
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}
