import { Link } from "react-router-dom";
import TextCurrency from "../../Elements/Text/TextCurrency";
import PropTypes from 'prop-types';

function CardMenu({ menu, link }) {
    return (
        <Link to={link}>
            <div className="flex flex-col items-center text-center cursor-pointer transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-105">
                <img className="object-cover h-56 w-full" src={menu.image} alt="" />
                <p className="font-bold mt-4">{menu.name}</p>
                <TextCurrency text={menu.price} className="font-semi-bold mt-2 mb-4 text-base" />
            </div>
        </Link>
    )
}

CardMenu.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    link: PropTypes.string.isRequired,
};
export default CardMenu