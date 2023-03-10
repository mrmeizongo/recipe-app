import React, { useState, useRef, useEffect } from "react";
import RecipesStyle from "./RecipesStyle.module.css";
import RecipeListing from "../../RecipeListing/RecipeListing";

const Recipe = ({
	children,
	recipes,
	currentSelection,
	setCurrentSelection,
	setRecipeList,
}) => {
	const [selected, setSelected] = useState(false);
	function HandleOnClick(e) {
		e.preventDefault();

		let selection = e.target.textContent;

		// Check to see if selected recipe is already in the list of
		// selected recipes, remove if yes.
		if (currentSelection.includes(selection)) {
			setSelected(false);
			setCurrentSelection((prev) =>
				[...prev].filter((el) => el.localeCompare(selection) != 0)
			);

			// Remove recipe from recipe list state array
			setRecipeList((prev) =>
				[...prev].filter((el) => Object.keys(el)[0] != selection)
			);
			return;
		}

		// Limit number of recipes selectable to 5
		if (currentSelection.length >= 5) return;

		const messageBody = {
			type: "recipe-single",
			initial: recipes.recipeCategory.initial,
			category: recipes.recipeCategory.category,
			recipeName: selection,
		};

		// Add selected recipe to the list of selected recipes for display
		// and display all selected recipes
		setSelected(true);

		fetch(`http://192.168.1.165:8080/projects/recipe`, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(messageBody),
		})
			.then((response) => response.json())
			.then((result) => {
				setRecipeList((prev) => [...prev, result.body[0]]);
			})
			.catch((error) => {
				console.error(error);
			});

		setCurrentSelection((prev) => [...prev, selection]);
		return;
	}

	return (
		<button
			className={`${RecipesStyle.Button} ${
				selected ? "bg-secondary text-light" : "bg-none text-dark"
			} border rounded-5 py-2 px-3`}
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
	const [recipeList, setRecipeList] = useState([]);

	return (
		<div className={`${RecipesStyle.Body} row`}>
			<div className="col-12 col-lg-3">
				<div
					className={`${RecipesStyle.Results} d-flex flex-row flex-lg-column flex-wrap flex-lg-nowrap align-items-lg-center gap-1 p-3`}
				>
					{recipes.recipeList.length > 0 ? (
						recipes.recipeList.map((element, index) => {
							return (
								<Recipe
									key={index}
									recipes={recipes}
									currentSelection={currentSelection}
									setCurrentSelection={setCurrentSelection}
									setRecipeList={setRecipeList}
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
			{/* {currentSelection.length > 0 ? (
				<div className="d-flex align-items-center flex-wrap bg-light mt-3 p-3 gap-1 rounded-4 rounded-bottom-0">
					<Selection currentSelection={currentSelection} />
				</div>
			) : null} */}
			{recipeList.length > 0 ? (
				<RecipeListing
					className="col-12 col-lg-9 bg-light rounded-4 p-3"
					recipeList={recipeList}
				/>
			) : null}
		</div>
	);
};

export default Recipes;
