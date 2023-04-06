import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import QueryFormStyle from "./QueryFormStyle.module.css";
import ChefIcon from "../../../assets/chef-icon.png";
import QueryContext from "../../../Context/QueryContext.jsx";
import { recipeInitials, getRecipeNames } from "../../../helper/RecipeHelper";

const SimpleSelect = ({ placeHolder, onChange, content, name }) => {
	return (
		<select
			name={name}
			title={name}
			className="form-select rounded-5"
			onChange={onChange}
		>
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

const QueryForm = () => {
	// Page nagivation
	const navigate = useNavigate();
	// Form view control
	const [formView, changeFormView] = useState({
		showRecipeCategory: false,
		showSubmitButton: false,
	});

	// From context provider
	const [recipeData, setRecipeData] = useContext(QueryContext)["recipeData"];

	// Click hanlders
	// OnInitialSelect
	function handleOnInitChange(e) {
		e.preventDefault();
		if (e.target.value == "defaultValue") {
			setRecipeData((prev) => {
				return {
					...prev,
					initial: "",
					category: "",
				};
			});

			// Revert to default view
			changeFormView((prev) => {
				return {
					...prev,
					showRecipeCategory: false,
					showSubmitButton: false,
				};
			});
		} else {
			window.sessionStorage.setItem("initial", JSON.stringify(e.target.value));
			setRecipeData((prev) => {
				return { ...prev, initial: e.target.value };
			});

			// Show category input
			changeFormView((prev) => {
				return {
					...prev,
					showRecipeCategory: true,
				};
			});
		}
	}

	// OnCategorySelect
	function handleOnNameChange(e) {
		e.preventDefault();
		if (e.target.value == "defaultValue") {
			setRecipeData((prev) => {
				return {
					...prev,
					category: "",
				};
			});
			// Revert to default view
			changeFormView((prev) => {
				return {
					...prev,
					showSubmitButton: false,
				};
			});
		} else {
			window.sessionStorage.setItem("category", JSON.stringify(e.target.value));
			setRecipeData((prev) => {
				return {
					...prev,
					category: e.target.value,
				};
			});

			// Show submit button
			changeFormView((prev) => {
				return {
					...prev,
					showSubmitButton: true,
				};
			});
		}
	}

	// OnSubmit
	function handleOnSubmit(e) {
		e.preventDefault();
		navigate(`/recipes/${recipeData.initial}/${recipeData.category}`);
	}

	return (
		<section
			className={`${QueryFormStyle.Container} d-flex flex-column flex-md-row 
          align-items-center justify-content-around`}
		>
			<img
				src={ChefIcon}
				alt="chef"
				title="chef"
				className={`${QueryFormStyle.Icon}`}
			/>
			<div
				className={`${QueryFormStyle.Query} d-flex flex-column justify-content-center
             align-items-start rounded-5 p-4 gap-3`}
			>
				<h2>
					Search over <strong>4k Recipes</strong>.
				</h2>
				<h4>What do you want to eat today?</h4>
				<form className="d-flex flex-column gap-3" onSubmit={handleOnSubmit}>
					<SimpleSelect
						placeHolder={"Choose recipe initial"}
						onChange={handleOnInitChange}
						content={recipeInitials}
						name="initial"
					/>

					{formView.showRecipeCategory && (
						<SimpleSelect
							placeHolder={`Category starting with ${recipeData.initial}`}
							onChange={handleOnNameChange}
							content={getRecipeNames(recipeData.initial)}
							name="category"
						/>
					)}

					{formView.showSubmitButton && (
						<button type="submit" className="btn btn-danger rounded-5">
							See recipes
						</button>
					)}
				</form>
			</div>
		</section>
	);
};

export default QueryForm;
