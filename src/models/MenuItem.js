import mongoose, { Schema } from "mongoose";
import { models, model } from "mongoose";
const ExtraPriceSchema = new Schema({
  name: String,
  price: Number,
});
const MenuItemSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    extraIngridientPrices: { type: [ExtraPriceSchema] },
    sizes: { type: [ExtraPriceSchema] },
    category: { type: mongoose.Types.ObjectId },
  },
  { timestamps: true }
);
export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema);
