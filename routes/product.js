import express from "express";
import {
  CreateProduct,
  GetAllProducts,
  GetProduct,
  UpdateProduct,
  deleteProduct,
} from "../controllers/ProductController.js";
import verifyToken from "../Middlewares/verifyToken.js";
const router = express.Router();

//Adding a Product
router.post("/add", verifyToken, CreateProduct);

//Updating a Product
router.put("/:id", verifyToken, UpdateProduct);

//Delete a Product
router.delete("/:id", verifyToken, deleteProduct);

//Getting a Product

router.get("/:id", verifyToken, GetProduct);

//Getting a Product
router.get("/", GetAllProducts);

export default router;
