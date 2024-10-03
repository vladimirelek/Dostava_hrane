"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
interface Props {
  isAdmin: boolean;
}
const UserTabs = ({ isAdmin }: Props) => {
  const path = usePathname();

  return (
    <div className="flex gap-4 tabs justify-center flex-wrap ">
      <Link href={"/profile"} className={path === "/profile" ? "active" : ""}>
        Profil
      </Link>
      <Link href={"/orders"} className={path === "/orders" ? "active" : ""}>
        Narudžbe
      </Link>
      {isAdmin && (
        <>
          <Link
            href={"/categories"}
            className={path === "/categories" ? "active" : ""}
          >
            Kategorije
          </Link>
          <Link
            href={"/menu-items"}
            className={path.includes("menu-items") ? "active" : ""}
          >
            Stavke menija
          </Link>
          <Link
            href={"/users"}
            className={path.includes("users") ? "active" : ""}
          >
            Korisnici
          </Link>
        </>
      )}
    </div>
  );
};
export default UserTabs;
