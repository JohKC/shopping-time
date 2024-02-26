import { useEffect, useState } from "react";
import { Item } from "../../models/Item";
import { Currency } from "../../models/Currency";

interface CheckoutSingleItemProps {
  singleProduct: Item;
  selectedCurrency: Currency;
}

export const CheckoutSingleItem = ({
  singleProduct,
  selectedCurrency,
}: CheckoutSingleItemProps) => {
  const [priceAmount, setPriceAmount] = useState("");
  useEffect(() => {
    const targetCurrency = singleProduct.prices.filter(
      (price) => price.currency.symbol === selectedCurrency.symbol
    )[0];
    setPriceAmount(targetCurrency.amount.toFixed(2));
  }, [selectedCurrency, singleProduct.prices]);

  return (
    <li key={singleProduct.id}>
      {singleProduct.name} - {priceAmount}
      {selectedCurrency.symbol}, {singleProduct.quantity}
    </li>
  );
};
