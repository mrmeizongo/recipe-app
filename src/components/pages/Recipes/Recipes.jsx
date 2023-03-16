import React, { useState, useRef, useEffect } from "react";
import RecipesStyle from "./RecipesStyle.module.css";
import RecipeListing from "../../RecipeListing/RecipeListing";

const Recipe = ({
	children,
	recipes,
	currentSelection,
	setCurrentRecipe,
	setCurrentSelection,
}) => {
	async function HandleOnClick(e) {
		e.preventDefault();
		let selection = e.target.textContent;

		if (currentSelection == "" || currentSelection != selection) {
			const messageBody = {
				type: "recipe-single",
				initial: recipes.recipeCategory.initial,
				category: recipes.recipeCategory.category,
				recipeName: selection,
			};
			// fetch request to server
			const result = await fetch(`http://192.168.1.165:8080/projects/recipe`, {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(messageBody),
			}).then((response) => response.json());
			// set states
			setCurrentRecipe(result.body);
			setCurrentSelection(selection);
		} else {
			setCurrentRecipe({});
			setCurrentSelection("");
		}
	}

	return (
		<button
			type="button"
			className={`${RecipesStyle.Button} ${
				currentSelection == children
					? "bg-secondary text-light"
					: "bg-none text-dark"
			} border rounded-5 py-2 px-3`}
			onClick={HandleOnClick}
		>
			<>{children}</>
		</button>
	);
};

const Recipes = ({ recipes }) => {
	const [currentSelection, setCurrentSelection] = useState("");
	const [currentRecipe, setCurrentRecipe] = useState({});

	useEffect(() => {
		console.log(currentRecipe);
	});

	return (
		<div className={`${RecipesStyle.Body} row mt-1`}>
			<div className="col-12 col-lg-3">
				<div
					className={`${RecipesStyle.Results} d-flex flex-row flex-lg-column flex-wrap flex-lg-nowrap align-items-lg-start p-3 gap-1`}
				>
					{recipes.recipeList.length > 0 ? (
						recipes.recipeList.map((element, index) => {
							return (
								<Recipe
									key={index}
									recipes={recipes}
									currentSelection={currentSelection}
									setCurrentSelection={setCurrentSelection}
									setCurrentRecipe={setCurrentRecipe}
								>
									{element}
								</Recipe>
							);
						})
					) : (
						<h5>Search for recipes!</h5>
					)}
				</div>
			</div>
			<div className="col-12 col-lg-9 bg-light rounded-4 p-3">
				<div className="mb-2">Selected recipe will be displayed below.</div>
				{currentSelection != "" ? (
					<RecipeListing currentRecipe={currentRecipe} />
				) : null}
			</div>
		</div>
	);
};

export default Recipes;
