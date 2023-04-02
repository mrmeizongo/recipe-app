import React, { useState } from "react";

const Search = ({ inputFocus, setFocus, handleOnChange, query }) => {
	function HandleOnSubmit(e) {
		e.preventDefault();
	}

	return (
		<div className="w-100 d-flex flex-row align-items-center justify-content-center gap-1">
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
					onChange={handleOnChange}
					value={query}
					onFocus={setFocus}
				/>
			</form>
		</div>
	);
};

export default Search;
