"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminTabs from "@/components/Layout/UserTabs/userTabs";
import { useProfile } from "@/menu/useProfile";
import Link from "next/link";
import { dbTimeForHuman } from "@/app/lib/dateTime";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const router = useRouter();
  const { loading: profileLoading, data: admin } = useProfile();
  useEffect(() => {
    fetch("/api/orders").then((res) => {
      res.json().then((items) => {
        setOrders(items.reverse());
        console.log(items);
      });
    });
  }, []);
  return (
    <section className="max-w-4xl mx-auto mt-8">
      <AdminTabs isAdmin={admin} />
      <div className="text-center">
        <h1 className=" text-orange-500 text-3xl font-extrabold font lg:text-4xl m-10">
          VAŠE NARUDŽBE
        </h1>
      </div>
      <div className="mt-8">
        {orders.map((order) => (
          <div className="bg-gray-100 m-3 p-4 rounded-lg flex justify-between items-center flex-wrap">
            <div className="max-w-48">
              <div className="text-gray-700 m-3 text-black-100">
                {order.userEmail}
              </div>
              <div className="text-gray-500 text-sm m-3">
                {order.cartProducts.map((p) => p.name).join(", ")}
              </div>
            </div>
            <div className="text-center">
              <span
                className={
                  order.paid
                    ? "bg-green-500 rounded-md p-2 text-white"
                    : "bg-red-400 rounded-md p-2 text-white"
                }
              >
                {order.paid ? "Plaćeno" : "Nije plaćeno"}
              </span>
            </div>
            <div className="text-right">{dbTimeForHuman(order.createdAt)}</div>
            <div className="flex justify-items-end">
              <Link href={"/orders/" + order._id} className="pt-5 pr-5">
                <button>Prikaži više</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Orders;
