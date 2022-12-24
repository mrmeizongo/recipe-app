import React from "react";
import Appstyle from "./AppStyle.module.css";
import TitleBar from "../TitleBar/TitleBar.jsx";
import Content from "../Content/Content.jsx";
import Footer from "../Footer/Footer.jsx";

function App() {
	return (
		<div className={`${Appstyle.App} container`}>
			<header className={`${Appstyle.Header}`}>
				<TitleBar />
			</header>
			<main
				className={`${Appstyle.MainBody} d-flex flex-column align-items-center justify-content-center`}
			>
				<Content />
			</main>
			<footer className={`${Appstyle.Footer}`}>
				<Footer />
			</footer>
		</div>
	);
}

export default App;
