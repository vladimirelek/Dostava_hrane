"use client";

import { CartContext } from "@/components/AppContext";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";

const NavButton = () => {
  const { cartProducts } = useContext(CartContext);
  const [isOpened, setIsOpened] = useState(false);
  const buttonHandler = () => {
    setIsOpened(!isOpened);
  };
  const session = useSession();
  const status = session.status;
  return (
    <div className="lg:hidden z-10">
      <FontAwesomeIcon
        className="text-white hover:cursor-pointer"
        onClick={buttonHandler}
        icon={faBars}
        size="2x"
      />
      {isOpened ? (
        <ul className="mt-4 pt-2 gap-6 text-xl bg-gray-800 text-white border-2 border-orange-400 rounded-lg z-10">
          <li>
            <Link href={"/"} className="block py-2 px-4 hover:text-orange-500">
              Početna
            </Link>
          </li>
          <li>
            <Link
              href={"/menu"}
              className="block py-2 px-4 hover:text-orange-500"
            >
              Meni
            </Link>
          </li>
          <li>
            <Link
              href={"/#contact"}
              className="block py-2 px-4 hover:text-orange-500"
            >
              Kontakt
            </Link>
          </li>
          <li>
            <Link
              href={"/cart"}
              className="block py-2 px-4 hover:text-orange-500"
            >
              Korpa
            </Link>
          </li>
          {status == "authenticated" ? (
            <ul>
              <li>
                <Link
                  href={"/profile"}
                  className="block py-2 px-4 hover:text-orange-500"
                >
                  Profil
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="block py-2 px-4 hover:text-orange-500"
                  onClick={() => {
                    signOut();
                  }}
                >
                  Izloguj se
                </Link>
              </li>
            </ul>
          ) : (
            <>
              <li>
                <Link
                  href={"/login"}
                  className="block py-2 px-4 hover:text-orange-500"
                >
                  Uloguj se
                </Link>
              </li>
              <li>
                <Link
                  href={"/register"}
                  className="block py-2 px-4 hover:text-orange-500"
                >
                  Registruj se
                </Link>
              </li>
              <li>
                {cartProducts.length > 0 && (
                  <Link href={"/cart"}>
                    <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />(
                    {cartProducts.length})
                  </Link>
                )}
              </li>
            </>
          )}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};
export default NavButton;
