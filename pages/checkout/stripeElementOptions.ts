const stripeElementOptions = {
    clientSecret: "",
    fonts: [
        { cssSrc: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" }
    ],
    appearance: {
        variables: {
            fontFamily: "Inter",
            fontWeightNormal: "500",
            colorTextPlaceholder: "rgb(148 163 184)",
            focusBoxShadow: "0 0 0 0.8px var(--p-colorPrimaryAlpha20)",
            spacingGridColumn: "1rem",
            spacingGridRow: "1rem"
        },
        rules: {
            ".Label": {
                color: "rgb(100 116 139)",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
                marginBottom: "0px",
                textTransform: "capitalize"
            },
            ".Input": {
                color: "black",
                fontSize: "0.875rem",
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
                lineHeight: "1.25rem",
                borderColor: "rgb(226 232 240)",
                borderRadius: "0.375rem",
                marginTop: "0.25rem",
                boxShadow:
                    "var(0 0 #0000, 0 0 #0000), var(0 0 #0000, 0 0 #0000), 0 1px 2px 0 rgb(0 0 0 / 0.05)",
                transition: "none"
            }
        }
    }
}

export default stripeElementOptions
