import Product from "../models/Product.js";

//Create a new Product
export const CreateProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const { name, price, category, userId, company } = product;
    if (!name || !price || !category || !userId || !company) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Update a product

export const UpdateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Delete a product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get Products

export const GetProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get all Products

export const GetAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};
