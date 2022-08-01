import React from "react"

type Props = {
    type: string
    id: string
    autoComplete?: string
    placeholder?: string
    onChange?: (e: React.ChangeEvent<any>) => void
    value: string
    hasError?: boolean
}
const FormInput = ({ type, id, autoComplete, placeholder, onChange, value, hasError }: Props) => {
    return (
        <div>
            <input
                type={type}
                id={id}
                name={id}
                placeholder={placeholder}
                autoComplete={autoComplete}
                spellCheck={false}
                onChange={onChange}
                value={value}
                className={`mt-1 block w-full text-sm rounded-md shadow-sm focus:placeholder:text-slate-300 focus:ring-blue-200 focus:border-blue-200
				 ${hasError ? "placeholder:text-red-500 border-red-400" : "placeholder:text-slate-400 border-slate-200"}`}
            />
        </div>
    )
}

export default FormInput
