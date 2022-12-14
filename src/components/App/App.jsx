import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appstyle from "./AppStyle.module.css";
import TitleBar from "../TitleBar/TitleBar.jsx";
import QueryForm from "../QueryForm/QueryForm.jsx";
import Footer from "../Footer/Footer.jsx";
import Recipes from "../pages/Recipes/Recipes";

function App() {
	const [recipe, setRecipe] = useState({
		recipeName: {},
		recipeList: [],
	});
	return (
		<div className={`${Appstyle.App} container`}>
			<Router>
				<header className={`${Appstyle.Header}`}>
					<TitleBar />
				</header>
				<main
					className={`${Appstyle.MainBody} d-flex flex-column align-items-center justify-content-start`}
				>
					<Routes>
						<Route
							exact
							path="/"
							element={<QueryForm handleRecipeNames={setRecipe} />}
						/>
						<Route
							exact
							path="/recipes"
							element={<Recipes recipes={recipe} />}
						/>
						<Route exact path="/how-it-works" element={<h1>How it works</h1>} />
					</Routes>
				</main>
				<footer className={`${Appstyle.Footer}`}>
					<Footer />
				</footer>
			</Router>
		</div>
	);
}

export default App;
