function OvalButton({ text, style, type, onClick }) {
    const dark = "bg-dark hover:bg-dark/90"
    const primary = "bg-primary hover:bg-primary/90"

    return (
        <button className={` ${style}
        text-white font-semibold rounded-br-xl rounded-tr-md rounded-tl-xl rounded-bl-md   
        px-6 py-4 ${type === "dark" ? dark : primary} shadow-lg "`} onClick={onClick} >
            {text}
        </button>
    )
}

export default OvalButton