import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ProductItem({ product, addToCartHandler }) {
  const router = useRouter();
  const { locale } = router;
  return (
    <div className="card">
      {locale === 'en' && (
        <Link href={`/product/${product.slugEN}`}>
          <a>
            <img
              src={product.image}
              alt={product.nameEN}
              className="rounded shadow"
            />
          </a>
        </Link>
      )}
      {locale === 'it' && (
        <Link href={`/prodotti/${product.slugIT}`}>
          <a>
            <img
              src={product.image}
              alt={product.nameIT}
              className="rounded shadow"
            />
          </a>
        </Link>
      )}
      <div className="flex flex-col items-center justify-center p-5">
        {locale === 'en' && (
          <Link href={`/product/${product.slugEN}`}>
            <a>
              <h2 className="text-lg">{product.nameEN}</h2>
            </a>
          </Link>
        )}
        {locale === 'it' && (
          <Link href={`/product/${product.slugIT}`}>
            <a>
              <h2 className="text-lg">{product.nameIT}</h2>
            </a>
          </Link>
        )}
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>

        <button
          className="primary-button"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          {locale === 'it' && 'Aggiungi al Carrello'}
          {locale === 'en' && 'Add to cart'}
        </button>
      </div>
    </div>
  );
}
