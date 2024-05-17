import dish from "../../../assets/dish-1.svg"

function CardMenuOval() {
    return (
        <div className="bg-white h-84 w-72 rounded-tr-xl rounded-bl-xl rounded-br-4xl rounded-tl-4xl text-center mt-24 cursor-pointer transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-105">
            <div className="relative -top-28 flex flex-col justify-center px-5">
                <img className="object-cover" src={dish} alt="" />
                <h1 className="font-semibold text-xl my-8">Lumpia with sauce</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia accusantium</p>
            </div>
        </div>
    )
}

export default CardMenuOval