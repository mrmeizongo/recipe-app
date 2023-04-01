import React from "react";

const LoadFallback = () => {
	return (
		<div
			style={{
				width: "100%",
				height: "50svh",
			}}
			className="d-flex flex-row align-items-center justify-content-center gap-2 bg-white"
		>
			<i className="fa-solid fa-spinner fa-spin fa-2xl"></i>
		</div>
	);
};

export default LoadFallback;
