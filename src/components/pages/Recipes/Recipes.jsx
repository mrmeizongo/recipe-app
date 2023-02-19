import React, { useEffect } from "react";

const Recipe = ({ children }) => {
	return <div className="d-inline m-2 bg-info rounded-2">{children}</div>;
};

const Recipes = ({ recipes }) => {
	useEffect(() => {
		console.log(recipes);
	});
	return (
		<div>
			<h1>Title: Results for Selection</h1>
			<div className="container-fluid">
				<div>
					{recipes.recipeList.map((element) => {
						return <Recipe>{element}</Recipe>;
					})}
				</div>
			</div>
		</div>
	);
};

export default Recipes;
