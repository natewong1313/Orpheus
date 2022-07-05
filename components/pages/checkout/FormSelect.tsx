import React from "react"

type Props = {
	id: string
	// name: string
	onChange?: (e: React.ChangeEvent<any>) => void
	value?: string
	autoComplete?: string
	hasError?: boolean
}
const FormSelect = ({ id, autoComplete, onChange, value, hasError }: Props) => {
	return (
		<select
			id={id}
			name={id}
			autoComplete={autoComplete}
			onChange={onChange}
			value={value}
			className={`mt-1 block w-full py-2 px-3 rounded-md text-sm shadow-sm focus:ring-blue-200 focus:border-blue-200 border 
				${hasError ? "border-red-400" : "border-slate-200"}`}
		>
			<option>United States</option>
			<option>Canada</option>
			<option>Mexico</option>
		</select>
	)
}

export default FormSelect
