import { Link } from "react-router-dom"
import TextCurrency from "../../Elements/Text/TextCurrency"
function CardMenu({ image, title, price, link }) {
    return (
        <Link to={link}>
            <div className="flex flex-col items-center text-center cursor-pointer transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-105">
                <img className="object-cover h-56 w-full bg-gray-200" src={image} alt="" />
                <p className="font-bold mt-4">{title}</p>
                <TextCurrency text={price} style="font-semi-bold mt-2 mb-4 text-base" />
            </div>
        </Link>
    )
}

export default CardMenu