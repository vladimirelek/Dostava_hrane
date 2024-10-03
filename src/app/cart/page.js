"use client";
import { CartContext } from "@/components/AppContext";
import { useContext, useEffect, useState } from "react";
import { cartProductPrice } from "@/components/AppContext";
import AdressForm from "@/components/Layout/AdressForm/adressForm";
import { useProfile } from "@/menu/useProfile";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import CartProduct from "@/components/CartProduct/cartProduct";
const Cart = () => {
  const [adress, setAdress] = useState({});
  const { cartProducts, removeCartProduct, clearCart } =
    useContext(CartContext);
  const { user } = useProfile();
  const router = useRouter();
  const proceedToCheckout = async (ev) => {
    ev.preventDefault();
    const promise = new Promise((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adress,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          router.push("/orders");
          clearCart();
          resolve();
        } else {
          reject();
        }
      });
    });
    await toast.promise(promise, {
      loading: "Vaša narudzba se učitava!",
      success: "Vasa narudzba je primljena!",
      error: "Došlo je do greške!",
    });
  };
  useEffect(() => {
    if (user?.city) {
      const { phone, street, city, postalCode } = user;

      const adressFormProfile = {
        phone,
        street,
        city,
        postalCode,
      };
      setAdress(adressFormProfile);
    }
  }, [user]);
  let total = 0;
  for (const p of cartProducts) {
    total += cartProductPrice(p);
  }
  const handleAdressChange = (propName, value) => {
    setAdress((prevAdress) => ({ ...prevAdress, [propName]: value }));
  };
  const isAdressComplete =
    adress.phone && adress.street && adress.city && adress.postalCode;
  return (
    <section className="mt-8 mx-10 ">
      <div className="text-center">
        <h1 className=" text-orange-500 text-3xl font-extrabold font lg:text-4xl m-10">
          KORPA
        </h1>
      </div>
      <div className="flex justify-evenly flex-wrap">
        <div>
          {cartProducts?.length === 0 && <h3>Vaša korpa je prazna</h3>}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div key={product.name}>
                <CartProduct
                  product={product}
                  onRemove={removeCartProduct}
                  index={index}
                />
              </div>
            ))}
          <div className="py-4 text-right pr-16">
            <span>Ukupno:</span>
            <span className="text-lg font-semibold pl-2">{total}KM</span>
          </div>
        </div>
        <div className="bg-gray-100 p-10 m-10 rounded-lg">
          <h2>Checkout</h2>
          <form>
            <AdressForm
              adressProps={adress}
              setAdressProps={handleAdressChange}
            />

            <div className="py-2 text-gray-500">
              <span className="text-black font-bold inline-block w-8">
                Dostava:2KM
              </span>
            </div>
            <button
              type="submit"
              onClick={proceedToCheckout}
              disabled={!isAdressComplete}
            >
              Ukupno {total + 2}KM
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default Cart;
