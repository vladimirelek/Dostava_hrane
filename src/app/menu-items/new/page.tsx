"use client";
import { useEdgeStore } from "@/app/lib/edgestore";
import AdminTabs from "@/components/Layout/UserTabs/userTabs";
import MenuItemPriceProps from "@/components/Admin/MenuItemsProps/menuItemsProps";
import { useProfile } from "@/menu/useProfile";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface ExtraPrice {
  name: string;
  price: number;
}
interface Category {
  _id?: string;
  name: string;
}
const NewMenuItems = () => {
  const { edgestore } = useEdgeStore();
  const selectRef = useRef(null);
  const { loading: profileLoading, data: admin } = useProfile();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [redirectToItems, setRedirect] = useState(false);
  const [sizes, setSizes] = useState<ExtraPrice[]>([]);
  const [extraIngridientPrices, setExtraIngridientPrices] = useState<
    ExtraPrice[]
  >([]);
  const [file, setFile] = useState<File>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<string | undefined>("");

  const handleFormSubmit = async (ev: any) => {
    ev.preventDefault();
    let imageUrl = "";
    if (file) {
      const res = await edgestore.myPublicImages.upload({ file });
      imageUrl = res.url;
    }
    const data = {
      image: imageUrl,
      name,
      description,
      price,
      sizes,
      extraIngridientPrices,
      category,
    };

    const savingPromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(savingPromise, {
      loading: "Saving this tasty item",
      success: "Saved",
      error: "Error",
    });
    setRedirect(true);
  };

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
        setCategory(categories[0]._id);
      });
    });
  }, []);
  if (redirectToItems) {
    return redirect("/menu-items");
  }
  if (!admin) {
    return <h1>Nisi admin</h1>;
  }
  if (profileLoading) {
    return "Loading info...";
  }
  return (
    <div>
      <AdminTabs isAdmin={true} />
      <form className="mt-8 max-w-md mx-auto" onSubmit={handleFormSubmit}>
        <button className="max-w-lg mx-auto">
          <Link href={"/menu-items"}>Vrati se na listu proizvoda</Link>
        </button>
        <div className="flex items-center gap-2">
          <div className="grow">
            <h2 className="text-md text-gray-400 mt-4">Dodaj novu stavku</h2>
            <input
              type="text"
              value={name}
              onChange={(ev) => {
                setName(ev.target.value);
              }}
            />
            <h2 className="text-md text-gray-400 mt-4">Slika</h2>
            <label>
              <input
                type="file"
                className="hidden"
                onChange={(e: any) => {
                  setFile(e.target.files?.[0]);
                }}
              />
              <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
                Dodaj sliku
              </span>
            </label>
            <h2 className="text-md text-gray-400 mt-4">Opis</h2>
            <input
              type="text"
              value={description}
              onChange={(ev) => {
                setDescription(ev.target.value);
              }}
            />
            <h2 className="text-md text-gray-400">Kategorija</h2>
            <select
              value={category}
              onChange={(ev: any) => {
                setCategory(ev.target.value);
                console.log(ev.targe.value);
              }}
            >
              {categories.length > 0 &&
                categories.map((item) => (
                  <option value={item._id}>{item.name}</option>
                ))}
            </select>
            <h2 className="text-md text-gray-400 mt-4">Cijena</h2>
            <input
              type="text"
              value={price}
              onChange={(ev) => {
                setPrice(ev.target.value);
              }}
            />
            <MenuItemPriceProps
              name={"Veličine"}
              label={"Dodatne veličine"}
              props={sizes}
              setProps={setSizes}
            />
            <MenuItemPriceProps
              name={"Dodatni sastojci"}
              label={"Dodatni sastojci"}
              props={extraIngridientPrices}
              setProps={setExtraIngridientPrices}
            />
            <button type="submit" className="mt-4">
              Sačuvaj
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default NewMenuItems;
