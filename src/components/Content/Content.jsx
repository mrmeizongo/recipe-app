import React, { useState } from "react";
import ContentStyle from "./ContentStyle.module.css";
import ChefIcon from "../../assets/chef-icon.png";
import { recipeInitials, getRecipeNames } from "../../helper/RecipeHelper";

const Content = () => {
	const [query, changeQuery] = useState({
		init: "",
		name: "",
		showGroup: false,
		showRecipes: false,
		showSubmit: false,
	});

	function handleOnInitChange(e) {
		e.preventDefault();
		changeQuery((prev) => {
			if (e.target.value == "defaultValue") {
				return {
					...prev,
					showGroup: false,
					showSubmit: false,
					showRecipes: false,
					init: "",
					name: "",
				};
			} else
				return {
					...prev,
					showGroup: true,
					showRecipes: false,
					init: e.target.value,
					name: "",
				};
		});
	}

	function handleOnGroupChange(e) {
		e.preventDefault();
		changeQuery((prev) => {
			if (e.target.value == "defaultValue") {
				return {
					...prev,
					showSubmit: false,
					showRecipes: false,
					name: "",
				};
			} else return { ...prev, name: e.target.value, showRecipes: true };
		});
	}

	function handleOnRecipeSelect() {
		return;
	}

	function handleOnSubmit(e) {
		e.preventDefault();
		console.log("Got request for recipe!", query);
	}

	return (
		<section
			className={`${ContentStyle.Container} d-flex flex-column flex-md-row align-items-center
          justify-content-center justify-content-md-between gap-5`}
		>
			<img src={ChefIcon} className={`${ContentStyle.Icon}`} />
			<div
				className={`${ContentStyle.Query} d-flex flex-column justify-content-center
             align-items-start rounded-4 shadow p-4 gap-3`}
			>
				<h2>Search over 4k Recipes</h2>
				<h4>What do you want to eat today?</h4>
				<form>
					<label htmlFor="recipe-initial">
						See <a href="/list">the list</a> or start with recipe initial
					</label>
					<select
						className={`${ContentStyle.Select}  form-select`}
						id="recipe-initial"
						onChange={handleOnInitChange}
					>
						<option defaultValue={true} value={"defaultValue"}>
							Choose recipe initial
						</option>
						{recipeInitials.map((initial) => {
							return (
								<option key={initial} value={initial}>
									{initial}
								</option>
							);
						})}
					</select>

					{query.showGroup ? (
						<select
							className={`${ContentStyle.Select} form-select`}
							onChange={handleOnGroupChange}
						>
							<option defaultValue={true} value={"defaultValue"}>
								Choose recipe group
							</option>
							{getRecipeNames(query.init).map((element) => {
								return (
									<option key={element} value={element}>
										{element}
									</option>
								);
							})}
						</select>
					) : null}

					{query.showRecipes ? (
						<select
							className={`${ContentStyle.Select} form-select`}
							onChange={handleOnRecipeSelect}
						>
							<option defaultValue={true} value={"defaultValue"}>
								Choose recipe
							</option>
						</select>
					) : null}

					{query.showSubmit ? (
						<button
							type="submit"
							className="btn btn-success"
							onClick={handleOnSubmit}
						>
							Get recipe!
						</button>
					) : null}
				</form>
			</div>
		</section>
	);
};

export default Content;
