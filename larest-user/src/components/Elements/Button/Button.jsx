function Button({ text, style ,onClick }) {
    return (
        <button onClick={onClick} className={`${style} bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg px-4 py-2 shadow-lg`}>{text}</button>
    )
}

export default Button