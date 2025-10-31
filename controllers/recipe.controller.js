import { Recipe } from "../models/recipe.model.js";
import asyncWrapper from "../utils/asyncWrapper.js";

export const allRecipe = asyncWrapper(async (req, res) => {
  const recipe = await Recipe.find();
  if (!recipe.length) {
    return res.status(400).json({ error: "No recipe found" });
  }
  res.status(200).json({ message: "All recipies", data: recipe });
});

export const addNewRecipe = asyncWrapper(async (req, res) => {
  const { name, cuisineType, imageUrl, ingredients, instructions } = req.body;

  if (!name || !cuisineType || !imageUrl || !ingredients || !instructions) {
    return res
      .status(400)
      .json({ error: "Please provide all required information!" });
  }

  const existingRecipe = await Recipe.findOne({ name });
  if (existingRecipe) {
    return res
      .status(409)
      .json({ error: `Recipe with name ${name} already exists.` });
  }

  const newRecipe = new Recipe({
    name,
    cuisineType,
    imageUrl,
    ingredients,
    instructions,
  });
  await newRecipe.save();

  res.status(201).json({
    message: `Recipe '${name}' successfully saved.`,
  });
});

export const deleteRecipe = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ error: "Please provide recipe id for deletion" });
  }

  const deletedRecipe = await Recipe.findByIdAndDelete({ _id: id });
  if (!deletedRecipe) {
    return res.status(400).json({ error: "Recipe not found for deletion" });
  }

  res
    .status(200)
    .json({ message: `Recipe deleted successfully with id: ${id}` });
});
