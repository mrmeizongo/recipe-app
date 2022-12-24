import React from "react";

const Select = ({ children, className, disabled, id }) => {
	return (
		<select className={className} disabled={disabled} id={id}>
			{children}
		</select>
	);
};

export default Select;
