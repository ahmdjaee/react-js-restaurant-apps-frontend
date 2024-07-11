export default function TextError({ text, className }) {
    return (
        <p className={`text-red-500 text-xs ${className}`}>{text}</p>
    )
}