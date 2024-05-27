import PropTypes from 'prop-types';

export default function Modal({ showModal, children }) {

    return (
        <>
            {showModal ? (
                <>
                    {/* Background */}
                    <div id="modal" className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 bg-black/30 outline-none focus:outline-none">
                        {/* Container */}
                        <div className="p-5 absolute z-50 bg-white my-6 mx-auto  rounded-lg ">
                            {/* Content */}
                            {children}
                        </div>
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
