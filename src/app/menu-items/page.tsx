"use client";
import AdminTabs from "@/components/Layout/UserTabs/userTabs";
import { useProfile } from "@/menu/useProfile";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}
const MenuItems = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>();
  const { loading: profileLoading, data: admin } = useProfile();
  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);
  if (!admin) {
    return <h1>Nisi admin</h1>;
  }
  if (profileLoading) {
    return "Loading info...";
  }
  return (
    <section className="mt-2">
      <AdminTabs isAdmin={true} />
      <button className="max-w-lg mx-auto">
        <Link href={"/menu-items/new"}>Napravi novi proizvod</Link>
      </button>
      <div className="flex flex-row flex-wrap gap-5 mx-16">
        {menuItems != undefined &&
          menuItems.map((item) => (
            <div className="flex flex-col items-center ">
              <h2 className="text-sm text-gray-500 mt-8 ">Uredi artikal</h2>

              <Link
                href={"/menu-items/edit/" + item._id}
                className="border border-gray-500 rounded-xl px-6 py-2  mx-7 "
              >
                <div className="flex justify-center flex-col items-center">
                  <b>{item.name}</b>
                  <Image
                    src={item.image}
                    width={200}
                    height={200}
                    alt={"Slika artikla"}
                  />
                </div>
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
};
export default MenuItems;
