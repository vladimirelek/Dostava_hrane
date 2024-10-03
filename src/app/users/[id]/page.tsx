"use client";
import AdminTabs from "@/components/Layout/UserTabs/userTabs";
import UserForm from "@/components/Layout/UserForm/form";
import { useProfile } from "@/menu/useProfile";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
interface User {
  name: string;
  _id: string;
  email: string;
  password: string;
  phone: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  admin: boolean;
}
interface Data {
  name: string;
  phone: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
}
const EditUserPage = () => {
  const { id } = useParams();
  const handleSaveButtonClicked = async (ev: any, data: Data) => {
    ev.preventDefault();

    const promise = new Promise<void>(async (resolve, reject) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });
      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    });
    toast.promise(promise, {
      loading: "Saving user...",
      success: "User saved",
      error: "Error while saving user",
    });
  };

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    fetch("/api/profile?_id=" + id).then((res) => {
      res.json().then((user) => {
        setUser(user);
      });
    });
  }, []);
  const { loading: profileLoading, data: admin } = useProfile();
  if (profileLoading) {
    return "Loading user info...";
  }
  if (!admin) {
    return "Not an admin";
  }
  return (
    <section>
      <AdminTabs isAdmin={true} />
      <UserForm user={user} onSaving={handleSaveButtonClicked} />
    </section>
  );
};
export default EditUserPage;
