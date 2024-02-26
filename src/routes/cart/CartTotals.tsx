import React from "react";
import { Link } from "react-router-dom";
import { Currency } from "../../models/Currency";

interface CartTotalsProps {
  totalPayment: number;
  productsQuantity: number;
  selectedCurrency: Currency;
  taxes: string;
  clearCart: () => void;
}

const CartTotals = ({
  totalPayment,
  productsQuantity,
  selectedCurrency,
  taxes,
  clearCart,
}: CartTotalsProps) => {
  return (
    <section className='cart-totals'>
      <h3>
        Totals{" "}
        <span>
          <Link
            onClick={() => {
              clearCart();
            }}
            className='clear-cart-totals'
            to='/checkout'>
            Clear cart
          </Link>
        </span>
      </h3>
      <ul>
        <li className='cart-totals-sum'>
          Tax 21%:{" "}
          <span>
            {selectedCurrency.symbol}
            {taxes}
          </span>
        </li>
        <li className='cart-totals-sum'>
          Quantity: <span>{productsQuantity}</span>
        </li>
        <li className='cart-totals-sum'>
          Total:{" "}
          <span>
            {selectedCurrency.symbol}
            {totalPayment}
          </span>
        </li>
      </ul>
      <section className='cart-buttons'>
        <Link to='/store/all' className='cart-go-back'>
          Continue shopping
        </Link>
        <Link to='/checkout' className='order-btn'>
          Checkout
        </Link>
      </section>
    </section>
  );
};

export default CartTotals;
