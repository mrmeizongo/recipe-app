import React, { useState } from "react";
import ContentStyle from "./ContentStyle.module.css";
import ChefIcon from "../../assets/chef-icon.png";
import { recipeInitials, getRecipeNames } from "../../helper/RecipeHelper";

const Content = () => {
	const [displayNames, changeDisplayNames] = useState({
		init: "",
		name: "",
		show: false,
		submit: false,
	});

	function handleOnInitChange(e) {
		e.preventDefault();
		changeDisplayNames((prev) => {
			if (e.target.value == "defaultValue") {
				return { ...prev, show: false, submit: false, init: "", name: "" };
			} else return { ...prev, show: true, init: e.target.value, name: "" };
		});
	}

	function handleOnNameChange(e) {
		e.preventDefault();
		changeDisplayNames((prev) => {
			if (e.target.value == "defaultValue") {
				return { ...prev, show: false, submit: false, init: "", name: "" };
			} else return { ...prev, name: e.target.value, submit: true };
		});
	}

	function handleOnSubmit(e) {
		e.preventDefault();
		console.log("Got request for recipe!", displayNames);
	}

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
				<h2>Search over 4k Recipes</h2>
				<h4>What do you want to eat today?</h4>
				<form>
					<label>Choose initial</label>
					<select
						className={`${ContentStyle.Select}  form-select`}
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

					{displayNames.show ? (
						<select
							className={`${ContentStyle.Select} form-select`}
							onChange={handleOnNameChange}
						>
							<option defaultValue={true} value={"defaultValue"}>
								Choose recipe name
							</option>
							{getRecipeNames(displayNames.init).map((element) => {
								return (
									<option key={element} value={element}>
										{element}
									</option>
								);
							})}
						</select>
					) : null}

					{displayNames.submit ? (
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
