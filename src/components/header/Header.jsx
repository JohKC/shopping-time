import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import CartIcon from "../cart-overlay/CartIcon.jsx";
import SuccessMessage from "../SuccessMessage.jsx";
import CategoryMenu from "./CategoryMenu.jsx";
import CurrencyIcon from "../currency-overlay/CurrencyIcon.jsx";
import "./header.css";
import inactiveHamburger from "../../assets/images/inactive-hamburger.png";
import activeHamburger from "../../assets/images/active-hamburger.png";

const Navigation = ({ allCategories,
  changeCategory,
  activeCategory,
  selectedCurrency,
  allCurrencies,
  changeCurrency,
  amountOfItems,
  totalPayment,
  productsQuantity,
  handleRemoveProduct,
  handleAddProduct,
  cartItems, clearCart }) => {

  const [activeMenu, setInactiveMenu] = useState(false);

  const toggleMenu = () => {
    setInactiveMenu(!activeMenu);
  }
  const closeMenu = () => setInactiveMenu(false);

  return (
    <header>
      <img className="hamburger" src={activeMenu ? activeHamburger : inactiveHamburger} alt="toggle menu" onClick={toggleMenu} />
      <nav className={activeMenu ? "active-menu" : ""}>
        <NavLink
          to="/"
          onClick={() => {
            changeCategory("");
            closeMenu();
          }}
          className="header-one">
          <h1>Shopping Time</h1>
        </NavLink>
        <CategoryMenu
          allCategories={allCategories}
          changeCategory={changeCategory}
          activeCategory={activeCategory}
          closeMenu={closeMenu}
        />
        <section className="icons-section">
          <CurrencyIcon
            selectedCurrency={selectedCurrency}
            allCurrencies={allCurrencies}
            changeCurrency={changeCurrency}
          />

          <CartIcon
            handleRemoveProduct={handleRemoveProduct}
            handleAddProduct={handleAddProduct}
            productsQuantity={productsQuantity}
            amountOfItems={amountOfItems}
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
}


export default Navigation;