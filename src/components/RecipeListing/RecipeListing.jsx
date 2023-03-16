import React from "react";
import { Link } from "react-router-dom";
import RecipeListingStyle from "./RecipeListingStyle.module.css";

const RecipeListing = ({ currentRecipe }) => {
	return (
		<div>
			<p className="mb-2 text-decoration-underline">
				<strong>{currentRecipe[Object.keys(currentRecipe)[0]].title}</strong>
			</p>
			<div
				className={`${RecipeListingStyle.RecipeStyle} d-flex flex-column flex-lg-row justify-content-between flex-wrap rounded-4`}
			>
				<div className={`mb-3`}>
					<strong>Ingredients list: </strong>
					<ul>
						{currentRecipe[Object.keys(currentRecipe)[0]].ingredients.map(
							(el, index) => (
								<li key={index}>{el}</li>
							)
						)}
					</ul>
				</div>
				<div className={`mb-3`}>
					<strong>Directions: </strong>
					<ul>
						{currentRecipe[Object.keys(currentRecipe)[0]].directions.map(
							(el, index) => (
								<li key={index}>{el}</li>
							)
						)}
					</ul>
				</div>
				<div className="mb-3">
					<strong>Tags: </strong>

					{currentRecipe[Object.keys(currentRecipe)[0]].tags.map(
						(el, index) => (
							<p className="d-inline" key={index}>
								{`${el}, `}
							</p>
						)
					)}
				</div>
				<div>
					<strong>Source: </strong>
					<a
						href={currentRecipe[Object.keys(currentRecipe)[0]].url}
						target="_blank"
					>
						{currentRecipe[Object.keys(currentRecipe)[0]].source}
					</a>
				</div>
			</div>
		</div>
	);
};

export default RecipeListing;
