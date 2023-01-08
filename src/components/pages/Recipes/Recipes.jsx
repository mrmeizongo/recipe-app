import React from "react";
import RecipesStyle from "./RecipesStyle.module.css";

const Recipes = ({ recipes }) => {
	return (
		<div
			className={`${RecipesStyle.MainContent} d-flex flex-row justify-content-center`}
		>
			<div className="bg-success">L Side</div>
			<div className="bg-info">Center</div>
			<div className="bg-warning">R Side</div>
		</div>
	);
};

export default Recipes;
