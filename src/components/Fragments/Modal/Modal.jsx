import React from "react";
import ModalContent from "./ModalContent";
import { Button } from "@material-tailwind/react";
import Spacer from "../../Elements/Spacer/Spacer";

export default function Modal({showModal, children }) {
    return (
        <>
            {showModal ? (
                <>
                    {/* Background */}
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 bg-black/30 outline-none focus:outline-none">
                        {/* Container */}
                        <div className="p-5 relative bg-white my-6 mx-auto max-w-3xl h-96 w-2/3 rounded-lg ">
                            {/* Content */}
                            {children}
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}
