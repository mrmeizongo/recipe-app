import React, { useState } from "react";
import { Link } from "react-router-dom";
import TitleStyle from "./TitleStyle.module.css";
import Options from "../Options/Options";
import Search from "../Search/Search";

const TitleBar = () => {
	const [inputFocus, setInputFocus] = useState(false);

	function setFocus(e) {
		e.preventDefault();
		console.log("Setting focus to true");
		setInputFocus(true);
	}

	function removeFocus(e) {
		e.preventDefault();
		console.log("Setting focus to false");
		setInputFocus(false);
	}

	return (
		<div>
			<nav
				className={`${TitleStyle.TitleBar} d-flex flex-row align-items-center justify-content-between gap-2`}
			>
				<div className={`${TitleStyle.Navigation}`}>
					<Link
						to="/"
						className={`${TitleStyle.Link} d-flex align-items-center justify-content-center gap-2 text-dark`}
					>
						<i className="fa-solid fa-utensils fa-lg"></i>
						<h4 className="d-none d-lg-inline">Recipes</h4>
					</Link>
				</div>

				<div
					className={`${TitleStyle.Search} d-flex flex-row align-items-center justify-content-center`}
				>
					<Search inputFocus={inputFocus} setFocus={setFocus} />
				</div>

				<div className={`${TitleStyle.Collapse} text-center`}>
					<Link to="/how-it-works" className={`${TitleStyle.Link} text-dark`}>
						<h5>How it works</h5>
					</Link>
				</div>
			</nav>
			{inputFocus ? <Options removeFocus={removeFocus} /> : null}
		</div>
	);
};

export default TitleBar;
