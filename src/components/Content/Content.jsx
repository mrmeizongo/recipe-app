import React from "react";
import Select from "../Select/Select.jsx";
import ContentStyle from "./ContentStyle.module.css";
import { recipeNames } from "../../helper/RecipeHelper";

const Content = () => {
	const recipeInitials = recipeNames.map((e) => {
		return (
			<option key={e} value={e}>
				{e}
			</option>
		);
	});

	return (
		<section
			className={`${ContentStyle.Container} d-flex flex-row align-items-center border border-dark rounded-4`}
		>
			<form
				className={`${ContentStyle.Form} w-100 d-flex flex-row justify-content-center`}
			>
				<Select className={`${ContentStyle.Selector}`} disabled={false}>
					{recipeInitials}
				</Select>
			</form>
		</section>
	);
};

export default Content;
