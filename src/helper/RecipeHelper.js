import RecipeNames from "../RecipeNames/recipe_names.json";

export default RecipeNames;
export const recipeNames = Object.keys(RecipeNames).map((e) => e.toUpperCase());
