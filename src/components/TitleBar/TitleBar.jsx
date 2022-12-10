import React from "react";
import TitleStyle from "./TitleStyle.module.css";

const TitleBar = () => {
	return (
		<nav className={`${TitleStyle.TitleBar} navbar`}>
			<h3>Recipes</h3>
			<div className={`${TitleStyle.Collapse} ml-auto`}>
				<h5>How it works</h5>
			</div>
		</nav>
	);
};

export default TitleBar;
