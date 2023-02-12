import React, { useState } from "react";

const Search = ({ inputFocus, setFocus }) => {
	const [query, setQuery] = useState("");

	function HandleOnChange(e) {
		console.log(query);
		setQuery(e.target.value);
	}

	function HandleOnSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const { search } = Object.fromEntries(formData);
		console.log(search);
	}

	return (
		<div className="w-100 d-flex flex-row align-items-center justify-content-center">
			{inputFocus ? null : (
				<div>
					<i className="fa-solid fa-magnifying-glass fa-sm"></i>
				</div>
			)}
			<form
				onSubmit={HandleOnSubmit}
				action=""
				method="POST"
				className="form-control bg-transparent border-0 p-0"
			>
				<input
					type="text"
					name="search"
					className="form-control bg-transparent border-0 p-1"
					autoComplete="false"
					autoFocus={false}
					placeholder="Search recipes"
					aria-label="Search"
					aria-describedby="search"
					onChange={HandleOnChange}
					onFocus={setFocus}
				/>
			</form>
		</div>
	);
};

export default Search;
