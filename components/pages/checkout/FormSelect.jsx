import React from "react"

const FormSelect = ({ id, name, autoComplete }) => {
	return (
		<select
			id={id}
			name={name}
			autoComplete={autoComplete}
			className={`mt-1 block w-full py-2 px-3 rounded-md text-sm focus:ring-blue-200 focus:border-blue-200 border border-slate-200 shadow-sm`}
		>
			<option>United States</option>
			<option>Canada</option>
			<option>Mexico</option>
		</select>
	)
}

export default FormSelect
