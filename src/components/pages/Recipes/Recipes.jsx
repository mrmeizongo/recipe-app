import React, { useState } from "react";
import RecipesStyle from "./RecipesStyle.module.css";

const Recipe = ({ children, currentSelection, setCurrentSelection }) => {
	const [selected, setSelected] = useState(false);
	function HandleOnClick(e) {
		e.preventDefault();

		// Check to see if selected recipe is already in the list of
		// selected recipes, remove if yes, add if no.
		let selection = e.target.textContent;
		if (currentSelection.includes(selection)) {
			setSelected(false);
			return setCurrentSelection((prev) =>
				[...prev].filter((element) => element != selection)
			);
		}
		setSelected(true);
		return setCurrentSelection((prev) => [...prev, selection]);
	}
	return (
		<button
			className={`${RecipesStyle.Button} ${
				selected ? "bg-secondary text-light" : "bg-none text-dark"
			} border border-secondary rounded-5 py-2 px-3`}
			onClick={HandleOnClick}
		>
			<>{children}</>
		</button>
	);
};

const Selection = ({ currentSelection }) => {
	return (
		<>
			{currentSelection.map((element) => (
				<p className="rounded-4 me-2 mb-2 p-2 bg-secondary text-light">
					{element}
				</p>
			))}
		</>
	);
};

const Recipes = ({ recipes }) => {
	const [currentSelection, setCurrentSelection] = useState([]);
	return (
		<div className={RecipesStyle.Body}>
			<h1>Title: Results for Selection</h1>
			<div
				className={`${RecipesStyle.Results} d-flex flex-row flex-wrap gap-1 mt-1`}
			>
				{recipes.recipeList.length > 0 ? (
					recipes.recipeList.map((element, index) => {
						return (
							<Recipe
								key={index}
								recipes={recipes}
								currentSelection={currentSelection}
								setCurrentSelection={setCurrentSelection}
							>
								{element}
							</Recipe>
						);
					})
				) : (
					<h5>Search for recipes!</h5>
				)}
			</div>
			<div className="d-flex flex-wrap mt-2">
				<Selection currentSelection={currentSelection} />
			</div>
		</div>
	);
};

export default Recipes;
