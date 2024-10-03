import { Schema, model } from "mongoose";
import { models } from "mongoose";
const OrderSchema = new Schema(
  {
    userEmail: String,
    phone: String,
    street: String,
    postalCode: String,
    city: String,
    cartProducts: Object,
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Order = models?.Order || model("Order", OrderSchema);
