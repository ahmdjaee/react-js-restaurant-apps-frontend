import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useStateContext } from '../../context/ContextProvider';


function AuthLayout({ children }) {
    const { token } = useStateContext();

    if (token) {
        return <Navigate to="/users" />
    }

    return (
        <div className="relative flex justify-center h-screen ">
            {children}
        </div>
    )
}

AuthLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthLayout

