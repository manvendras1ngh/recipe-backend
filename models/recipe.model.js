import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Recipe name is required."],
    },
    cuisineType: {
      type: String,
      required: [true, "Cuisine type is required."],
    },
    imageUrl: {
      type: String,
      required: [true, "Recipe image is required."],
    },
    ingredients: {
      type: [String],
      required: [true, "Recipe ingredients is required."],
    },
    instructions: {
      type: [String],
      required: [true, "Recipe instruction is required."],
    },
  },
  { timestamps: true }
);

export const Recipe = mongoose.model("Recipe", recipeSchema);
