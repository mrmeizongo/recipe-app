import React, { useState, useContext, useEffect } from "react";
import RecipesStyle from "./RecipesStyle.module.css";
import RecipeListing from "../../RecipeListing/RecipeListing";
import QueryContext from "../../../context/QueryContext";
import LoadFallback from "../../LoadFallback/LoadFallback";

const Recipe = ({
	children,
	currentSelection,
	setCurrentRecipe,
	setCurrentSelection,
}) => {
	// From context provider
	const [recipeData] = useContext(QueryContext)["recipeData"];

	function HandleOnClick(e) {
		e.preventDefault();
		let selection = e.target.textContent;

		if (currentSelection == "" || currentSelection != selection) {
			setCurrentSelection(selection);
			const messageBody = {
				type: "recipe-single",
				...recipeData,
				category:
					recipeData.category[0].toLowerCase() +
					recipeData.category.substring(1),
				recipeName: selection,
			};
			// fetch request to server
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
					console.log(result);
					// set states
					setCurrentRecipe(result.body);
				});
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
			} border rounded-3 py-2 px-3`}
			onClick={HandleOnClick}
		>
			<>{children}</>
		</button>
	);
};

const Recipes = () => {
	const [currentSelection, setCurrentSelection] = useState("");
	const [recipeNameList, setRecipeNameList] = useState([]);
	const [currentRecipe, setCurrentRecipe] = useState({});

	// From context provider
	const [recipeData, setRecipeData] = useContext(QueryContext)["recipeData"];

	useEffect(() => {
		// Code looks this way due to the way the main recipe json object is structured.
		// These recipe objects are where all the recipes are stored.
		const messageBody = {
			type: "category",
			...recipeData,
			category:
				recipeData.category[0].toLowerCase() + recipeData.category.substring(1),
		};

		fetch("http://192.168.1.165:8080/projects/recipe", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(messageBody),
		})
			.then((response) => {
				if (response.ok) return response.json();
				else console.error("There was an error fetching request from server");
			})
			.then((data) => {
				setRecipeNameList(data.body);
			})
			.catch((error) => console.error("Error: ", error));
	}, [recipeData]);

	// From context provider
	const [recipeName, setRecipeName] = useContext(QueryContext)["recipeName"];

	return (
		<div className={`${RecipesStyle.Body} row mt-1`}>
			<div className="col-12 col-lg-3">
				<div
					className={`${RecipesStyle.Results} d-flex flex-row flex-lg-column flex-wrap flex-lg-nowrap align-items-lg-start p-3 gap-1`}
				>
					{recipeNameList.length > 0 ? (
						recipeNameList.map((element, index) => {
							return (
								<Recipe
									key={index}
									currentSelection={currentSelection}
									setCurrentSelection={setCurrentSelection}
									setCurrentRecipe={setCurrentRecipe}
								>
									{element}
								</Recipe>
							);
						})
					) : (
						<LoadFallback />
					)}
				</div>
			</div>
			<div className="col-12 col-lg-9 bg-light rounded-4 p-3">
				<RecipeListing currentRecipe={currentRecipe} />
				{/* Show a fallback while recipe is loading. Also when recipe page opens let page autofill from url. */}
				{/* Change url format to recipes?B?babka */}
			</div>
		</div>
	);
};

export default Recipes;
