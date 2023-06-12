import express from "express";
import {
  deleteUserController,
  getAllUsersController,
  getUserController,
  updateUserController,
} from "../controllers/UserController.js";
import verifyToken from "../Middlewares/verifyToken.js";

const router = express.Router();

//Update User
router.put("/:id", verifyToken, updateUserController);

//Delete User

router.delete("/:id", verifyToken, deleteUserController);

//Get All Users

router.get("/", getAllUsersController);

//Get Users

router.get("/:id", verifyToken, getUserController);

export default router;
