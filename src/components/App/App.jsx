import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appstyle from "./AppStyle.module.css";
import TitleBar from "../TitleBar/TitleBar.jsx";
import QueryForm from "../pages/QueryForm/QueryForm.jsx";
import Footer from "../Footer/Footer.jsx";
import LoadFallback from "../LoadFallback/LoadFallback";

const Recipes = React.lazy(() => import("../pages/Recipes/Recipes.jsx"));

function App() {
	const [recipe, setRecipe] = useState({
		recipeName: {},
		recipeList: [],
	});

	return (
		<div className={`${Appstyle.App} container-fluid`}>
			<Router>
				<header className={`${Appstyle.Header}`}>
					<TitleBar />
				</header>
				<main className={`${Appstyle.MainBody}`}>
					<Suspense fallback={<LoadFallback />}>
						<Routes>
							<Route
								exact
								path="/"
								element={<QueryForm handleRecipeNames={setRecipe} />}
							/>
							<Route
								exact
								path="/recipes/*"
								element={<Recipes recipes={recipe} />}
							/>
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
	);
}

export default App;
