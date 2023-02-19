import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QueryFormStyle from "./QueryFormStyle.module.css";
import ChefIcon from "../../../assets/chef-icon.png";
import { recipeInitials, getRecipeNames } from "../../../helper/RecipeHelper";

const SimpleSelect = ({ placeHolder, onChange, content }) => {
	return (
		<select className="form-select rounded-5" onChange={onChange}>
			<option defaultValue={true} value={"defaultValue"}>
				{placeHolder}
			</option>
			{content.map((val, index) => {
				return (
					<option key={index.toString()} value={val}>
						{val}
					</option>
				);
			})}
		</select>
	);
};

const QueryForm = ({ handleRecipeNames }) => {
	const [formData, changeFormData] = useState({
		initial: "",
		name: "",
		showRecipeName: false,
		showSubmit: false,
	});

	const navigate = useNavigate();

	function handleOnInitChange(e) {
		e.preventDefault();
		changeFormData((prev) => {
			if (e.target.value == "defaultValue") {
				return {
					...prev,
					showRecipeName: false,
					showSubmit: false,
					initial: "",
					name: "",
				};
			} else {
				return { ...prev, showRecipeName: true, initial: e.target.value };
			}
		});
	}

	function handleOnNameChange(e) {
		e.preventDefault();
		changeFormData((prev) => {
			if (e.target.value == "defaultValue") {
				return {
					...prev,
					showRecipeName: false,
					showSubmit: false,
					initial: "",
					name: "",
				};
			} else {
				return {
					...prev,
					name: e.target.value,
					showSubmit: true,
				};
			}
		});
	}

	function handleOnSubmit(e) {
		e.preventDefault();

		const messageBody = {
			initial: formData.initial,
			name: formData.name[0].toLowerCase() + formData.name.substring(1),
		};

		fetch("http://192.168.1.165:8080/projects/recipe", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(messageBody),
		})
			.then((response) => {
				if (response.ok) return response.json();
				else console.log("There was an error fetching request from server");
			})
			.then((data) => {
				handleRecipeNames({
					recipeName: messageBody,
					recipeList: JSON.parse(data.body),
				});
				navigate("/recipes");
			})
			.catch((error) => console.error("Error: ", error));
	}

	return (
		<section
			className={`${QueryFormStyle.Container} d-flex flex-column flex-md-row 
          align-items-center justify-content-around`}
		>
			<img src={ChefIcon} className={`${QueryFormStyle.Icon}`} />
			<div
				className={`${QueryFormStyle.Query} d-flex flex-column justify-content-center
             align-items-start rounded-5 shadow p-4 gap-3`}
			>
				<h2>
					Search over <strong>4k Recipes</strong>.
				</h2>
				<h4>What do you want to eat today?</h4>
				<form className="d-flex flex-column gap-3">
					<SimpleSelect
						placeHolder={"Choose recipe initial"}
						onChange={handleOnInitChange}
						content={recipeInitials}
					/>

					{formData.showRecipeName ? (
						<SimpleSelect
							placeHolder={`Category starting with ${formData.initial}`}
							onChange={handleOnNameChange}
							content={getRecipeNames(formData.initial)}
						/>
					) : null}

					{formData.showSubmit ? (
						<button
							type="button"
							className="btn btn-danger rounded-5"
							onClick={handleOnSubmit}
						>
							See recipes
						</button>
					) : null}
				</form>
			</div>
		</section>
	);
};

export default QueryForm;
