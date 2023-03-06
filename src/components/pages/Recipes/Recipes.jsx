import React, { useState, useRef, useEffect } from "react";
import RecipesStyle from "./RecipesStyle.module.css";

const Recipe = ({
	children,
	recipes,
	currentSelection,
	setCurrentSelection,
}) => {
	const [selected, setSelected] = useState(false);
	function HandleOnClick(e) {
		e.preventDefault();

		let selection = e.target.textContent;

		// Check to see if selected recipe is already in the list of
		// selected recipes, remove if yes, add if no.
		if (currentSelection.includes(selection)) {
			setSelected(false);
			setCurrentSelection((prev) =>
				[...prev].filter((el) => el.localeCompare(selection) != 0)
			);
			return;
		}

		// Limit number of recipes selectable to 5
		if (currentSelection.length >= 5) return;

		// Add selected recipe to the list of selected recipes for display
		// and display all selected recipes
		setSelected(true);
		const messageBody = {
			type: "recipe-single",
			recipeCategory: recipes.recipeCategory,
			recipeName: selection,
		};
		fetch(`http://192.168.1.165:8080/projects/recipe`, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(messageBody),
		})
			.then((response) => response.json())
			.then(console.log);
		setCurrentSelection((prev) => [...prev, selection]);
		return;
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
			{currentSelection.map((element, index) => (
				<p className="rounded-5 px-3 py-2 bg-secondary text-light" key={index}>
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
			{currentSelection.length > 0 ? (
				<div className="d-flex align-items-center flex-wrap bg-light mt-3 p-3 gap-1 rounded-4">
					<Selection currentSelection={currentSelection} />
				</div>
			) : null}
		</div>
	);
};

export default Recipes;
