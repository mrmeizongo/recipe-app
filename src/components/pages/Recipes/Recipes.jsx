import React from "react";
import RecipesStyle from "./RecipesStyle.module.css";

const Recipe = ({ children }) => {
	return (
		<button
			className={`${RecipesStyle.Button} border border-secondary rounded-5 py-2 px-3`}
		>
			<div className="text-dark">{children}</div>
		</button>
	);
};

const Recipes = ({ recipes }) => {
	return (
		<div className={RecipesStyle.Body}>
			<h1>Title: Results for Selection</h1>
			<div
				className={`${RecipesStyle.Results} d-flex flex-row flex-wrap gap-1 mt-3`}
			>
				{recipes.recipeList.map((element, index) => {
					return <Recipe key={index}>{element}</Recipe>;
				})}
			</div>
		</div>
	);
};

export default Recipes;
