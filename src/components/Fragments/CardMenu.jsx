function CardMenu({image, title, price}) {
    return (
        <div className="flex flex-col items-center text-center cursor-pointer">
            <img src={image} alt="" />
            <p className="font-bold mt-4">{title}</p>
            <p className="font-semibold my-4">{price}</p>
        </div>
    )
}

export default CardMenu