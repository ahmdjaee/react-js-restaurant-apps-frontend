import LoginForm from "../Fragments/Form/LoginForm"

function Authentication({ children }) {
    return (
        <div className="container flex justify-center h-screen">
            {children}
        </div>
    )
}

export default Authentication