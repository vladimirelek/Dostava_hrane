import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./../../api/auth/[...nextauth]/route";
import { Order } from "../../../models/Order";
const stripe = require("stripe");
export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { cartProducts, adress } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const orderDoc = await Order.create({
    userEmail,
    cartProducts,
    paid: false,
    ...adress,
  });
  return Response.json(orderDoc);
}
