import React, { useEffect, useRef, useState } from "react";
import CurrencyOverlay from "./CurrencyOverlay";
import "./currency-overlay.css";
import { Currency } from "../../models/Currency";

interface CurrencyIconProps {
  selectedCurrency: Currency;
  allCurrencies: Currency[];
  changeCurrency: (newSelectedCurrency: Currency) => void;
}

const CurrencyIcon = ({
  selectedCurrency,
  allCurrencies,
  changeCurrency,
}: CurrencyIconProps) => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const currencyIcon = useRef<HTMLElement>(null);

  const toggleCurrencyMenu = () => {
    setDropdownMenu(!dropdownMenu);
  };
  const handleOutsideClick = (e: MouseEvent) => {
    if (
      currencyIcon.current &&
      !currencyIcon.current.contains(e.target as Node)
    ) {
      setDropdownMenu(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  return (
    <section
      onClick={toggleCurrencyMenu}
      className='initial-currency'
      ref={currencyIcon}>
      <p>
        {selectedCurrency.symbol}{" "}
        <span
          style={!dropdownMenu ? {} : { transform: "rotate(180deg)" }}
          className='arrow-icon'>
          ⌄
        </span>
      </p>
      {dropdownMenu && (
        <CurrencyOverlay
          allCurrencies={allCurrencies}
          changeCurrency={changeCurrency}
        />
      )}
    </section>
  );
};

export default CurrencyIcon;
