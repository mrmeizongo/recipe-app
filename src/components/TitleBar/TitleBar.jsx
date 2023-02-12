import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TitleStyle from "./TitleStyle.module.css";
import Options from "../Options/Options";
import Search from "../Search/Search";

const Collapse = ({ className, HandleCollapse }) => {
	useEffect(() => {
		document
			.getElementsByTagName("main")[0]
			.addEventListener("click", HandleCollapse);

		const cleanUp = () => {
			document
				.getElementsByTagName("main")[0]
				.removeEventListener("click", HandleCollapse);
		};
		return cleanUp;
	});

	return (
		<div className={className}>
			<p>Option 1</p>
			<p>Option 2</p>
		</div>
	);
};

const TitleBar = () => {
	const [inputFocus, setInputFocus] = useState(false);
	const [collapse, setCollapse] = useState(false);

	function setFocus(e) {
		e.preventDefault();
		if (collapse) setCollapse(false);
		setInputFocus(true);
	}

	function removeFocus(e) {
		e.preventDefault();
		setInputFocus(false);
	}

	function HandleCollapse(e) {
		e.preventDefault();
		if (inputFocus) setInputFocus(false);
		setCollapse((prev) => !prev);
	}

	return (
		<div>
			<nav
				className={`${TitleStyle.TitleBar} d-flex flex-row align-items-center justify-content-between gap-2`}
			>
				<div>
					<Link
						to="/"
						className={`${TitleStyle.Link} d-flex align-items-center justify-content-center gap-2`}
					>
						<i className="fa-solid fa-utensils fa-xl"></i>
						<h4 className="d-none d-md-inline">Recipes</h4>
					</Link>
				</div>

				<div
					className={`${TitleStyle.Search} d-flex flex-row align-items-center justify-content-start mx-2 mx-lg-5`}
				>
					<Search inputFocus={inputFocus} setFocus={setFocus} />
				</div>

				<div className="d-block">
					<button
						className={TitleStyle.CollapseButton}
						onClick={HandleCollapse}
					>
						<i className="fa-solid fa-ellipsis fa-xl"></i>
					</button>
					{collapse ? (
						<Collapse
							className={`${TitleStyle.Collapse}`}
							HandleCollapse={HandleCollapse}
						/>
					) : null}
				</div>
			</nav>
			{inputFocus ? <Options removeFocus={removeFocus} /> : null}
		</div>
	);
};

export default TitleBar;
