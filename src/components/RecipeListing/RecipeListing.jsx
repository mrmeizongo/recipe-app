import React from "react";

const RecipeListing = ({ recipeList, className }) => {
	return (
		<div className={className}>
			<div className="row g-3">
				{recipeList.map((el, index) => {
					return (
						<div
							className="col-12 col-md-6 col-xl-4 bg-white rounded-4 p-3"
							key={index}
						>
							{el[Object.keys(el)[0]].ingredients.map((el, index) => (
								<p key={index}>{el}</p>
							))}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default RecipeListing;
