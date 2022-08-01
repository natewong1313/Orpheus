export type CartItemType = {
    id: string
    title: string
    price: number
    displayImage: string
    variantDetails: VariantDetails
    available: boolean
}

export type VariantDetails = {
    color: string | null
    size: string | null
}
