"use client";
import MenuItem from "@/components/Home/HomeMenu/MenuItem/menuItem";
import { useEffect, useState } from "react";
interface MenuItem {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  sizes: [];
  extraIngridientPrices: [];
}
interface Category {
  _id?: string;
  name: string;
}
const Menu = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);
  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);
  return (
    <section>
      {categories?.length > 0 &&
        categories?.map((category) => (
          <div key={category._id}>
            <h1 className=" text-orange-500 text-3xl font-extrabold font lg:text-4xl m-10">
              {category.name}
            </h1>
            <div className="flex flex-row flex-wrap gap-6 mx-8">
              {menuItems.length > 0 &&
                menuItems
                  .filter((item) => item.category === category._id)
                  .map((item) => (
                    <div key={item._id}>
                      <MenuItem
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        sizes={item.sizes}
                        extraIngredientPrices={item.extraIngridientPrices}
                        image={item.image}
                      />
                    </div>
                  ))}
            </div>
          </div>
        ))}
    </section>
  );
};
export default Menu;
