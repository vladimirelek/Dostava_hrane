"use client";
import { useEffect, useState } from "react";
import MenuItem from "./MenuItem/menuItem";
interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
}
interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sizes: [];
  extraIngridientPrices: [];
}
const Menu = () => {
  const [bestSeller, setBestSeller] = useState<MenuItem[]>([]);
  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        setBestSeller(items.slice(0, 3));
      });
    });
  }, []);
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="flex flex-col my-16 gap-4 text-orange-600">
        <h2 className="text-3xl font-extrabold font lg:text-5xl">
          NAJBOLJE PRODAVANI
        </h2>
      </div>
      <div className="flex justify-start gap-10 flex-wrap mx-44">
        {bestSeller.length > 0 &&
          bestSeller.map((item) => (
            <div key={item._id}>
              <MenuItem
                name={item.name}
                price={item.price}
                description={item.description}
                sizes={item.sizes}
                extraIngredientPrices={item.extraIngridientPrices}
                image={item.image}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
export default Menu;
