"use client";
import AdminTabs from "@/components/Layout/UserTabs/userTabs";
import MenuItemPriceProps from "@/components/Admin/MenuItemsProps/menuItemsProps";
import { useProfile } from "@/menu/useProfile";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useEdgeStore } from "@/app/lib/edgestore";
import Image from "next/image";
interface Category {
  _id?: string;
  name: string;
}
interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}
interface ExtraPrice {
  name: string;
  price: number;
}
const EditMenuItems = () => {
  const { id } = useParams();
  const [file, setFile] = useState<File>();
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
  const { edgestore } = useEdgeStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState("");
  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        const item = items.find((i: MenuItem) => i._id === id);
        setName(item.name);
        setPrice(item.price);
        setDescription(item.description);
        setSizes(item.sizes);
        setExtraIngridientPrices(item.extraIngridientPrices);
        setCategory(item.category);
        setImage(item.image);
      });
    });
  }, []);
  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);
  const handleDeleteItem = async () => {
    const newPromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
        setRedirect(true);
      } else {
        reject();
      }
    });
    toast.promise(newPromise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error",
    });
  };
  const handleFormSubmit = async (ev: any) => {
    ev.preventDefault();
    let imageUrl = "";
    if (file) {
      const res = await edgestore.myPublicImages.upload({ file });
      imageUrl = res.url;
    } else {
      imageUrl = image;
    }
    const data = {
      image: imageUrl,
      name,
      description,
      price,
      _id: id,
      extraIngridientPrices,
      sizes,
      category,
    };
    const savingPromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
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
        <button className="max-w-lg mx-auto my-4">
          <Link href={"/menu-items"}>Vrati se na listu proizvoda</Link>
        </button>
        <div className="flex items-center gap-2">
          <div className="grow">
            <h2 className="text-md text-gray-400">Uredi naziv</h2>
            <input
              type="text"
              value={name}
              onChange={(ev) => {
                setName(ev.target.value);
              }}
            />
            <h2 className="text-md text-gray-400 mt-4">Slika</h2>
            {file ? (
              "Slika je izmijenjena!"
            ) : (
              <Image src={image} width={240} height={240} alt="slika artikla" />
            )}
            <label>
              <input
                type="file"
                className="hidden"
                onChange={(e: any) => {
                  setFile(e.target.files?.[0]);
                }}
              />
              <span className="block border border-gray-300 rounded-lg p-2 mt-5 text-center cursor-pointer">
                Izmijeni sliku
              </span>
            </label>
            <h2 className="text-md text-gray-400">Opis</h2>
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
              }}
            >
              {categories.length > 0 &&
                categories.map((item) => (
                  <option value={item._id}>{item.name}</option>
                ))}
            </select>
            <h2 className="text-md text-gray-400">Cijena</h2>
            <input
              type="text"
              value={price}
              onChange={(ev) => {
                setPrice(ev.target.value);
              }}
            />
            <MenuItemPriceProps
              name={"Veličine"}
              label={"Dodaj veličine"}
              props={sizes}
              setProps={setSizes}
            />
            <MenuItemPriceProps
              name={"Dodatni sastojci"}
              label={"Dodaj sastojke"}
              props={extraIngridientPrices}
              setProps={setExtraIngridientPrices}
            />
            <button type="submit" className="my-5">
              Sačuvaj
            </button>
            <button type="button" onClick={handleDeleteItem}>
              Obriši ovaj artikal
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default EditMenuItems;
