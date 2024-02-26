import React, { useEffect, useState } from "react";
import SelectedAttributes from "../attributes/SelectedAttributes";
import ChangeCartItemQuantity from "../ChangeCartItemQuantity";
import { Item } from "../../models/Item";
import { Currency } from "../../models/Currency";
import { AttributeItem } from "../../models/AttributeItem";
import { Price } from "../../models/Price";

interface CartOverlayProps {
  singleProduct: Item;
  selectedCurrency: Currency;
  handleAddProduct: (
    targetProduct: Item,
    userSelectedAttributes: AttributeItem[]
  ) => void;
  handleRemoveProduct: (
    targetProduct: Item,
    userSelectedAttributes: AttributeItem[]
  ) => void;
}

const CartOverlayItem = ({
  singleProduct,
  selectedCurrency,
  handleAddProduct,
  handleRemoveProduct,
}: CartOverlayProps) => {
  const [pricing, setPricing] = useState<Price>();
  const [priceAmount, setPriceAmount] = useState("");

  const getPricing = () => {
    const price = getPrice(singleProduct.prices, selectedCurrency);
    setPricing(price);
  };

  const filterCurrency = (item: Item, selectedCurrency: Currency) => {
    const [correctPrice] = item.prices.filter((price) => {
      return price.currency.symbol === selectedCurrency.symbol;
    });
    setPriceAmount(correctPrice.amount.toFixed(2));
    setPricing(correctPrice);
  };

  const getPrice = (prices: Price[], currency: Currency) => {
    const [correctPrice] = prices.filter(
      (price) => price.currency.symbol === currency.symbol
    );
    setPriceAmount(correctPrice.amount.toFixed(2));
    return correctPrice;
  };

  useEffect(() => {
    getPricing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterCurrency(singleProduct, selectedCurrency);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCurrency]);

  return (
    <article className='cartoverlay-products-single'>
      <section className='cart-overlay-item'>
        <section className='cart-overlay-item-data'>
          <section className='titles-block'>
            <h4>{singleProduct.brand}</h4>
            <h4>{singleProduct.name}</h4>
            <div className='cartoverlay-item-pricing'>
              <p className='product-price'>
                {pricing?.currency?.symbol}
                {priceAmount}
              </p>
            </div>
          </section>

          {singleProduct?.attributes?.map((attribute) => (
            <SelectedAttributes
              className='cart-overlay-item-attr'
              key={attribute.id}
              attribute={attribute}
            />
          ))}
        </section>
      </section>
      <ChangeCartItemQuantity
        className='cartoverlay-product-interaction'
        handleAddProduct={handleAddProduct}
        handleRemoveProduct={handleRemoveProduct}
        singleProduct={singleProduct}
      />
      <img
        className='cart-overlay-image'
        src={singleProduct.gallery[0]}
        alt={singleProduct.name}
      />
    </article>
  );
};

export default CartOverlayItem;
