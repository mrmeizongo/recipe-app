import React from "react";

const RecipeStyle = {
	maxWidth: 400,
};

const RecipeListing = ({ recipeList }) => {
	return (
		<div className="d-flex flex-row flex-wrap gap-3">
			{recipeList.map((el, index) => {
				return (
					<div
						style={RecipeStyle}
						className="bg-white rounded-4 p-3"
						key={index}
					>
						<p>
							<strong>{el[Object.keys(el)[0]].title}</strong>
						</p>
						<div>
							<strong>Ingredients list:</strong>
							{el[Object.keys(el)[0]].ingredients.map((el, index) => (
								<p key={index}>{el}</p>
							))}
						</div>
						<div>
							<strong>Directions:</strong>
							{el[Object.keys(el)[0]].directions.map((el, index) => (
								<p key={index}>{el}</p>
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default RecipeListing;
