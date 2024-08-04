import { Link } from "react-router-dom";
import TextCurrency from "../../Elements/Text/TextCurrency";

function CardMenu({ menu: { image = "", name = "", price = 0 }, link, className }) {
  return (
    <Link to={link} className={className}>
      <div className="flex flex-col items-center text-center cursor-pointer transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-105">
        <img className="object-cover object-center size-[250px] w-full" src={image} alt="" />
        <p className="font-bold mt-4">{name}</p>
        <TextCurrency text={price} className="font-semi-bold mt-2 mb-4 text-base" />
      </div>
    </Link>
  )
}

export default CardMenu