import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipesStyle from "./RecipesStyle.module.css";
import RecipeListing from "../../RecipeListing/RecipeListing";
import QueryContext from "../../../Context/QueryContext";
import LoadFallback from "../../LoadFallback/LoadFallback.jsx";

const Loading = () => {
	return (
		<div className="d-flex flex-column align-items-center justify-content-center h-100">
			<i className="fa-solid fa-spinner fa-spin fa-2xl"></i>
		</div>
	);
};

const Recipe = ({
	children,
	currentSelection,
	setLoading,
	setCurrentRecipe,
	setCurrentSelection,
}) => {
	// From context provider
	const [recipeData, _] = useContext(QueryContext)["recipeData"];

	function HandleOnClick(e) {
		e.preventDefault();
		let selection = e.target.textContent;

		if (currentSelection == "" || currentSelection != selection) {
			setCurrentSelection(selection);
			setLoading(true);
			const messageBody = {
				type: "recipe-single",
				...recipeData,
				category:
					recipeData.category[0].toLowerCase() +
					recipeData.category.substring(1),
				recipeName: selection,
			};
			// fetch request to server
			fetch(`https://www.meizongo.io/projects/recipe`, {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(messageBody),
			})
				.then((response) => response.json())
				.then((result) => {
					// set states
					setLoading(false);
					setCurrentRecipe(result.body);
				})
				.catch((error) => {
					setLoading(false);
					console.error(error);
					console.log("Please try again later.");
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
					: "bg-light text-dark"
			} border rounded-3 py-2 px-3`}
			onClick={HandleOnClick}
		>
			{children}
		</button>
	);
};

const Recipes = () => {
	const [currentSelection, setCurrentSelection] = useState("");
	const [recipeNameList, setRecipeNameList] = useState([]);
	const [currentRecipe, setCurrentRecipe] = useState({});
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	// From context provider
	const [recipeData] = useContext(QueryContext)["recipeData"];

	useEffect(() => {
		if (recipeData.initial == "" || recipeData.category == "") {
			navigate("/");
			return;
		}
		// Code looks this way due to the way the main recipe json object is structured.
		// These recipe objects are where all the recipes are stored.
		const messageBody = {
			type: "category",
			...recipeData,
			category:
				recipeData.category[0].toLowerCase() + recipeData.category.substring(1),
		};

		fetch("https://www.meizongo.io/projects/recipe", {
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

	return (
		<div className={`${RecipesStyle.Body} row mt-1`}>
			<div className="col-12 col-lg-3">
				<div
					className={`${RecipesStyle.Results} d-flex flex-row flex-lg-column flex-wrap flex-lg-nowrap align-items-lg-start p-3 gap-1`}
				>
					<h4
						className={RecipesStyle.Title}
					>{`${recipeData.initial} - ${recipeData.category}`}</h4>
					{recipeNameList.length > 0 ? (
						recipeNameList.map((element, index) => {
							return (
								<Recipe
									key={index}
									setLoading={setLoading}
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
			<div className={`${RecipesStyle.Listing} col-12 col-lg-9 rounded-4 p-3`}>
				{loading ? (
					<Loading />
				) : (
					<RecipeListing currentRecipe={currentRecipe} />
				)}
				{/* Show a fallback while recipe is loading. Also when recipe page opens let page autofill from url. */}
				{/* Change url format to recipes?B?babka */}
			</div>
		</div>
	);
};

export default Recipes;
