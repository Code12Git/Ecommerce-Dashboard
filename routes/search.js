import express from "express";
import { SearchController } from "../controllers/SearchController.js";
import verifyToken from "../Middlewares/verifyToken.js";

const router = express.Router();

router.get("/:key", verifyToken, SearchController);

export default router;
