"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginInProgress, setProgress] = useState<boolean>(false);
  async function handleFormSubmit(ev: any) {
    ev.preventDefault();
    setProgress(true);
    await signIn("credentials", { email, password });
  }
  return (
    <section className="mt-8">
      <h1 className=" text-center text-4xl mb-4 text-orange-500">Uloguj se</h1>
      <form className="block max-w-xs mx-auto">
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(ev) => {
            setEmail(ev.target.value);
          }}
          disabled={loginInProgress}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => {
            setPassword(ev.target.value);
          }}
          disabled={loginInProgress}
        />
        <button
          type="submit"
          disabled={loginInProgress}
          onClick={handleFormSubmit}
        >
          Uloguj se
        </button>

        <div className="my-4 text-center text-gray-500">
          ili se uloguj putem provajdera
        </div>
        <button
          className="flex gap-4 justify-center"
          disabled={loginInProgress}
        >
          <Image
            src={"/images/google.png"}
            alt="google"
            width={25}
            height={25}
          />
          Prijavi se sa google nalogom
        </button>
      </form>
    </section>
  );
};
export default Login;
