import React from "react";

const Select = ({ children, className, disabled }) => {
	return (
		<select disabled={disabled} className={className}>
			{children}
		</select>
	);
};

export default Select;
