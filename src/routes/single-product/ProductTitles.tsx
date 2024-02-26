import React from "react";
import { Item } from "../../models/Item";

interface ProductTitlesProps {
  singleProduct: Item;
}

const ProductTitles = ({ singleProduct }: ProductTitlesProps) => {
  return (
    <section className='single-product-titles'>
      <p className='category'>Store / {singleProduct.category}</p>
      <h2 className='brand'>{singleProduct.brand}</h2>
      <h2 className='name'>{singleProduct.name}</h2>
    </section>
  );
};

export default ProductTitles;
