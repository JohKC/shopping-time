/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import { Currency } from "../../models/Currency";

interface CurrencyOverlayProps {
  allCurrencies: Currency[];
  changeCurrency: (newSelectedCurrency: Currency) => void;
}

const CurrencyOverlay = ({
  allCurrencies,
  changeCurrency,
}: CurrencyOverlayProps) => {
  return (
    <section className='currency-switcher'>
      {allCurrencies ? (
        allCurrencies.map((currency, index) => (
          <p
            key={index}
            className='single-currency'
            onClick={() => {
              changeCurrency(currency);
            }}>
            {currency.symbol} {currency.label}
          </p>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default CurrencyOverlay;
