import PropTypes from 'prop-types';


function Authentication({ children }) {
    return (
        <div className="relative container flex justify-center h-screen">
            <a className="absolute top-20 left-72 cursor-pointer text-orange-900 font-semibold" href="/">&#x2B9C; Home</a>
            {children}
        </div>
    )
}

Authentication.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Authentication

