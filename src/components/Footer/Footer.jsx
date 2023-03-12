import React from "react";
import FooterStyle from "./FooterStyle.module.css";

const Footer = () => {
	return (
		<div
			className={`${FooterStyle.Footer} bg-warning text-center rounded-top-4`}
		>
			For dev/demonstration purposes only
		</div>
	);
};

export default Footer;
