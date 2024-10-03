"use client";
import { createContext, useEffect } from "react";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";
export const CartContext = createContext({});
export function cartProductPrice(cartProduct) {
  let price = cartProduct.price;
  if (cartProduct.size) {
    price = cartProduct.size.price;
  }
  if (cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras) {
      price += extra.price;
    }
  }
  return price;
}
const AppProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  function saveCartProductsToLocalStorage(cartProducts) {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  }
  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }
  function removeCartProduct(indexToRemove) {
    setCartProducts((prevProducts) => {
      const newProducts = prevProducts.filter(
        (value, index) => index !== indexToRemove
      );
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
    toast.success("Artikal je obrisan!");
  }
  function addToCart(product, size = null, extras = []) {
    setCartProducts((prevProducts) => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }
  return (
    <>
      <Toaster />
      <SessionProvider>
        <CartContext.Provider
          value={{
            cartProducts,
            setCartProducts,
            addToCart,
            removeCartProduct,
            clearCart,
            cartProductPrice,
          }}
        >
          {children}
        </CartContext.Provider>
      </SessionProvider>
    </>
  );
};
export default AppProvider;
