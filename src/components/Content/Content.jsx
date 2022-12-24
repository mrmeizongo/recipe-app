import React from "react";
import ContentStyle from "./ContentStyle.module.css";

const Content = () => {
	return (
		<section
			className={`${ContentStyle.Container} d-flex flex-row align-items-center rounded-5 shadow`}
		></section>
	);
};

export default Content;
