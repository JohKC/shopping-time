import React, { useEffect, useRef, useState } from "react";
import EmptyCart from "../../assets/images/cart-icon.png";
import CartOverlay from "./CartOverlay";
import { resetLocation } from "../../helpers/reset-location";
import { Item } from "../../models/Item";
import { Currency } from "../../models/Currency";
import { AttributeItem } from "../../models/AttributeItem";

interface CartIconProps {
  totalPayment: number;
  cartItems: Item[];
  selectedCurrency: Currency;
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
  clearCart: () => void;
  closeMenu: () => void;
}

const CartIcon = ({
  totalPayment,
  cartItems,
  selectedCurrency,
  productsQuantity,
  handleAddProduct,
  handleRemoveProduct,
  activeMenu,
  clearCart,
  closeMenu,
}: CartIconProps) => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const cartIcon = useRef<HTMLElement>(null);

  const toggleCartOverlay = () => {
    setDropdownMenu(!dropdownMenu);
  };
  const removeCartOverlay = () => {
    setDropdownMenu(false);
    resetLocation();
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (cartIcon.current && !cartIcon.current.contains(e.target as Node)) {
        setDropdownMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <section className='cart-icon-section' ref={cartIcon}>
      <section className='cart-icon' onClick={toggleCartOverlay}>
        <img src={EmptyCart} alt='empty cart' className='cart-icon' />
        {productsQuantity > 0 ? (
          <p className='cart-quantity'>{productsQuantity}</p>
        ) : null}
      </section>

      {!dropdownMenu ? null : (
        <CartOverlay
          handleAddProduct={handleAddProduct}
          handleRemoveProduct={handleRemoveProduct}
          toggleCartOverlay={toggleCartOverlay}
          productsQuantity={productsQuantity}
          cartItems={cartItems}
          selectedCurrency={selectedCurrency}
          totalPayment={totalPayment}
          activeMenu={activeMenu}
          removeCartOverlay={removeCartOverlay}
          clearCart={clearCart}
          closeMenu={closeMenu}
        />
      )}
    </section>
  );
};

export default CartIcon;
