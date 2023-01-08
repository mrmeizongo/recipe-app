import React from "react";
import { Link } from "react-router-dom";
import TitleStyle from "./TitleStyle.module.css";

const TitleBar = () => {
	return (
		<nav className={`${TitleStyle.TitleBar} navbar`}>
			<Link
				to="/"
				className={`${TitleStyle.Link} d-flex align-items-center gap-1`}
			>
				<i className="fa-solid fa-utensils fa-lg"></i>
				<h3 className="d-none d-lg-inline">Recipes</h3>
			</Link>
			<div className="d-flex flex-row align-items-center gap-2">
				<div className="">
					<i className="fa-solid fa-magnifying-glass"></i>
				</div>
				<input
					type="text"
					className="form-control"
					placeholder="Search recipe"
					aria-label="Search"
					aria-describedby="search-icon"
				/>
			</div>
			<div className={`${TitleStyle.Collapse} ml-auto`}>
				<Link to="/how-it-works" className={`${TitleStyle.Link}`}>
					<h5>How it works</h5>
				</Link>
			</div>
		</nav>
	);
};

export default TitleBar;
