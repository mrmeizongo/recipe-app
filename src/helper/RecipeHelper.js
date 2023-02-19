import RecipeNames from "../RecipeNames/recipe_names.json";

export default RecipeNames;
export const recipeInitials = Object.keys(RecipeNames).map((e) =>
	e.toUpperCase()
);

export function getRecipeNames(initial) {
	initial = initial.toLowerCase();

	//Capitalize the first letter
	return RecipeNames[initial].map(
		(val) => val[0].toUpperCase() + val.substring(1)
	);
}
