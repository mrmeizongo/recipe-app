import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appstyle from "./AppStyle.module.css";
import TitleBar from "../TitleBar/TitleBar.jsx";
import QueryForm from "../pages/QueryForm/QueryForm.jsx";
import Footer from "../Footer/Footer.jsx";
import QueryContext from "../../context/QueryContext";
import LoadFallback from "../LoadFallback/LoadFallback.jsx";

const Recipes = React.lazy(() => import("../pages/Recipes/Recipes.jsx"));

function App() {
	const recipeData = useState({ initial: "", category: "" });
	const recipeName = useState("");
	const search = useState("");

	const [recipe, setRecipe] = recipeData;

	useEffect(() => {
		// Get data from session storage
		// Default state value is used if element does not exist
		setRecipe((prev) => {
			return {
				...prev,
				initial:
					JSON.parse(window.sessionStorage.getItem("initial")) ||
					recipe.initial,
				category:
					JSON.parse(window.sessionStorage.getItem("category")) ||
					recipe.category,
			};
		});
	}, []);

	return (
		<QueryContext.Provider value={{ recipeData, recipeName, search }}>
			<div className={`${Appstyle.App} container-fluid`}>
				<Router>
					<header className={`${Appstyle.Header}`}>
						<TitleBar />
					</header>
					<main className={`${Appstyle.MainBody}`}>
						<Suspense fallback={<LoadFallback />}>
							<Routes>
								<Route exact path="/" element={<QueryForm />} />
								<Route exact path="/recipes/*" element={<Recipes />} />
								<Route
									exact
									path="/how-it-works"
									element={<h1>How it works</h1>}
								/>
							</Routes>
						</Suspense>
					</main>
					<footer className={`${Appstyle.Footer}`}>
						<Footer />
					</footer>
				</Router>
			</div>
		</QueryContext.Provider>
	);
}

export default App;
