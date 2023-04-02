import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadFallback from "../LoadFallback/LoadFallback.jsx";
import Appstyle from "./AppStyle.module.css";
import QueryContext from "../../Context/QueryContext.jsx";

const Recipes = React.lazy(() => import("../pages/Recipes/Recipes.jsx"));
const TitleBar = React.lazy(() => import("../TitleBar/TitleBar.jsx"));
const QueryForm = React.lazy(() => import("../pages/QueryForm/QueryForm.jsx"));
const Footer = React.lazy(() => import("../Footer/Footer.jsx"));

function App() {
	const recipeData = useState({ initial: "", category: "" });
	const recipeName = useState("");

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
		<QueryContext.Provider value={{ recipeData, recipeName }}>
			<div className={`${Appstyle.App} container-fluid`}>
				<Suspense fallback={<LoadFallback />}>
					<Router>
						<header className={`${Appstyle.Header}`}>
							<TitleBar />
						</header>
						<main className={`${Appstyle.MainBody}`}>
							<Routes>
								<Route exact path="/" element={<QueryForm />} />
								<Route exact path="/recipes/*" element={<Recipes />} />
								<Route
									exact
									path="/how-it-works"
									element={<h1>How it works</h1>}
								/>
								<Route
									path="/*"
									element={
										<div className="d-flex flex-column align-items-center justify-content-center">
											<h5>Page Not Found!</h5>
											<p>Check url</p>
										</div>
									}
								/>
							</Routes>
						</main>
						<footer className={`${Appstyle.Footer}`}>
							<Footer />
						</footer>
					</Router>
				</Suspense>
			</div>
		</QueryContext.Provider>
	);
}

export default App;
