"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import NavButton from "./NavButton/navButton";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "@/components/AppContext";

const Header = () => {
  const session = useSession();
  const { cartProducts } = useContext(CartContext);
  const status = session.status;
  const user = session.data?.user;
  return (
    <header className="flex justify-between items-start bg-[url('/images/naslovna.webp')] h-48 px-6 py-3">
      <Link
        href={"/"}
        className="font-bold text-2xl font-pacific text-orange-400"
      >
        Caffe slastičarna & lounge bar
      </Link>
      <NavButton />
      <nav className="hidden lg:flex justify-evenly gap-7 text-xl font-semibold text-gray-300 items-center">
        <Link href={"/"}>Početna</Link>
        <Link href={"/menu"}>Meni</Link>
        <Link href={"/#contact"}>Kontakt</Link>
        {status == "authenticated" ? (
          <div className="flex flex-row items-center gap-6">
            <Link href={"/profile"}>{user?.email}</Link>
            <button
              onClick={() => {
                signOut();
              }}
              className="bg-orange-600 text-white rounded-3xl w-36 h-13 flex justify-center items-center"
            >
              Izloguj se
            </button>
          </div>
        ) : (
          <>
            <Link href={"/login"}>Uloguj se</Link>
            <Link
              href={"/register"}
              className="bg-orange-600 text-white rounded-3xl w-36 h-10 flex justify-center items-center"
            >
              Registruj se
            </Link>
          </>
        )}
        {
          <Link href={"/cart"}>
            <FontAwesomeIcon icon={faCartShopping} /> {cartProducts.length}
          </Link>
        }
      </nav>
    </header>
  );
};
export default Header;
