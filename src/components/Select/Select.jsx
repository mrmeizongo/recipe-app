import React from "react";

const Select = ({
	children,
	className,
	disabled,
	id,
	initialOption,
	handleOnChange,
}) => {
	return (
		<select
			className={`${className} form-select form-select`}
			disabled={disabled}
			id={id}
			onChange={handleOnChange}
		>
			{initialOption}
			{children}
		</select>
	);
};

export default Select;
