export default function CardCart({ image, title, description, quantity }) {
    return (
        <div className="bg-white flex-grow rounded-lg h-40 p-5 flex">
            <img className="w-36 object-cover" src={image} alt="" />
            <div className="mx-5 text-ellipsis flex-grow flex flex-col">
                <p className=" font-semibold">{title}</p>
                <p className="text-sm flex-grow">{description}</p>
                <p className="font-semibold text-sm text-end">Quantity : {quantity}</p>
            </div>
        </div>
    )
}