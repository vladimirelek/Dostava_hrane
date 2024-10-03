"use client";
import { useState } from "react";
import Image from "next/image";
import { useProfile } from "@/menu/useProfile";
import AdressForm from "../AdressForm/adressForm";
const UserForm = ({ user, onSaving }) => {
  const { data: isAdmin } = useProfile();
  const [profileImage, setProfileImage] = useState("/images/user.jpeg");
  const [userName, setUserName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [street, setStreet] = useState(user?.street || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [country, setCountry] = useState(user?.country || "");
  const [city, setCity] = useState(user?.city || "");
  const [admin, setIsAdmin] = useState(user?.admin || false);
  const handleAdressChange = (propName, value) => {
    if (propName === "phone") setPhone(value);
    if (propName === "street") setStreet(value);
    if (propName === "postalCode") setPostalCode(value);
    if (propName === "city") setCity(value);
  };
  return (
    <div className="flex flex-row gap-3 justify-center items-center mx-3 my-3 ">
      <div className="flex flex-col items-center mx-3 my-3">
        <Image
          src={profileImage}
          alt="Slika korisnika"
          width={120}
          height={120}
        />
      </div>
      <form
        className="flex flex-col"
        onSubmit={(ev) =>
          onSaving(ev, {
            name: userName,
            phone,
            street,
            postalCode,
            country,
            city,
            admin,
          })
        }
      >
        <input
          type="text"
          placeholder="Ime i prezime"
          value={userName}
          onChange={(ev) => {
            setUserName(ev.target.value);
          }}
        />
        <input type="email" disabled={true} value={user?.email} />
        <AdressForm
          adressProps={{ phone, street, postalCode, city }}
          setAdressProps={handleAdressChange}
        />
        <input
          type="text"
          placeholder="Država"
          value={country}
          onChange={(ev) => setCountry(ev.target.value)}
        />
        {isAdmin && (
          <div className="py-2">
            <input
              id="admin"
              type="checkbox"
              checked={admin}
              onClick={() => {
                setIsAdmin(!admin);
              }}
            />
            <label className="px-2" htmlFor="admin">
              Admin
            </label>
          </div>
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
export default UserForm;
