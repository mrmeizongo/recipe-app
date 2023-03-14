import React from "react";

const RecipeStyle = {
	maxWidth: 400,
};

const RecipeListing = ({ currentRecipe }) => {
	return (
		<div className="d-flex flex-row flex-wrap gap-3">
			<div style={RecipeStyle} className="bg-white rounded-4 p-3">
				<p>
					<strong>{currentRecipe[Object.keys(currentRecipe)[0]].title}</strong>
				</p>
				<div>
					<strong>Ingredients list:</strong>
					{currentRecipe[Object.keys(currentRecipe)[0]].ingredients.map(
						(el, index) => (
							<p key={index}>{el}</p>
						)
					)}
				</div>
				<div>
					<strong>Directions:</strong>
					{currentRecipe[Object.keys(currentRecipe)[0]].directions.map(
						(el, index) => (
							<p key={index}>{el}</p>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default RecipeListing;
