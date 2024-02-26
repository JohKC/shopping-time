/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import activeHamburger from "../../assets/images/active-hamburger.png";
import inactiveHamburger from "../../assets/images/inactive-hamburger.png";
import { AttributeItem } from "../../models/AttributeItem";
import { Category } from "../../models/Category";
import { Currency } from "../../models/Currency";
import { Item } from "../../models/Item";
import SuccessMessage from "../SuccessMessage";
import CartIcon from "../cart-overlay/CartIcon";
import CurrencyIcon from "../currency-overlay/CurrencyIcon";
import CategoryMenu from "./CategoryMenu";
import "./header.css";

interface NavigationProps {
  allCategories: Category[];
  activeCategory?: Category;
  selectedCurrency: Currency;
  allCurrencies: Currency[];
  changeCurrency: (newSelectedCurrency: Currency) => void;
  totalPayment: number;
  productsQuantity: number;
  handleRemoveProduct: (
    targetProduct: Item,
    userSelectedAttributes: AttributeItem[]
  ) => void;
  handleAddProduct: (
    targetProduct: Item,
    userSelectedAttributes: AttributeItem[]
  ) => void;
  cartItems: Item[];
  clearCart: () => void;
}

const Navigation = ({
  allCategories,
  activeCategory,
  selectedCurrency,
  allCurrencies,
  changeCurrency,
  totalPayment,
  productsQuantity,
  handleRemoveProduct,
  handleAddProduct,
  cartItems,
  clearCart,
}: NavigationProps) => {
  const [activeMenu, setInactiveMenu] = useState(false);

  const toggleMenu = () => {
    setInactiveMenu(!activeMenu);
  };
  const closeMenu = () => setInactiveMenu(false);

  return (
    <header>
      <img
        className='hamburger'
        src={activeMenu ? activeHamburger : inactiveHamburger}
        alt='toggle menu'
        onClick={toggleMenu}
      />
      <nav className={activeMenu ? "active-menu" : ""}>
        <NavLink
          to='/'
          onClick={() => {
            closeMenu();
          }}
          className='header-one'>
          <h1>Shopping Time</h1>
        </NavLink>
        <CategoryMenu
          allCategories={allCategories}
          activeCategory={activeCategory}
          closeMenu={closeMenu}
        />
        <section className='icons-section'>
          <CurrencyIcon
            selectedCurrency={selectedCurrency}
            allCurrencies={allCurrencies}
            changeCurrency={changeCurrency}
          />

          <CartIcon
            handleRemoveProduct={handleRemoveProduct}
            handleAddProduct={handleAddProduct}
            productsQuantity={productsQuantity}
            totalPayment={totalPayment}
            cartItems={cartItems}
            selectedCurrency={selectedCurrency}
            activeMenu={activeMenu}
            clearCart={clearCart}
            closeMenu={closeMenu}
          />
        </section>
      </nav>
      <SuccessMessage />
    </header>
  );
};

export default Navigation;
