"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdressForm from "@/components/Layout/AdressForm/adressForm";
import CartProduct from "@/components/CartProduct/cartProduct";
import { cartProductPrice } from "@/components/AppContext";
import { useProfile } from "@/menu/useProfile";
import toast from "react-hot-toast";
const Order = () => {
  const [order, setOrder] = useState();
  const [paid,setIsPaid]=useState(false);
  const { id } = useParams();
  const { loading: profileLoading, data: admin } = useProfile();
  const updatePayment=async()=>{
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/orders",{
        method: "PUT",
        body: JSON.stringify({paid,id}),
        headers: { "Content-Type": "application/json" },
      })
      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    });
    toast.promise(promise, {
      loading: "Učitavanje...",
      success: "Plaćanje ažurirano",
      error: "Došlo je do greške",
    });
      
  }
  if (id) {
    useEffect(() => {
      fetch("/api/orders?_id=" + id).then((res) =>
        res.json().then((order) => {
          setOrder(order);
          setIsPaid(order.paid);
        })
      );
    }, []);
  }
  let total=0;
  if (order){
    for(const product of order.cartProducts){
      total+=cartProductPrice(product);
    }
  }
  return (
    <section className="max-w-2xl mx-auto mt-8">
    
      <div className="text-center">
        <h1 className=" text-orange-500 text-3xl font-extrabold font lg:text-4xl m-10">
          VAŠA NARUDZBA
        </h1>
      </div>
      {order && (
        <div className="flex justify-between gap-10">
            <div className="bg-gray-100 p-4 rounded-lg">
            {order.cartProducts.map(product=>(<div key={product.name}><CartProduct product={product}/></div>))} 
            <div className=" py-2 text-gray-500">
              <span className="text-black font-bold inline-block w-8">
              Cijena:{total}KM
              </span>
              
            </div>
            </div>
            
          <div>
          <AdressForm disabled={true} adressProps={...order} />
          {admin && <div>
            <input
              id="paid"
              className="my-3"
              type="checkbox"
              checked={paid}
              onChange={() => {
                setIsPaid(!paid);
              }}
            />
            <label className="px-2" htmlFor="paid">
              Plaćeno
            </label>
            <button onClick={updatePayment}>Sačuvaj</button>
          </div>}
          </div>
        </div>
      )}
      

    </section>
  );
};
export default Order;
