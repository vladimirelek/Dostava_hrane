import mongoose from "mongoose";
import { User } from "../../../models/User";
import { isAdmin } from "../auth/[...nextauth]/route";
export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  if (isAdmin()) {
    const users = await User.find();
    return Response.json(users);
  }
  return Response.json([]);
}
