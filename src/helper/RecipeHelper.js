import RecipeNames from "../RecipeNames/recipe_names.json";

export default RecipeNames;
export const recipeInitials = Object.keys(RecipeNames).map((e) =>
	e.toUpperCase()
);

export function getRecipeNames(initial) {}
