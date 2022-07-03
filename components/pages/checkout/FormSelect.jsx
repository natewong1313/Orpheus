import React from "react"

const FormSelect = ({ id, name, autoComplete, placeholder }) => {
	const value = placeholder
	return (
		<select
			id={id}
			name={name}
			autoComplete={autoComplete}
			className={`mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 text-sm 
				${value === placeholder && "text-gray-400"} focus:ring-blue-200 focus:border-blue-200 border-gray-300`}
		>
			<option value="" selected={true} disabled={true}>{placeholder}</option>
			<option>United States</option>
			<option>Canada</option>
			<option>Mexico</option>
		</select>
	)
}

export default FormSelect
