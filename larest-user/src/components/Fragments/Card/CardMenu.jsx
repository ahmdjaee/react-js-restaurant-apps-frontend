import { Link } from "react-router-dom";
import TextCurrency from "../../Elements/Text/TextCurrency";

function CardMenu({ menu: { image = "", name = "", price = 0 }, link, className }) {
  return (
    <Link to={link} className={className}>
      <div className="bg-white rounded flex flex-col items-center shadow text-start cursor-pointer transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-105">
        <img className="object-cover object-center size-[200px] sm:h-[250px] w-full" src={image ? image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJRS-4chjWMRAmrtz7ivK53K_uygrgjzw9Uw&s"} alt="" />
        <p className="font-semibold text-sm sm:text-base sm:font-bold mt-2 sm:mt-4">{name}</p>
        <TextCurrency text={price} className="font-semibold sm:mt-2 mb-4 text-base" />
      </div>
    </Link>
  )
}

export default CardMenu