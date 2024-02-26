import React from "react";
import { Item } from "../../models/Item";

interface ProductShowcaseProps {
  singleProduct: Item;
}

const ProductShowcase = ({ singleProduct }: ProductShowcaseProps) => {
  return (
    <>
      {singleProduct && singleProduct.gallery && (
        <section className='product-showcase'>
          {singleProduct.gallery.map((image, index) => (
            <img key={`image-number-${index}`} src={image} alt='' />
          ))}
        </section>
      )}
    </>
  );
};

export default ProductShowcase;
