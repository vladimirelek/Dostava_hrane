"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AdminTabs from "@/components/Layout/UserTabs/userTabs";
import UserForm from "@/components/Layout/UserForm/form";
interface User {
  name: string;
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
const Profile = () => {
  const session = useSession();
  const { status } = session;
  const inputRef = useRef(null);
  const [user, setUser] = useState<User | null>(null);
  const [profileFetched, setProfileFetched] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const imgFromSession = session.data?.user?.image;

  const submitHandler = async (ev: any, data: Data) => {
    ev.preventDefault();
    setIsSaving(true);
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "aplication/json" },
      body: JSON.stringify(data),
    });

    setIsSaving(false);
    setSaved(true);
    console.log(session);
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        if (!response.ok) {
          throw new Error(`Nisi ulogovan! status: ${response.status}`);
        }
        response.json().then((data) => {
          setUser(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);
  if (status == "loading" || !profileFetched) {
    return "Loading...";
  }
  if (status == "unauthenticated") {
    return redirect("/login");
  }
  return (
    <section>
      <AdminTabs isAdmin={isAdmin} />
      <div className="max-w-lg mx-auto border">
        {isSaving && (
          <h2 className=" text-center my-3 bg-blue-200 p-4 rounded-lg mx-3 border border-blue-400">
            Profile saving...
          </h2>
        )}
        {saved && (
          <h2 className=" text-center my-3 bg-green-200 p-4 rounded-lg mx-3 border border-green-400">
            Profile saved!
          </h2>
        )}
        <UserForm user={user} onSaving={submitHandler} />
      </div>
    </section>
  );
};
export default Profile;
