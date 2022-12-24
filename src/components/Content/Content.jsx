import React, { useState } from "react";
import ContentStyle from "./ContentStyle.module.css";
import ChefIcon from "../../assets/chef-icon.png";
import Select from "../Select/Select";
import { recipeInitials } from "../../helper/RecipeHelper";

const Content = () => {
	return (
		<section
			className={`${ContentStyle.Container} d-flex flex-column flex-md-row align-items-center
          justify-content-center justify-content-md-between gap-5`}
		>
			<img src={ChefIcon} className={`${ContentStyle.Icon}`} />
			<div
				className={`${ContentStyle.Query} d-flex flex-column justify-content-center
             align-items-start rounded-5 shadow p-4 gap-3`}
			>
				<h2>4k Recipes</h2>
				<h4>What do you want to eat today?</h4>
				<form>
					<label>Search</label>
					<Select
						className={`${ContentStyle.Select}`}
						initialOption={<option selected>Choose recipe initial</option>}
						children={recipeInitials.map((initial) => {
							return <option value={initial}>{initial}</option>;
						})}
					></Select>
				</form>
			</div>
		</section>
	);
};

export default Content;
