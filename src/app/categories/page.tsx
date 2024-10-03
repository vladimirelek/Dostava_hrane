"use client";
import AdminTabs from "@/components/Layout/UserTabs/userTabs";
import error from "next/error";
import { useProfile } from "@/menu/useProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Category } from "@/models/Category";
interface Category {
  _id?: string;
  name: string;
}
const Categories = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const { loading: profileLoading, data: admin } = useProfile();
  const [editedCategory, setEditetCategory] = useState<Category | null>(null);
  const fetchCategories = () => {
    fetch("/api/categories").then((res) => {
      res.json().then((items) => {
        setCategories(items);
      });
    });
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  if (!admin) {
    return <h1>Nisi admin</h1>;
  }
  if (profileLoading) {
    return "Loading info...";
  }
  const handleDeleteCategory = async (_id: string | undefined) => {
    const newPromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
        fetchCategories();
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
  const handleNewCategorySubmit = async (ev: any) => {
    ev.preventDefault();
    const newPromise = new Promise<void>(async (resolve, reject) => {
      const data: Category = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setEditetCategory(null);
      fetchCategories();
      if (response.ok) {
        setCategoryName("");
        resolve();
      } else reject();
    });
    await toast.promise(newPromise, {
      loading: editedCategory
        ? "Editing category..."
        : "Creating your new category",
      success: editedCategory ? "Category updated" : "Category created",
      error: "Sorry, error",
    });
  };

  return (
    <section>
      <AdminTabs isAdmin={true} />
      <form className="mx-auto max-w-lg" onSubmit={handleNewCategorySubmit}>
        <div className="flex justify-center items-end">
          <div className="flex grow">
            <input
              type="text"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
              placeholder={
                editedCategory
                  ? `Uredi kategoriju ${editedCategory.name}`
                  : "Kreiraj novu kategoriju"
              }
            />
          </div>
          <div className="pb-3 mx-4 flex flex-row gap-3">
            <button type="submit">
              {editedCategory ? "Uredi" : "Kreiraj"}
            </button>
            {editedCategory ? (
              <button
                type="button"
                onClick={() => {
                  setEditetCategory(null);
                }}
              >
                {"Prekini"}
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <ul>
          <li>
            {categories.length > 0 &&
              categories.map((item) => (
                <div className="my-3 " key={item._id}>
                  <h2 className="text-md text-gray-400">Uredi kategoriju</h2>
                  <div className="flex justify-between items-center bg-gray-100 rounded-lg p-2 px-4 gap-2">
                    <span>{item.name}</span>
                    <div className="flex flex-row gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditetCategory(item);
                        }}
                      >
                        Uredi
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleDeleteCategory(item._id);
                        }}
                      >
                        Obriši
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </li>
        </ul>
      </form>
    </section>
  );
};
export default Categories;
