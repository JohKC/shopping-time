/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Link } from "react-router-dom";
import activeHamburger from "../../assets/images/active-cart-overlay.png";
import { AttributeItem } from "../../models/AttributeItem";
import { Currency } from "../../models/Currency";
import { Item } from "../../models/Item";
import CartOverlayItem from "./CartOverlayItem";
import "./cart-overlay.css";

interface CartOverlayProps {
  totalPayment: number;
  cartItems: Item[];
  selectedCurrency: Currency;
  toggleCartOverlay: () => void;
  productsQuantity: number;
  handleAddProduct: (
    targetProduct: Item,
    userSelectedAttributes: AttributeItem[]
  ) => void;
  handleRemoveProduct: (
    targetProduct: Item,
    userSelectedAttributes: AttributeItem[]
  ) => void;
  activeMenu: boolean;
  removeCartOverlay: () => void;
  clearCart: () => void;
  closeMenu: () => void;
}

const CartOverlay = ({
  totalPayment,
  cartItems,
  selectedCurrency,
  toggleCartOverlay,
  productsQuantity,
  handleAddProduct,
  handleRemoveProduct,
  activeMenu,
  removeCartOverlay,
  clearCart,
  closeMenu,
}: CartOverlayProps) => {
  return (
    <>
      {cartItems.length === 0 ? (
        <section
          className={`cart-overlay ${activeMenu ? "active-overlay" : ""}`}>
          <img
            className='cartoverlay-hamburger'
            src={activeHamburger}
            alt='toggle menu'
            onClick={() => removeCartOverlay()}
          />
          {productsQuantity === 1 ? (
            <h4 className='overlay-title'>
              My cart, <span>{productsQuantity} items</span>
            </h4>
          ) : (
            <h4 className='overlay-title'>
              My cart, <span>{productsQuantity} items</span>
            </h4>
          )}
          <p className='empty-cart'>
            Looks like you haven&apos;t added anything to your cart yet
          </p>
        </section>
      ) : (
        <section
          className={`cart-overlay ${activeMenu ? "active-overlay" : ""}`}>
          <img
            className='cartoverlay-hamburger'
            src={activeHamburger}
            alt='toggle menu'
            onClick={() => removeCartOverlay()}
          />
          {productsQuantity === 1 ? (
            <h4 className='overlay-title'>
              My cart, <span>{productsQuantity} items</span>
            </h4>
          ) : (
            <h4 className='overlay-title'>
              My cart, <span>{productsQuantity} items</span>
            </h4>
          )}
          <section className='cartoverlay-grid'>
            {cartItems?.map((singleProduct, index) => (
              <CartOverlayItem
                key={index}
                singleProduct={singleProduct}
                selectedCurrency={selectedCurrency}
                handleAddProduct={handleAddProduct}
                handleRemoveProduct={handleRemoveProduct}
              />
            ))}
          </section>
          <section className='all-products-totals'>
            <p>Total:</p>
            <p>
              {selectedCurrency.symbol}
              {totalPayment}
            </p>
          </section>
          <section className='all-products-payment'>
            <Link
              onClick={() => {
                toggleCartOverlay();
                closeMenu();
              }}
              className='view-bag'
              to='/cart'>
              View cart
            </Link>
            <button
              onClick={() => {
                toggleCartOverlay();
                clearCart();
                closeMenu();
              }}
              className='clear-cart'>
              Clear cart
            </button>
          </section>
        </section>
      )}
    </>
  );
};

export default CartOverlay;
