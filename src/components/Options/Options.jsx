import React from "react";
import OptionsStyle from "./OptionsStyle.module.css";
import { recipeInitials, getRecipeNames } from "../../helper/RecipeHelper";

const Option = ({ title }) => {
	function HandleClick(e) {
		e.preventDefault();
		console.log(typeof e.target);
	}

	return (
		<div className="d-inline">
			<button
				type="button"
				className="btn btn-outline-secondary btn-sm m-1"
				onClick={HandleClick}
			>
				{title}
			</button>
		</div>
	);
};

const Options = ({ userInput }) => {
	const optionsArray =
		userInput.length > 0
			? getRecipeNames(userInput[0]).filter((recipeName) => {
					return recipeName.includes(userInput.toLowerCase());
			  })
			: recipeInitials;

	return (
		<div className={`${OptionsStyle.Main} container`}>
			<div className="d-flex flex-row justify-content-center flex-wrap">
				{optionsArray.length > 0 ? (
					optionsArray.map((value, index) => {
						return <Option key={index} title={value} />;
					})
				) : (
					<h5>No results!</h5>
				)}
			</div>
		</div>
	);
};

export default Options;
