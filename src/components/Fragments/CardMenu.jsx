import { Link } from "react-router-dom"

function CardMenu({ image, title, price, link }) {
    return (
        <Link to={link}>
            <div className="flex flex-col items-center text-center cursor-pointer transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-105">
                <img src={image} alt="" />
                <p className="font-bold mt-4">{title}</p>
                <p className="font-semibold my-4">{price}</p>
            </div>
        </Link>
    )
}

export default CardMenu