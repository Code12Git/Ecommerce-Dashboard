import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  price: String,
  category: String,
  userId: String,
  company: String,
});

export default mongoose.model("Product", ProductSchema);
