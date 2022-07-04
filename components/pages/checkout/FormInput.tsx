import React from "react"

type Props = {
	type: string
	id: string
	name: string
	autoComplete?: string
	placeholder?: string
}
const FormInput = ({ type, id, name, autoComplete, placeholder }: Props) => {
	return (
		<div>
			<input
				type={type}
				id={id}
				name={name}
				placeholder={placeholder}
				autoComplete={autoComplete}
				spellCheck={false}
				className="mt-1 block w-full text-sm rounded-md focus:ring-blue-200 focus:border-blue-200 border-slate-200 shadow-sm placeholder:text-slate-400 focus:placeholder:text-slate-300"
			/>
		</div>
	)
}

export default FormInput
