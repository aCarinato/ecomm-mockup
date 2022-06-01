import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ProductItem({ product }) {
  const router = useRouter();
  const { locale } = router;
  return (
    <div className="card">
      {locale === 'en' && (
        <Link href={`/product/${product.slug}`}>
          <a>
            <img
              src={product.image}
              alt={product.name}
              className="rounded shadow"
            />
          </a>
        </Link>
      )}
      {locale === 'it' && (
        <Link href={`/prodotti/${product.slug}`}>
          <a>
            <img
              src={product.image}
              alt={product.name}
              className="rounded shadow"
            />
          </a>
        </Link>
      )}
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button className="primary-button" type="button">
          {locale === 'it' && 'Aggiungi al Carrello'}
          {locale === 'en' && 'Add to cart'}
        </button>
      </div>
    </div>
  );
}
