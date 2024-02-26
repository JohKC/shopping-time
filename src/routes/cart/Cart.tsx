import React, { useEffect } from "react";
import CartSingleItem from "./CartSingleItem";
import CartTotals from "./CartTotals";
import "./cart.css";
import CartHero from "../../assets/images/cart-hero.mp4";
import { Currency } from "../../models/Currency";
import { Item } from "../../models/Item";
import { AttributeItem } from "../../models/AttributeItem";

interface CartProps {
  selectedCurrency: Currency;
  totalPayment: number;
  taxes: string;
  handleRemoveProduct: (
    targetProduct: Item,
    userSelectedAttributes: AttributeItem[]
  ) => void;
  cartItems: Item[];
  handleAddProduct: (
    targetProduct: Item,
    userSelectedAttributes: AttributeItem[]
  ) => void;
  productsQuantity: number;
  clearCart: () => void;
}

const Cart = ({
  selectedCurrency,
  totalPayment,
  taxes,
  handleRemoveProduct,
  cartItems,
  handleAddProduct,
  productsQuantity,
  clearCart,
}: CartProps) => {
  useEffect(() => {
    document.title = "Cart | Shopping Time";
  }, []);

  return (
    <main>
      <article className='cart-hero'>
        <h2>Cart</h2>
        <video autoPlay loop muted playsInline>
          <source src={CartHero} type='video/mp4' />
        </video>
      </article>
      <article className='cart'>
        {cartItems.length === 0 ? (
          <section className='cart-item-section'>
            <p className='empty-cart'>
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
          </section>
        ) : (
          <section className='cart-item-section'>
            {cartItems.map((singleProduct) => {
              return (
                <CartSingleItem
                  handleAddProduct={handleAddProduct}
                  key={singleProduct.uniqueId}
                  singleProduct={singleProduct}
                  selectedCurrency={selectedCurrency}
                  handleRemoveProduct={handleRemoveProduct}
                />
              );
            })}

            <CartTotals
              selectedCurrency={selectedCurrency}
              totalPayment={totalPayment}
              productsQuantity={productsQuantity}
              taxes={taxes}
              clearCart={clearCart}
            />
          </section>
        )}
      </article>
    </main>
  );
};

export default Cart;
