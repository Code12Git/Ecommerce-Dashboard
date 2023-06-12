import Product from "../models/Product.js";

export const SearchController = async (req, res) => {
  try {
    const products = await Product.find({
      $or: [
        {
          name: { $regex: req.params.key },
        },
        {
          company: { $regex: req.params.key },
        },
        {
          category: { $regex: req.params.key },
        },
      ],
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};
