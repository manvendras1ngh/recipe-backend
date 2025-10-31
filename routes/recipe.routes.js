import express from "express";
import {
  addNewRecipe,
  allRecipe,
  deleteRecipe,
} from "../controllers/recipe.controller.js";

const router = express.Router();

router.get("/", allRecipe);
router.post("/new", addNewRecipe);
router.delete("/:id", deleteRecipe);

export default router;
