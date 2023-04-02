import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import OptionsStyle from "./OptionsStyle.module.css";
import QueryContext from "../../Context/QueryContext.jsx";
import { recipeInitials, getRecipeNames } from "../../helper/RecipeHelper";

const Option = ({ title, removeFocus, query, setQuery }) => {
	const [_, setRecipeData] = useContext(QueryContext)["recipeData"];
	const navigate = useNavigate();

	function HandleClick(e) {
		e.preventDefault();
		const selection = e.target.textContent;
		if (selection.length == 1) {
			setQuery(selection);
			return;
		}

		window.sessionStorage.setItem("initial", JSON.stringify(selection[0]));
		window.sessionStorage.setItem("category", JSON.stringify(selection));
		setRecipeData((prev) => {
			return { ...prev, initial: query[0], category: selection };
		});
		setQuery(selection);

		navigate(`/recipes/${selection[0]}/${selection}`);
		removeFocus(e);
	}

	return (
		<div className="d-inline">
			<button
				type="button"
				className="btn btn-outline-secondary btn-sm m-1"
				onClick={HandleClick}
			>
				<h6>{title}</h6>
			</button>
		</div>
	);
};

const Options = ({ removeFocus, query, setQuery }) => {
	useEffect(() => {
		document.querySelector("main").addEventListener("click", removeFocus);

		const cleanUp = () => {
			document.querySelector("main").removeEventListener("click", removeFocus);
		};
		return cleanUp;
	});

	const optionsArray =
		query.length > 0
			? getRecipeNames(query[0]).filter((recipeName) => {
					return recipeName.includes(query.slice(1).toLowerCase());
			  })
			: recipeInitials;

	return (
		<div className={`${OptionsStyle.Main} container`}>
			<div className="d-flex flex-row justify-content-center flex-wrap">
				{optionsArray.length > 0 ? (
					optionsArray.map((value, index) => {
						return (
							<Option
								key={index}
								title={value}
								removeFocus={removeFocus}
								query={query}
								setQuery={setQuery}
							/>
						);
					})
				) : (
					<h5>No results!</h5>
				)}
			</div>
		</div>
	);
};

export default Options;
