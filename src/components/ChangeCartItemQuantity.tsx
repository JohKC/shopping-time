import React from "react";
import { AttributeItem } from "../models/AttributeItem";
import { Item } from "../models/Item";

interface ChangeCartItemQuantityProps {
  handleRemoveProduct: (
    targetProduct: Item,
    userSelectedAttributes: AttributeItem[]
  ) => void;
  handleAddProduct: (
    targetProduct: Item,
    userSelectedAttributes: AttributeItem[]
  ) => void;
  singleProduct: Item;
  className: string;
}

const ChangeCartItemQuantity = ({
  handleRemoveProduct,
  handleAddProduct,
  singleProduct,
  className,
}: ChangeCartItemQuantityProps) => {
  return (
    <section className={className}>
      <button
        onClick={() =>
          handleAddProduct(
            singleProduct,
            singleProduct.userSelectedAttributes as AttributeItem[]
          )
        }>
        +
      </button>
      <p>{singleProduct.quantity}</p>
      <button
        onClick={() =>
          handleRemoveProduct(
            singleProduct,
            singleProduct.userSelectedAttributes as AttributeItem[]
          )
        }>
        -
      </button>
    </section>
  );
};

export default ChangeCartItemQuantity;
