import React from "react";

const ProductShowcase = ({ singleProduct }) => {
  return (
    <>
      {singleProduct && singleProduct.gallery && (
        <section className="product-showcase">
          {singleProduct.gallery.map((image, index) => (
            <img key={`image-number-${index}`} src={image} alt="" />
          ))}
        </section>
      )}
    </>
  );
}

export default ProductShowcase;