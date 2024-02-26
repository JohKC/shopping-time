import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import { useActiveCategory } from "./components/hooks/useActiveCategory";
import { categoriesObj, currenciesObj, itemsObj } from "./data/all-products.js";
import { AttributeItem } from "./models/AttributeItem";
import { CheckoutForm } from "./models/CheckoutForm";
import { Currency } from "./models/Currency";
import { Item } from "./models/Item";
import { Price } from "./models/Price";
import AllProducts from "./routes/all-products/AllProducts";
import Cart from "./routes/cart/Cart";
import Checkout from "./routes/checkout/Checkout";
import Landing from "./routes/landing/Landing";
import NotFound from "./routes/not-found/NotFound";
import Order from "./routes/order/Order";
import SingleProduct from "./routes/single-product/SingleProduct";

const App = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>({
    label: "USD",
    symbol: "$",
  });
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [taxes, setTaxes] = useState("");
  const [productsQuantity, setProductsQuantity] = useState(0);
  const [orderFormValue, setOrderFormValue] = useState<CheckoutForm>();
  const { activeCategory } = useActiveCategory();

  const clearCart = () => {
    setCartItems([]);
    setProductsQuantity(0);
    localStorage.removeItem("cartItems");
    localStorage.removeItem("productsQuantity");
  };

  useEffect(() => {
    const storedSelectedCurrency = localStorage.getItem("selectedCurrency");
    if (storedSelectedCurrency) {
      const activeCurrency: Currency = JSON.parse(storedSelectedCurrency);
      setSelectedCurrency(activeCurrency);
    }
  }, []);

  const changeCurrency = (newSelectedCurrency: Currency) => {
    setSelectedCurrency(newSelectedCurrency);
    localStorage.setItem(
      "selectedCurrency",
      JSON.stringify(newSelectedCurrency)
    );
  };

  const getProducts = (targetcategory: string) => {
    const targetProducts: Item[] =
      targetcategory === "all"
        ? itemsObj
        : itemsObj.filter((item) => item.category === targetcategory);
    return targetProducts;
  };

  const matchAttributes = (
    userSelectedAttributes: AttributeItem[],
    targetProduct: Item
  ) => {
    const attributesMatch = (
      groupOne: AttributeItem,
      groupTwo?: AttributeItem
    ) => {
      return (
        Object.values(groupOne)[1] ===
        Object.values(groupTwo as AttributeItem)[1]
      );
    };

    let truthyValuesCounter = 0;
    let i = 0;
    while (i < userSelectedAttributes.length) {
      if (
        attributesMatch(
          userSelectedAttributes[i],
          targetProduct?.userSelectedAttributes &&
            targetProduct.userSelectedAttributes[i]
        )
      ) {
        truthyValuesCounter += 1;
      }
      i += 1;
    }

    return truthyValuesCounter === userSelectedAttributes?.length;
  };

  const updateCartQuantity = (
    actionToPerfrom: string,
    productAlreadyInCart: Item,
    userSelectedAttributes: AttributeItem[]
  ) => {
    const repeatableProduct = checkRepeatableProducts(
      cartItems,
      productAlreadyInCart,
      userSelectedAttributes
    );
    const indexOfRepeatableProduct = cartItems.indexOf(
      repeatableProduct as Item
    );
    const currentProductList = [...cartItems];
    if (actionToPerfrom === "addProduct") {
      (currentProductList[indexOfRepeatableProduct].quantity as number) += 1;
    } else {
      (currentProductList[indexOfRepeatableProduct].quantity as number) -= 1;
    }

    return currentProductList;
  };

  const checkRepeatableProducts = (
    cartItems: Item[],
    targetProduct: Item,
    userSelectedAttributes: AttributeItem[]
  ) => {
    let item: Item | undefined;
    const productsById = cartItems.filter(
      (item) => item.id === targetProduct.id
    );
    productsById.forEach((targetProduct) => {
      if (matchAttributes(userSelectedAttributes, targetProduct)) {
        item = targetProduct;
      }
    });
    return item;
  };

  const handleAddProduct = (
    targetProduct: Item,
    userSelectedAttributes: AttributeItem[]
  ) => {
    let updatedProductList: Item[];
    const productAlreadyInCart = checkRepeatableProducts(
      cartItems,
      targetProduct,
      userSelectedAttributes
    );

    if (productAlreadyInCart) {
      updatedProductList = updateCartQuantity(
        "addProduct",
        productAlreadyInCart,
        userSelectedAttributes
      );
    } else {
      const modifiedProduct: Item = JSON.parse(JSON.stringify(targetProduct));

      for (let i = 0; i < targetProduct?.attributes?.length; i++) {
        for (let j = 0; j < targetProduct?.attributes[i]?.items?.length; j++) {
          if (
            targetProduct.attributes[i].items[j].value ===
            userSelectedAttributes[i].value
          ) {
            modifiedProduct.attributes[i].items[j].isSelected = true;
          }
        }
      }
      updatedProductList = [
        ...cartItems,
        {
          ...modifiedProduct,
          userSelectedAttributes,
          quantity: 1,
        },
      ];
    }

    // Create unique id
    updatedProductList.map((updatedProduct) => {
      const firstValue = Object.values(
        (updatedProduct.userSelectedAttributes &&
          updatedProduct.userSelectedAttributes[0]) ||
          []
      );
      const secondValue = Object.values(
        (updatedProduct.userSelectedAttributes &&
          updatedProduct.userSelectedAttributes[1]) ||
          []
      );
      const thirdValue = Object.values(
        (updatedProduct.userSelectedAttributes &&
          updatedProduct.userSelectedAttributes[2]) ||
          []
      );

      const productId = updatedProduct.id;
      return (updatedProduct.uniqueId = `${productId}-${firstValue}-${secondValue}-${thirdValue}`);
    });
    // Update cart items
    setCartItems(updatedProductList);
    localStorage.setItem("cartItems", JSON.stringify(updatedProductList));

    // Update cart quantity
    if (updatedProductList.length <= 1) {
      updatedProductList.map((item) => {
        localStorage.setItem("productsQuantity", JSON.stringify(item.quantity));
        setProductsQuantity(item.quantity ?? 0);
      });
    } else {
      const productListArray = updatedProductList.map((item) => item.quantity);
      const sum = productListArray.reduce(
        (a, b) => (a as number) + (b as number),
        0
      );
      setProductsQuantity(sum ?? 0);
      localStorage.setItem("productsQuantity", JSON.stringify(sum));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("cartItems") !== null) {
      const jsonCartItems = localStorage.getItem("cartItems") ?? "";
      const cartItems = JSON.parse(jsonCartItems);
      setCartItems(cartItems);
    }
    if (localStorage.getItem("productsQuantity") !== null) {
      const jsonProductsQuantity =
        localStorage.getItem("productsQuantity") ?? "";
      const productsQuantity = JSON.parse(jsonProductsQuantity);
      setProductsQuantity(productsQuantity);
    }
  }, []);

  const alertMessageMain = () => {
    const alertMessage = document.querySelector(".success-alert");
    alertMessage?.classList.add("visible");
    setTimeout(() => {
      alertMessage?.classList.remove("visible");
    }, 1000);
  };

  const handleRemoveProduct = (
    targetProduct: Item,
    userSelectedAttributes: AttributeItem[]
  ) => {
    let updatedProductList;
    const repeatableProduct = checkRepeatableProducts(
      cartItems,
      targetProduct,
      userSelectedAttributes
    );
    if ((repeatableProduct?.quantity ?? 0) > 1) {
      updatedProductList = updateCartQuantity(
        "removeProduct",
        repeatableProduct as Item,
        userSelectedAttributes
      );
    } else {
      const products = [...cartItems];
      const indexOfProduct = products.indexOf(repeatableProduct as Item);
      products.splice(indexOfProduct, 1);
      updatedProductList = products;
    }

    // Update cart items
    setCartItems(updatedProductList);
    localStorage.setItem("cartItems", JSON.stringify(updatedProductList));

    // Update cart quantity
    if (updatedProductList.length <= 1) {
      updatedProductList.map((item) => {
        localStorage.setItem("productsQuantity", JSON.stringify(item.quantity));
        setProductsQuantity(item.quantity as number);
      });
    } else {
      const productListArray = updatedProductList.map((item) => item.quantity);
      const sum = productListArray.reduce(
        (a, b) => (a as number) + (b as number)
      );
      setProductsQuantity(sum as number);
      localStorage.setItem("productsQuantity", JSON.stringify(sum));
    }
    if (updatedProductList.length === 0) {
      setProductsQuantity(0);
      localStorage.setItem("productsQuantity", JSON.stringify(0));
    }
  };
  const getPrice = (prices: Price[], currency: Currency) => {
    return prices.filter(
      (price) => price.currency.symbol === currency.symbol
    )[0];
  };

  // get total price of cart items
  const getTotalPrice = useCallback(
    (selectedCurrency: Currency, cartItems: Item[]) => {
      let totalPayment = 0;
      for (const item of cartItems) {
        const correctPrice = getPrice(item.prices, selectedCurrency);

        totalPayment =
          totalPayment + correctPrice.amount * (item.quantity as number);
      }

      totalPayment = parseFloat(totalPayment.toFixed(2));

      setTotalPayment(totalPayment);
      setTaxes(((totalPayment * 21) / 100).toFixed(2));
    },
    [setTotalPayment, setTaxes]
  );

  useEffect(() => {
    getTotalPrice(selectedCurrency, cartItems);
  }, [cartItems, selectedCurrency, getTotalPrice]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [activeCategory]);

  return (
    <>
      <Header
        productsQuantity={productsQuantity}
        allCategories={categoriesObj}
        activeCategory={activeCategory}
        selectedCurrency={selectedCurrency}
        allCurrencies={currenciesObj}
        changeCurrency={changeCurrency}
        totalPayment={totalPayment}
        cartItems={cartItems}
        handleRemoveProduct={handleRemoveProduct}
        handleAddProduct={handleAddProduct}
        clearCart={clearCart}
      />

      <Routes>
        <Route path='/' element={<Landing />} />
        {categoriesObj.map(({ name }) => (
          <Route
            key={name}
            path={`/store/${name}`}
            element={
              <AllProducts
                activeCategory={name}
                allProducts={getProducts(name)}
                selectedCurrency={selectedCurrency}
                handleAddProduct={handleAddProduct}
                alertMessageMain={alertMessageMain}
              />
            }
          />
        ))}
        <Route
          path={`/store/item/:id`}
          element={
            <SingleProduct
              selectedCurrency={selectedCurrency}
              handleAddProduct={handleAddProduct}
              alertMessageMain={alertMessageMain}
            />
          }
        />
        <Route
          path='/cart'
          element={
            <Cart
              productsQuantity={productsQuantity}
              cartItems={cartItems}
              selectedCurrency={selectedCurrency}
              totalPayment={totalPayment}
              taxes={taxes}
              handleRemoveProduct={handleRemoveProduct}
              handleAddProduct={handleAddProduct}
              clearCart={clearCart}
            />
          }
        />
        <Route
          path='/checkout'
          element={
            cartItems.length > 0 ? (
              <Checkout setOrderFormValue={setOrderFormValue} />
            ) : (
              <NotFound />
            )
          }
        />
        <Route
          path='/order'
          element={
            cartItems.length > 0 &&
            orderFormValue &&
            Object.keys(orderFormValue).length > 0 ? (
              <Order
                cartItems={cartItems}
                selectedCurrency={selectedCurrency}
                orderFormValue={orderFormValue}
                clearCart={clearCart}
              />
            ) : (
              <NotFound />
            )
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
