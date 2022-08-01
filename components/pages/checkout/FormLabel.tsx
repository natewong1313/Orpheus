import React from "react"

type Props = {
    children: JSX.Element | string
}
const FormLabel = ({ children }: Props) => {
    return <label className="block text-sm font-medium text-slate-500">{children}</label>
}

export default FormLabel
