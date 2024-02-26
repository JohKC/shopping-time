/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import Attributes from "../../components/attributes/Attributes";
import AddToCartButton from "../../components/AddToCartButton";
import { Item } from "../../models/Item";
import { AttributeItem } from "../../models/AttributeItem";

interface QuickAddToCartProps {
  item: Item;
  handleAddProduct: (
    targetProduct: Item,
    userSelectedAttributes: AttributeItem[]
  ) => void;
  handleSelectedAttributes: (newSelectedAttribute: AttributeItem) => void;
  selectedAttributes: AttributeItem[];
  allAttributesAreSelected: boolean;
  alertMessageMain: () => void;
  toggleQuickCart: () => void;
  setActiveItem: React.Dispatch<React.SetStateAction<Item | undefined>>;
}

const QuickAddToCart = ({
  item,
  handleAddProduct,
  handleSelectedAttributes,
  selectedAttributes,
  allAttributesAreSelected,
  alertMessageMain,
  setActiveItem,
}: QuickAddToCartProps) => {
  return (
    <section className='quick-addto-cart'>
      {item?.attributes?.map((attribute) => (
        <Attributes
          className='quick-attribute'
          key={attribute.id}
          attribute={attribute}
          handleSelectedAttributes={handleSelectedAttributes}
        />
      ))}
      <AddToCartButton
        className='quick-addtocart'
        handleAddProduct={handleAddProduct}
        item={item}
        allAttributesAreSelected={allAttributesAreSelected}
        selectedAttributes={selectedAttributes}
        alertMessageMain={alertMessageMain}
        setActiveItem={setActiveItem}
      />
      <p className='close-quickbuy' onClick={() => setActiveItem(undefined)}>
        close
      </p>
    </section>
  );
};

export default QuickAddToCart;
