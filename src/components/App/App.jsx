import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appstyle from "./AppStyle.module.css";
import TitleBar from "../TitleBar/TitleBar.jsx";
import QueryForm from "../pages/QueryForm/QueryForm.jsx";
import Footer from "../Footer/Footer.jsx";
import QueryContext from "../../../Context/QueryContext.jsx";
import LoadFallback from "../LoadFallback/LoadFallback.jsx";

const Recipes = React.lazy(() => import("../pages/Recipes/Recipes.jsx"));

function App() {
	const recipeInit = useState("");
	const recipeCat = useState("");
	const recipeName = useState("");
	const search = useState("");

	return (
		<QueryContext.Provider
			value={{ recipeInit, recipeCat, recipeName, search }}
		>
			<div className={`${Appstyle.App} container-fluid`}>
				<Router>
					<header className={`${Appstyle.Header}`}>
						<TitleBar />
					</header>
					<main className={`${Appstyle.MainBody}`}>
						<Suspense fallback={<LoadFallback />}>
							<Routes>
								<Route exact path="/" element={<QueryForm state={state} />} />
								<Route
									exact
									path="/recipes/*"
									element={<Recipes state={state} />}
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
		</QueryContext.Provider>
	);
}

export default App;
