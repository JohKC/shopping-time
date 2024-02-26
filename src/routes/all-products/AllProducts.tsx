import { useState } from "react";
import CategoryAllHero from "../../assets/images/product-listing-images/category-all-hero.mp4";
import CategoryBlousesHero from "../../assets/images/product-listing-images/category-blouses-hero.mp4";
import CategoryDressesHero from "../../assets/images/product-listing-images/category-dresses-hero.mp4";
import CategoryJeansHero from "../../assets/images/product-listing-images/category-jeans-hero.mp4";
import CategoryShoesHero from "../../assets/images/product-listing-images/category-shoes-hero.mp4";
import { AttributeItem } from "../../models/AttributeItem";
import { Currency } from "../../models/Currency";
import { Item } from "../../models/Item";
import Product from "./Product";
import "./all-products.css";

interface AllProductsProps {
  activeCategory: string;
  allProducts: Item[];
  selectedCurrency: Currency;
  handleAddProduct: (
    targetProduct: Item,
    userSelectedAttributes: AttributeItem[]
  ) => void;
  alertMessageMain: () => void;
}

const AllProducts = ({
  activeCategory,
  allProducts,
  selectedCurrency,
  handleAddProduct,
  alertMessageMain,
}: AllProductsProps) => {
  const [quickAddToCartVisible, setQuickAddToCartVisible] = useState(false);
  const [activeItem, setActiveItem] = useState<Item>();

  const toggleQuickCart = () => {
    setQuickAddToCartVisible(!quickAddToCartVisible);
  };
  const removeQuickAddToCart = () => {
    setQuickAddToCartVisible(false);
  };

  return (
    <article>
      <article className='products-hero'>
        <h2>
          {activeCategory === "all"
            ? "Boost your style sense!"
            : activeCategory === "dresses"
              ? "Let's create your own style"
              : activeCategory === "blouses"
                ? "The joy of dressing"
                : activeCategory === "shoes"
                  ? "Unlock your style"
                  : activeCategory === "jeans"
                    ? "Fashion never sleeps"
                    : "Boost your style sense!"}
        </h2>
        <video autoPlay loop muted playsInline key={activeCategory}>
          <source
            src={
              activeCategory === "all"
                ? CategoryAllHero
                : activeCategory === "dresses"
                  ? CategoryDressesHero
                  : activeCategory === "blouses"
                    ? CategoryBlousesHero
                    : activeCategory === "shoes"
                      ? CategoryShoesHero
                      : activeCategory === "jeans"
                        ? CategoryJeansHero
                        : CategoryAllHero
            }
            type='video/mp4'
          />
        </video>
      </article>
      <article className='product-listing-page'>
        <h3 className='active-category'>{activeCategory}</h3>
        <section className='store-products'>
          {allProducts.length > 0
            ? allProducts.map((item) => (
                <Product
                  key={item.id}
                  item={item}
                  selectedCurrency={selectedCurrency}
                  handleAddProduct={handleAddProduct}
                  alertMessageMain={alertMessageMain}
                  toggleQuickCart={toggleQuickCart}
                  quickAddToCartVisible={quickAddToCartVisible}
                  removeQuickAddToCart={removeQuickAddToCart}
                  setActiveItem={setActiveItem}
                  activeItem={activeItem}
                />
              ))
            : "Loading..."}
        </section>
      </article>
    </article>
  );
};

export default AllProducts;
