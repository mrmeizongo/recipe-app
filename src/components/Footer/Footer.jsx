import React from "react";
import FooterStyle from "./FooterStyle.module.css";

const Footer = () => {
	return (
		<div
			className={`${FooterStyle.Footer} bg-warning text-center rounded-top-4 p-2 mt-3`}
		>
			<p>
				For dev/demonstration purposes only. Please visit the associated source
				links for full recipe description.
			</p>
		</div>
	);
};

export default Footer;
