"use client";
import { faBedPulse } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [creatingUser, setCreatingUser] = useState<boolean>(false);
  const [userCreated, setUserCreated] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const handleSubmit = async (ev: any) => {
    ev.preventDefault();
    setCreatingUser(true);
    setUserCreated(false);
    setError(false);
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      setUserCreated(false);
      setError(true);
    } else {
      setUserCreated(true);
      setError(false);
    }
    setCreatingUser(false);
  };
  return (
    <section className="mt-8">
      <h1 className=" text-center text-4xl mb-4 text-orange-500">
        Registracija
      </h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleSubmit}>
        {userCreated && (
          <div className="my-4 text-center">
            Korisnik je registrovan!
            <br />
            Sada se možete prijaviti
            <br />
            <Link href={"/login"} className=" underline">
              Login &raquo;
            </Link>
          </div>
        )}
        {error && (
          <div className="my-4 text-center">
            Dogodila se greška prilikom registrovanja
          </div>
        )}
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(ev) => {
            setEmail(ev.target.value);
          }}
          disabled={creatingUser}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => {
            setPassword(ev.target.value);
          }}
          disabled={creatingUser}
        />
        <button type="submit" disabled={creatingUser}>
          Registruj se
        </button>

        <div className="my-4 text-center text-gray-500">
          ili se uloguj putem provajdera
        </div>
        <button className="flex gap-4 justify-center">
          <Image
            src={"/images/google.png"}
            alt="google"
            width={25}
            height={25}
          />
          Prijavi se sa google nalogom
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Imaš nalog?{" "}
          <Link className="underline " href={"/login"}>
            Uloguj se &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
};
export default Register;
