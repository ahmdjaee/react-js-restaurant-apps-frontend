export default function CustomSnackbar({ text = "Success", variant = "success", }) {

    let bgColor = "";
    switch (variant) {
        case "success":
            bgColor = "bg-green-500";
            break;
        case "error":
            bgColor = "bg-red-500";
            break;
        case "warning":
            bgColor = "bg-yellow-500";
            break;
        default:
            bgColor = "bg-green-500";
    }

    return (
        <div
            className={`${bgColor} text-sm fixed bottom-8 right-9 animate-right-slide-in-fast block text-center py-3 shadow-xl shadow-gray-300 px-6 mb-4 leading-5 text-white  rounded-lg opacity-100 font-regular`}>
            {text}
        </div>
    )
}