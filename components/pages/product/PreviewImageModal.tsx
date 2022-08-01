import React, { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import type { Product } from "@prisma/client"

type Props = {
    product: Product
    showPreviewImageModal: boolean
    selectedPreviewImg: string
    setShowPreviewImageModal: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedPreviewImg: React.Dispatch<React.SetStateAction<string>>
}
const PreviewImageModal = ({
    product,
    showPreviewImageModal,
    selectedPreviewImg,
    setShowPreviewImageModal,
    setSelectedPreviewImg
}: Props) => {
    return (
        <Transition.Root show={showPreviewImageModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setShowPreviewImageModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-start sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative bg-white rounded-lg overflow-hidden p-4 sm:max-w-lg md:max-w-3xl lg:max-w-5xl shadow-xl transform transition-all">
                                {/* Main image */}
                                <div className="flex justify-center">
                                    <img
                                        src={selectedPreviewImg}
                                        className=" w-full max-w-3xl object-center object-cover"
                                    />
                                </div>
                                {/*  Image gallery */}
                                <div className="mt-2 flex items-center justify-center">
                                    <div className="flex flex-row space-x-4">
                                        {product?.images.map((img) => (
                                            <button key={img} onClick={() => setSelectedPreviewImg(img)}>
                                                <img
                                                    src={img}
                                                    className={`w-32 ${
                                                        selectedPreviewImg !== img && "opacity-50"
                                                    } hover:opacity-100 transition duration-150 ease-in-out`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default PreviewImageModal
