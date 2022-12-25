import React from "react";

const Select = ({ children, className, disabled, id, onChange }) => {
	return (
		<select
			className={`${className}`}
			disabled={disabled}
			id={id}
			onChange={onChange}
		>
			{children}
		</select>
	);
};

export default Select;
