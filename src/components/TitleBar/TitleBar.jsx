import React from "react";
import { Link } from "react-router-dom";
import TitleStyle from "./TitleStyle.module.css";

const TitleBar = () => {
	function HandleOnSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const { search } = Object.fromEntries(formData);
		console.log(search);
	}

	function HandleOnChange(e) {
		console.log(e.target.value);
	}

	return (
		<nav
			className={`${TitleStyle.TitleBar} d-flex flex-row align-items-center justify-content-between`}
		>
			<div
				className={`${TitleStyle.Navigation} d-flex flex-row align-items-center justify-content-center gap-1`}
			>
				<Link
					to="/"
					className={`${TitleStyle.Link} d-flex align-items-center justify-content-center gap-1 text-dark`}
				>
					<i className="fa-solid fa-utensils fa-lg"></i>
					<h4 className="d-none d-lg-inline">Recipes</h4>
				</Link>
			</div>
			<div
				className={`${TitleStyle.Search} d-flex flex-row align-items-center gap-2`}
			>
				<form
					onSubmit={HandleOnSubmit}
					action=""
					method="POST"
					className="form-control border-0 p-0"
				>
					<input
						type="text"
						name="search"
						className="form-control rounded-5"
						placeholder="Search recipes"
						aria-label="Search"
						aria-describedby="search"
						onChange={HandleOnChange}
					/>
				</form>
			</div>

			<div
				className={`${TitleStyle.Collapse} ml-auto d-flex flex-row align-items-center justify-content-center`}
			>
				<Link to="/how-it-works" className={`${TitleStyle.Link} text-dark`}>
					<h5>How it works</h5>
				</Link>
			</div>
		</nav>
	);
};

export default TitleBar;
