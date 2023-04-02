import React from "react";
import ListingStyle from "./ListingStyle.module.css";

const RecipeListing = ({ currentRecipe }) => {
	if (currentRecipe[Object.keys(currentRecipe)[0]]?.title) {
		return (
			<div>
				<p className="mb-2 text-decoration-underline">
					<strong>{currentRecipe[Object.keys(currentRecipe)[0]].title}</strong>
				</p>
				<div
					className={`${ListingStyle.RecipeStyle} d-flex flex-column flex-lg-row justify-content-between flex-wrap rounded-4`}
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
	} else return null;
};

export default RecipeListing;
