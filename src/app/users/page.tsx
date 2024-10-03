"use client";
import AdminTabs from "@/components/Layout/UserTabs/userTabs";
import { useProfile } from "@/menu/useProfile";
import Link from "next/link";
import { useEffect, useState } from "react";
interface User {
  name: string;
  email: string;
  _id: string;
}
const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetch("/api/users").then((res) => {
      res.json().then((users) => {
        setUsers(users);
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
      <AdminTabs isAdmin={admin} />
      <div>
        {users.length > 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4 max-w-lg m-auto"
            >
              <div className="flex justify-between gap-4 grow">
                <div className="text-gray-900">
                  {!!user.name && <span>{user.name}</span>}
                  {!user.name && <span className="italic">No name</span>}
                </div>
                <span className="text-gray-500">{user.email}</span>
                <div className="max-w-20">
                  <Link
                    className="border border-gray-500 rounded-xl px-2 py-1"
                    href={"/users/" + user._id}
                  >
                    Uredi
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
export default UserPage;
