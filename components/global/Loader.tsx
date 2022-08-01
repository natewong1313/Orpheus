import React from "react"
import type { CSSProperties } from "react"
import PulseLoader from "react-spinners/PulseLoader"

const cssOveride: CSSProperties = {
    display: "inline-flex",
    alignItems: "center"
}
type Props = {
    color?: string
    size?: number
    speedMultiplier?: number
}
const Loader = ({ color = "#ffffff", size = 11, speedMultiplier = 0.9 }: Props) => {
    return (
        <PulseLoader
            color={color}
            loading={true}
            size={size}
            speedMultiplier={speedMultiplier}
            cssOverride={cssOveride}
            margin={3}
        />
    )
}

export default Loader
