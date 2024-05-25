export default function CustomSnackbar({ text = "Success" }) {
    return (
        <div
            className="text-sm fixed bottom-8 right-9 animate-right-slide-in-fast block text-center py-3 shadow-xl shadow-gray-300 px-6 mb-4 leading-5 text-white bg-green-500 rounded-lg opacity-100 font-regular">
            {text}
        </div>
    )
}