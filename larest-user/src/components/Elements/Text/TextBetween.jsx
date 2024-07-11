export default function TextBetween({
    leftStyle,
    leftText = "",
    rightStyle,
    rightText = "",
    className,
    fontSize = "text-sm"
}) {
    return (
        <div className={`flex items-center justify-between my-2 ${className}`}>
            <p className={`${fontSize} font-medium text-gray-900 ${leftStyle}`}>{leftText}</p>
            <p className={`${fontSize} font-semibold text-gray-900 ${rightStyle}`}>{rightText}</p>
        </div>
    );
}
