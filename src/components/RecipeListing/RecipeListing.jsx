import React from "react";

const RecipeListing = ({ recipeList }) => {
	return (
		<div className="row">
			{recipeList.map((el, index) => {
				return (
					<div
						className="col-12 col-md-6 col-xl-4 bg-light py-3 px-3"
						key={index}
					>
						{}
						{el[Object.keys(el)[0]].directions.map((el) => (
							<p className="mb-2">{el}</p>
						))}
					</div>
				);
			})}
		</div>
	);
};

export default RecipeListing;
