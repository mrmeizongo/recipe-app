import React from "react";
import RecipesStyle from "./RecipesStyle.module.css";

const Recipes = ({ recipes }) => {
	return (
		<div
			className={`${RecipesStyle.MainContent} d-flex flex-row justify-content-center gap-3`}
		>
			<div className={`${RecipesStyle.Sidebar} d-none d-md-flex bg-success`}>
				<div className="h-100 w-100 d-flex flex-column align-items-center">
					L Side
				</div>
			</div>
			<div className={`${RecipesStyle.Content} bg-warning flex-grow-1`}>
				<div className="h-100 w-100 d-flex flex-row">Center</div>
			</div>
			<div className={`${RecipesStyle.Info} d-none d-lg-flex bg-info`}>
				<div className="h-100 w-100 d-flex flex-column align-items-center">
					R Side
				</div>
			</div>
		</div>
	);
};

export default Recipes;
