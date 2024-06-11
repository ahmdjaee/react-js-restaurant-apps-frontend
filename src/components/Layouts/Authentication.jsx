import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


function Authentication({ children }) {
    return (
        <div className="relative container flex justify-center h-screen">
            <Link className="absolute top-20 left-72 cursor-pointer text-primary font-semibold" to="/">&#x2B9C; Home</Link>
            {children}
        </div>
    )
}

Authentication.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Authentication

