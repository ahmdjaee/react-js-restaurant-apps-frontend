import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


function AuthLayout({ children }) {
    return (
        <div className="relative container flex justify-center h-screen">
            <Link className="absolute top-8 left-10 cursor-pointer text-primary font-semibold" to="/">&#x2B9C; Home</Link>
            {children}
        </div>
    )
}

AuthLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthLayout

