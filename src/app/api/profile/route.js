import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./../../api/auth/[...nextauth]/route";
import { User } from "./../../../models/User";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const { _id } = data;
  let filter = {};
  if (_id) {
    filter = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    filter = { email };
  }

  await User.updateOne(filter, data);

  return Response.json(true);
}
export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (_id) {
    const user = await User.findOne({ _id }).lean();
    return Response.json({ ...user });
  } else {
    const session = await getServerSession(authOptions);
    const email = session.user?.email;
    if (!email) {
      return Response(JSON.stringify({ error: "No user found" }));
    }
    return Response.json(await User.findOne({ email }));
  }
}
