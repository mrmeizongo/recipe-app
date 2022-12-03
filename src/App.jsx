import React from "react";
import TitleBar from "./components/TitleBar";
import style from "./css/modules/App.module.css";

const appStyle = `${style.App} container`;

function App() {
	return (
		<div className={appStyle}>
			<header>
				<TitleBar />
			</header>
		</div>
	);
}

export default App;
