/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import addToCart from "../../assets/images/add-to-cart.png";
import QuickAddToCart from "./QuickAddToCart";
import { Currency } from "../../models/Currency";
import { Item } from "../../models/Item";
import { AttributeItem } from "../../models/AttributeItem";
import { Price } from "../../models/Price";

interface ProductProps {
  selectedCurrency: Currency;
  item: Item;
  handleAddProduct: (
    targetProduct: Item,
    userSelectedAttributes: AttributeItem[]
  ) => void;
  alertMessageMain: () => void;
  toggleQuickCart: () => void;
  removeQuickAddToCart: () => void;
  quickAddToCartVisible: boolean;
  setActiveItem: React.Dispatch<React.SetStateAction<Item | undefined>>;
  activeItem?: Item;
}

const Product = ({
  selectedCurrency,
  item,
  handleAddProduct,
  alertMessageMain,
  toggleQuickCart,
  setActiveItem,
  activeItem,
}: ProductProps) => {
  const [pricing, setPricing] = useState<Price>();
  const [selectedAttributes, setSelectedAttributes] = useState<AttributeItem[]>(
    []
  );
  const [allAttributesAreSelected, setAllAttributesAreSelected] =
    useState(false);
  const [priceAmount, setPriceAmount] = useState("");
  const [imageShadow, setImageShadow] = useState(false);

  const filterCurrency = (item: Item, selectedCurrency: Currency) => {
    const correctPrice = item?.prices?.find(
      (price) => price.currency.symbol === selectedCurrency.symbol
    );

    if (correctPrice) {
      setPriceAmount(correctPrice.amount.toFixed(2));
      setPricing(correctPrice);
    }
  };

  const handleSelectedAttributes = (newSelectedAttribute: AttributeItem) => {
    const updatedAttributes = selectedAttributes.map((attribute) =>
      attribute.id === newSelectedAttribute.id
        ? { ...newSelectedAttribute }
        : attribute
    );

    if (
      !updatedAttributes.some(
        (attribute) => attribute.id === newSelectedAttribute.id
      )
    ) {
      updatedAttributes.push(newSelectedAttribute);
    }

    setSelectedAttributes(updatedAttributes);
  };

  const handleAllAttributesAreSelected = () => {
    setAllAttributesAreSelected(true);
  };

  const handleProductHasNoAttributes = () => {
    if (item.attributes.length === 0) {
      handleAllAttributesAreSelected();
    }
  };

  useEffect(() => {
    handleProductHasNoAttributes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterCurrency(item, selectedCurrency);
  }, [item, selectedCurrency]);

  useEffect(() => {
    if (selectedAttributes.length === item.attributes.length) {
      handleAllAttributesAreSelected();
    }
  }, [selectedAttributes, item.attributes.length]);

  return (
    <div
      className={`product-card ${imageShadow ? "product-shadow" : ""}`}
      style={!item.inStock ? { opacity: "0.55" } : { opacity: "1" }}
      onMouseEnter={() => {
        setImageShadow(true);
      }}
      onMouseLeave={() => {
        setImageShadow(false);
      }}>
      <Link to={`/store/item/${item.id}`} className='item-preview'>
        <div className='img-container'>
          {!item.inStock && <p className='out-of-stock-sign'>OUT OF STOCK</p>}
          <div
            className='item-preview-img'
            style={{ backgroundImage: `url(${item.gallery[0]})` }}></div>
        </div>
      </Link>
      <div>
        <p className='brand-name'>
          {item.brand} {item.name}
        </p>
        <p className='product-price'>
          {pricing?.currency?.symbol}
          {priceAmount}
        </p>
      </div>
      {!item.inStock ? null : activeItem?.id === item.id ? (
        <QuickAddToCart
          handleAddProduct={handleAddProduct}
          item={item}
          toggleQuickCart={toggleQuickCart}
          allAttributesAreSelected={allAttributesAreSelected}
          handleSelectedAttributes={handleSelectedAttributes}
          selectedAttributes={selectedAttributes}
          alertMessageMain={alertMessageMain}
          setActiveItem={setActiveItem}
        />
      ) : (
        <img
          className='quick-buy'
          src={addToCart}
          onClick={() => setActiveItem(item)}
          alt='Add to cart icon'
        />
      )}
    </div>
  );
};
export default Product;
