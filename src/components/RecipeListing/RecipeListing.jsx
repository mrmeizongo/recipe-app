import React from "react";
import RecipeListingStyle from "./RecipeListingStyle.module.css";

const bgColors = [
	"#3A98B9",
	"FFF1DC",
	"#A0C3D2",
	"#579BB1",
	"#7FE9DE",
	"#FF9F9F",
	"#FCDDB0",
	"#90A17D",
];

const RecipeListing = ({ currentRecipe }) => {
	const randomColor = (() => {
		return bgColors[Math.floor(Math.random() * bgColors.length)];
	})();

	return (
		<div>
			<p>
				<strong>{`Selected recipe: ${
					currentRecipe[Object.keys(currentRecipe)[0]].title
				}`}</strong>
			</p>
			<div
				className={`${RecipeListingStyle.RecipeStyle} d-flex flex-column flex-lg-row justify-content-between flex-wrap bg-white rounded-4 p-3`}
			>
				<div
					style={{ backgroundColor: randomColor }}
					className={`${RecipeListingStyle.Ingredients} mb-4`}
				>
					<strong>Ingredients list: </strong>
					{currentRecipe[Object.keys(currentRecipe)[0]].ingredients.map(
						(el, index) => (
							<p key={index}>{el}</p>
						)
					)}
				</div>
				<div
					style={{ backgroundColor: randomColor }}
					className={`${RecipeListingStyle.Directions} mb-4`}
				>
					<strong>Directions: </strong>
					{currentRecipe[Object.keys(currentRecipe)[0]].directions.map(
						(el, index) => (
							<p key={index}>{el}</p>
						)
					)}
				</div>
				<div
					style={{ backgroundColor: randomColor }}
					className={`${RecipeListingStyle.Tags}`}
				>
					<strong>Tags: </strong>
					{currentRecipe[Object.keys(currentRecipe)[0]].tags.map(
						(el, index) => (
							<p className="d-inline" key={index}>
								{`${el}, `}
							</p>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default RecipeListing;
