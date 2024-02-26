import React, { useEffect, useState } from "react";
import SelectedAttributes from "../../components/attributes/SelectedAttributes";
import SimpleImageSlider from "react-simple-image-slider";
import ChangeCartItemQuantity from "../../components/ChangeCartItemQuantity";
import { Currency } from "../../models/Currency";
import { Item } from "../../models/Item";
import { AttributeItem } from "../../models/AttributeItem";

interface CartSingleItemProps {
  selectedCurrency: Currency;
  singleProduct: Item;
  handleAddProduct: (
    targetProduct: Item,
    userSelectedAttributes: AttributeItem[]
  ) => void;
  handleRemoveProduct: (
    targetProduct: Item,
    userSelectedAttributes: AttributeItem[]
  ) => void;
}

const CartSingleItem = ({
  selectedCurrency,
  singleProduct,
  handleAddProduct,
  handleRemoveProduct,
}: CartSingleItemProps) => {
  const [priceAmount, setPriceAmount] = useState("");

  useEffect(() => {
    const targetCurrency = singleProduct.prices.filter(
      (price) => price.currency.symbol === selectedCurrency.symbol
    )[0];
    setPriceAmount(targetCurrency.amount.toFixed(2));
  }, [selectedCurrency, singleProduct.prices]);

  return (
    <section className='cart-products-single'>
      <section className='cart-data'>
        <h2 className='product-brand'>{singleProduct.brand}</h2>
        <h2 className='product-name'>{singleProduct.name}</h2>

        <div className='cart-item-pricing'>
          <p className='product-price'>
            {selectedCurrency.symbol}
            {priceAmount}
          </p>
        </div>
        {singleProduct?.attributes?.map((attribute) => (
          <SelectedAttributes
            className='cart-attr'
            key={attribute.id}
            attribute={attribute}
          />
        ))}
      </section>
      <section className='cart-content'>
        <ChangeCartItemQuantity
          className='cart-product-interaction'
          handleAddProduct={handleAddProduct}
          handleRemoveProduct={handleRemoveProduct}
          singleProduct={singleProduct}
        />
        {singleProduct.gallery.length === 1 ? (
          <SimpleImageSlider
            images={singleProduct.gallery}
            showNavs={false}
            width={290}
            height={288}
            showBullets={true}
          />
        ) : (
          <SimpleImageSlider
            images={singleProduct.gallery}
            showNavs={true}
            width={200}
            height={200}
            navSize={10}
            navStyle={2}
            bgColor='#FFFF'
            showBullets={true}
          />
        )}
      </section>
    </section>
  );
};

export default CartSingleItem;
