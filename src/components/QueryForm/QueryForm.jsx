import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentStyle from "./QueryFormStyle.module.css";
import ChefIcon from "../../assets/chef-icon.png";
import { recipeInitials, getRecipeNames } from "../../helper/RecipeHelper";

const SimpleSelect = ({ placeHolder, onChange, content }) => {
	return (
		<div className="d-flex flex-row">
			<select
				className={`${ContentStyle.Select} form-select rounded-5`}
				onChange={onChange}
			>
				<option defaultValue={true} value={"defaultValue"}>
					{placeHolder}
				</option>
				{content.map((val) => {
					return (
						<option key={val} value={val}>
							{val}
						</option>
					);
				})}
			</select>
		</div>
	);
};

const QueryForm = ({ handleRecipeNames }) => {
	const [formData, changeFormData] = useState({
		initial: "",
		name: "",
		show: false,
		submit: false,
	});

	const navigate = useNavigate();

	function handleOnInitChange(e) {
		e.preventDefault();
		changeFormData((prev) => {
			if (e.target.value == "defaultValue") {
				return { ...prev, show: false, submit: false, initial: "", name: "" };
			} else return { ...prev, show: true, initial: e.target.value, name: "" };
		});
	}

	function handleOnNameChange(e) {
		e.preventDefault();
		changeFormData((prev) => {
			if (e.target.value == "defaultValue") {
				return { ...prev, show: false, submit: false, initial: "", name: "" };
			} else {
				return {
					...prev,
					initial: prev.initial,
					name: e.target.value,
					submit: true,
				};
			}
		});
	}

	function handleOnSubmit(e) {
		e.preventDefault();

		const messageBody = {
			initial: formData.initial,
			name: formData.name,
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
				console.log("Data:", data.body);
				handleRecipeNames({ recipeName: messageBody, recipeList: data.body });
				navigate("/recipes");
			})
			.catch((error) => console.error("Error: ", error));
	}

	return (
		<section
			className={`${ContentStyle.Container} d-flex flex-column flex-md-row 
          align-items-center justify-content-around`}
		>
			<img src={ChefIcon} className={`${ContentStyle.Icon}`} />
			<div
				className={`${ContentStyle.Query} d-flex flex-column justify-content-center
             align-items-start rounded-5 shadow p-4 gap-3`}
			>
				<h2>Search over 4k Recipes</h2>
				<h4>What do you want to eat today?</h4>
				<form className="d-flex flex-column gap-3">
					<SimpleSelect
						placeHolder={"Choose recipe initial"}
						onChange={handleOnInitChange}
						content={recipeInitials}
					/>

					{formData.show ? (
						<SimpleSelect
							placeHolder={`Category starting with ${formData.initial}`}
							onChange={handleOnNameChange}
							content={getRecipeNames(formData.initial)}
						/>
					) : null}

					{formData.submit ? (
						<button
							type="button"
							className="btn btn-success rounded-5"
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
