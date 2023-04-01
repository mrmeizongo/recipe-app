import React, { useState, useEffect } from "react";
import OptionsStyle from "./OptionsStyle.module.css";
import { recipeInitials, getRecipeNames } from "../../helper/RecipeHelper";

const Option = ({ title, removeFocus }) => {
	function HandleClick(e) {
		console.log(e.target.textContent);
		removeFocus(e);
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

const Options = ({ removeFocus }) => {
	useEffect(() => {
		document.querySelector("main").addEventListener("click", removeFocus);

		const cleanUp = () => {
			document.querySelector("main").removeEventListener("click", removeFocus);
		};
		return cleanUp;
	});

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
						return (
							<Option key={index} title={value} removeFocus={removeFocus} />
						);
					})
				) : (
					<h5>No results!</h5>
				)}
			</div>
			<h5>Options here</h5>
		</div>
	);
};

export default Options;
