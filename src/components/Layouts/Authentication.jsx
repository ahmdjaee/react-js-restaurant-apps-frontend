import LoginForm from "../Fragments/Form/LoginForm"

function Authentication({ children }) {
    return (
        <div className="container flex justify-center h-screen">
            <a className="absolute top-20 left-96 cursor-pointer text-orange-900 font-semibold" href="/">&#x2B9C; Back</a>
            {children}
        </div>
    )
}

export default Authentication