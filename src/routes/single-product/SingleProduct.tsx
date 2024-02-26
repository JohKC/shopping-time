import React, { useCallback, useEffect, useState } from "react";
import Attribute from "../../components/attributes/Attributes";
import AddToCartButton from "../../components/AddToCartButton";
import ProductShowcase from "./ProductShowcase";
import ProductTitles from "./ProductTitles";
import { itemsObj } from "../../data/all-products.js";
import { resetLocation } from "../../helpers/reset-location";
import { Currency } from "../../models/Currency";
import { AttributeItem } from "../../models/AttributeItem";
import { Item } from "../../models/Item";
import { useLocation } from "react-router-dom";

interface SingleProductProps {
  selectedCurrency: Currency;
  handleAddProduct: (
    targetProduct: Item,
    userSelectedAttributes: AttributeItem[]
  ) => void;
  alertMessageMain: () => void;
}

const SingleProduct = ({
  selectedCurrency,
  handleAddProduct,
  alertMessageMain,
}: SingleProductProps) => {
  const [selectedAttributes, setSelectedAttributes] = useState<AttributeItem[]>(
    []
  );
  const [allAttributesAreSelected, setAllAttributesAreSelected] =
    useState(false);
  const [singleProduct, setSingleProduct] = useState<Item>();
  const [priceAmount, setPriceAmount] = useState("");
  const location = useLocation();

  useEffect(() => {
    document.title = `${singleProduct?.name} | Shopping Time`;
  }, [singleProduct]);

  const filterCurrency = (singleProduct: Item, selectedCurrency: Currency) => {
    const price = singleProduct?.prices?.filter(
      (price) => price.currency.symbol === selectedCurrency.symbol
    )[0];
    setPriceAmount(price?.amount?.toFixed(2));
  };

  const getProductById = useCallback(
    (uniqueId: string) => {
      const targetProduct = itemsObj.find((item) => item.id === uniqueId);

      if (targetProduct) {
        setSingleProduct(targetProduct);
        filterCurrency(targetProduct, selectedCurrency);

        if (targetProduct.attributes.length === 0) {
          setAllAttributesAreSelected(true);
        }
      }
    },
    [selectedCurrency]
  );

  useEffect(() => {
    const pathname = location.pathname.split("/");
    const id = pathname[pathname.length - 1];
    getProductById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProductById]);

  useEffect(() => {
    resetLocation();
  }, []);

  const handleSelectedAttributes = (newSelectedAttribute: AttributeItem) => {
    const userSelectedAttributes = [...selectedAttributes];
    const existingAttributeIndex = userSelectedAttributes.findIndex(
      (attribute) => attribute.id === newSelectedAttribute.id
    );

    if (existingAttributeIndex !== -1) {
      userSelectedAttributes[existingAttributeIndex] = newSelectedAttribute;
    } else {
      userSelectedAttributes.push(newSelectedAttribute);
    }
    setSelectedAttributes(userSelectedAttributes);

    if (userSelectedAttributes.length === singleProduct?.attributes.length) {
      setAllAttributesAreSelected(true);
    }
  };
  return (
    <main>
      {singleProduct && <ProductTitles singleProduct={singleProduct} />}
      <section className='single-product'>
        {singleProduct && <ProductShowcase singleProduct={singleProduct} />}
        <section className='data'>
          {singleProduct?.attributes?.map((attribute) => (
            <Attribute
              className='attribute'
              key={attribute.id}
              attribute={attribute}
              handleSelectedAttributes={handleSelectedAttributes}
            />
          ))}
          <section className='pricing-section'>
            <h3 className='price-title'> Price:</h3>
            <div className='single-product-pricing'>
              <p className='product-price'>
                {selectedCurrency.symbol}
                {priceAmount}
              </p>
            </div>
          </section>
          <AddToCartButton
            className='addtocart'
            alertMessageMain={alertMessageMain}
            handleAddProduct={handleAddProduct}
            item={singleProduct}
            allAttributesAreSelected={allAttributesAreSelected}
            selectedAttributes={selectedAttributes}
          />
          <section
            className='description'
            dangerouslySetInnerHTML={{
              __html: singleProduct?.description ?? "",
            }}></section>
        </section>
      </section>
    </main>
  );
};

export default SingleProduct;
