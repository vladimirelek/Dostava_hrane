import mongoose from "mongoose";
import { Order } from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "./../../api/auth/[...nextauth]/route";
import { User } from "./../../../models/User";

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const url = new URL(req.url);
  const id = url.searchParams.get("_id");
  const userInfo = await User.findOne({ email: userEmail });
  if (id) {
    const order = await Order.findOne({ _id: id }).lean();
    return Response.json({ ...order });
  } else {
    if (userInfo.admin) {
      return Response.json(await Order.find());
    } else {
      const orders = await Order.find({ userEmail: userEmail }).lean();
      return Response.json(orders);
    }
  }
}
export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { id, paid } = await req.json();
  await Order.findByIdAndUpdate(id, { paid: paid });
  return Response.json(true);
}
