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

	function HandleButton(e) {
		try {
			HandleCollapse(e);
		} finally {
			return false;
		}
	}

	return (
		<div className={className}>
			<Link className={TitleStyle.Link} to={"/about"} onClick={HandleCollapse}>
				About
			</Link>
			<Link
				className={TitleStyle.Link}
				to={"/random-recipe"}
				onClick={HandleCollapse}
			>
				Random recipe
			</Link>
			<Link
				className={TitleStyle.Link}
				to={"/how-it-works"}
				onClick={HandleCollapse}
			>
				How it works
			</Link>
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
		<>
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
					className={`${TitleStyle.Search} d-flex flex-row align-items-center justify-content-start mx-2 mx-lg-5 w-50`}
				>
					<Search inputFocus={inputFocus} setFocus={setFocus} />
				</div>

				<div className="d-block position-relative">
					<button
						className={TitleStyle.CollapseButton}
						type="button"
						onClick={HandleCollapse}
					>
						<i className="fa-solid fa-ellipsis fa-xl"></i>
					</button>
					{collapse ? (
						<Collapse
							className={`${TitleStyle.Collapse} d-flex flex-column justify-content-between`}
							HandleCollapse={HandleCollapse}
						/>
					) : null}
				</div>
			</nav>
			{inputFocus ? <Options removeFocus={removeFocus} /> : null}
		</>
	);
};

export default TitleBar;
