import PropTypes from 'prop-types';

export default function Modal({ showModal, children }) {

    return (
        <>
            {showModal ? (
                <>
                    {/* Background */}
                    <div id="modal" className="flex flex-row-reverse justify-center items-end sm:items-center bg-black/30 overflow-x-clip fixed top-0 inset-0 z-50 overflow-y-auto outline-none focus:outline-none">
                        {/* Container */}
                        <div className="p-5 w-screen h-[80%] overflow-y-auto sm:w-fit sm:absolute sm:h-fit z-50 bg-white sm:my-6 sm:mx-auto sm:mb-16 sm:m-0 rounded-lg ">
                            {/* Content */}
                            {children}
                            <div className="h-16 sm:h-0"></div>
                        </div>
                        {/* <div className="bg-white h-80 w-full"></div> */}
                    </div>
                </>
            ) : null}
        </>
    );
}

Modal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};
