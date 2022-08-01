import React from "react"

const OrderSummary = () => {
    return (
        <div className="py-4 px-4 pb-6 sm:px-0">
            <div className="grid grid-cols-2">
                <div className="col">
                    <h1 className="font-semibold">Shipping Address</h1>
                    <div className="text-sm text-slate-500 pt-2 space-y-0.5">
                        <p>John Doe</p>
                        <p>123 road st</p>
                        <p>New York, New York 12345</p>
                        <p>United States</p>
                    </div>
                </div>
                <div className="col">
                    <h1 className="font-semibold">Details</h1>
                    <div className="text-sm text-slate-500 pt-2 space-y-0.5">
                        <div className="flex justify-between">
                            <p>Subtotal</p>
                            <p className="font-medium">$109.99</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Discount</p>
                            <p className="text-emerald-500">- $20.00</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Shipping</p>
                            <p>$0.00</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Tax</p>
                            <p>$0.00</p>
                        </div>
                        <div className="flex justify-between text-black font-semibold">
                            <p>Total</p>
                            <p>$89.99</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary
