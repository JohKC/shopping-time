import React, { useEffect, useState } from "react";
import SelectedAttributes from "../attributes/SelectedAttributes.jsx";
import ChangeCartItemQuantity from "../ChangeCartItemQuantity.jsx";

const CartOverlayItem = ({ singleProduct, selectedCurrency, handleAddProduct, handleRemoveProduct }) => {
  const [pricing, setPricing] = useState("");
  const [priceAmount, setPriceAmount] = useState("");
  const getPricing = () => {
    const price = getPrice(singleProduct.prices, selectedCurrency);
    setPricing(price);
  };
  const filterCurrency = (item, selectedCurrency) => {
    const [correctPrice] = item?.prices?.filter((price) => {
      return price.currency.symbol === selectedCurrency;
    });
    setPriceAmount(correctPrice.amount.toFixed(2));
    setPricing(correctPrice);
  };

  const getPrice = (prices, currency) => {
    const [correctPrice] = prices.filter(
      (price) => price.currency.symbol === currency
    );
    setPriceAmount(correctPrice.amount.toFixed(2));
    return correctPrice;
  };

  useEffect(() => {
    getPricing();
  }, []);

  useEffect(() => {
    filterCurrency(singleProduct, selectedCurrency);
  }, [selectedCurrency]);

    return (
      <article className="cartoverlay-products-single">
        <section className="cart-overlay-item">
          <section className="cart-overlay-item-data">
            <section className="titles-block">
              <h4>{singleProduct.brand}</h4>
              <h4>{singleProduct.name}</h4>
              <div className="cartoverlay-item-pricing">
                <p className="product-price">
                  {pricing?.currency?.symbol}
                  {priceAmount}
                </p>
              </div>
            </section>

            {singleProduct?.attributes?.map((attribute) => (
              <SelectedAttributes
                className="cart-overlay-item-attr"
                key={attribute.id}
                attribute={attribute}
                userSelectedAttributes={singleProduct.userSelectedAttributes}
                singleProduct={singleProduct}
              />
            ))}
          </section>
        </section>
        <ChangeCartItemQuantity
          className="cartoverlay-product-interaction"
          handleAddProduct={handleAddProduct}
          handleRemoveProduct={handleRemoveProduct}
          singleProduct={singleProduct}
        />
        <img
          className="cart-overlay-image"
          src={singleProduct.gallery[0]}
          alt={singleProduct.name}
        />
      </article>
    );
};

export default CartOverlayItem;
