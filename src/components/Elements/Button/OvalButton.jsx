function OvalButton({ text }) {
    return (
        <button className="
        text-white font-semibold rounded-br-xl rounded-tr-md rounded-tl-xl rounded-bl-md   
        px-6 py-4 bg-primary shadow-lg hover:bg-primary/90" >
            {text}
        </button>
    )
}

export default OvalButton