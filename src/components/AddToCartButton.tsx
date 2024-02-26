import React from "react";
import { Item } from "../models/Item";
import { AttributeItem } from "../models/AttributeItem";

interface AddToCartButtonProps {
  item?: Item;
  allAttributesAreSelected: boolean;
  selectedAttributes: AttributeItem[];
  handleAddProduct: (
    targetProduct: Item,
    userSelectedAttributes: AttributeItem[]
  ) => void;
  className: string;
  alertMessageMain: () => void;
  setActiveItem?: React.Dispatch<React.SetStateAction<Item | undefined>>;
}

const AddToCartButton = ({
  item,
  allAttributesAreSelected,
  selectedAttributes,
  handleAddProduct,
  className,
  alertMessageMain,
  setActiveItem,
}: AddToCartButtonProps) => {
  return (
    <div className={className}>
      <button
        onClick={() => {
          item && handleAddProduct(item, selectedAttributes);
          alertMessageMain();
          if (className === "quick-addtocart") {
            setActiveItem && setActiveItem(undefined);
          }
        }}
        className={
          item?.inStock && allAttributesAreSelected
            ? "active-add-to-cart"
            : "inactive-add-to-cart"
        }
        disabled={!item?.inStock || !allAttributesAreSelected}>
        {item?.inStock ? "ADD TO CART" : "OUT OF STOCK"}
      </button>
    </div>
  );
};

export default AddToCartButton;
