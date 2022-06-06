import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import React, { Fragment, useContext, useEffect } from 'react';
import { XCircleIcon } from '@heroicons/react/outline';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast } from 'react-toastify';

function CarrelloScreen() {
  const router = useRouter();
  const { locale } = router;
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error('Spiacenti, il prodotto é esaurito.');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    toast.success('Prodotto aggiunto al carrello');
  };

  useEffect(() => {
    if (locale === 'en') {
      router.push('/cart');
    }
  }, [locale]);

  return (
    <Fragment>
      <Head>
        <title>Carrello</title>
      </Head>
      <h1 className="mb-4 text-xl">Carrello</h1>
      {cartItems.length === 0 ? (
        <div>
          Carrello vuoto. <Link href="/">Ritorna allo shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full ">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Articolo</th>
                  <th className="p-5 text-right">Quantitá</th>
                  <th className="p-5 text-right">Prezzo</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td>
                      <Link href={`/prodotti/${item.slugIT}`}>
                        <a className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.nameIT}
                            width={50}
                            height={50}
                          ></Image>
                          &nbsp;
                          {item.nameIT}
                        </a>
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      {' '}
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">${item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="h-5 w-5"></XCircleIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Subtotale ({cartItems.reduce((a, c) => a + c.quantity, 0)}) :
                  EUR
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push('loginIT?redirect=/shipping')}
                  className="primary-button w-full"
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default dynamic(() => Promise.resolve(CarrelloScreen), { ssr: false });
