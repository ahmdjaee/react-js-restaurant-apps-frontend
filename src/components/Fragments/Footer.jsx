function Footer()
{
    return (
        <div className="container grid grid-cols-4 my-8 gap-x-5">
            <div className="">
                <h1 className="font-semibold">Lorem ipsum dolor sit amet.</h1>
                <p className="my-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, assumenda autem laudantium ex veniam non voluptates.</p>
                <h1 className="font-semibold">Lorem ipsum dolor sit amet.</h1>
                <div className="grid grid-cols-3">
                    <p>Lorem ipsum dolor sit amet.</p>
                    <p>Lorem ipsum dolor sit amet.</p>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
            </div>
            <div>
                <p className="font-semibold">Navigation</p>
                <p>Menu</p>
                <p>About us</p>
                <p>Contact Us</p>
                <p>Main dishes</p>
            </div>
            <div>
                <p className="font-semibold">Dishes</p>
                <p>Fishes & Viggies</p>
                <p>Tofu Chilli</p>
                <p>Egg & Cucumber</p>
                <p>Lumpia with Sauce</p>
            </div>
            <div className="font-semibold">
                <p>Follow Us</p>
            </div>
        </div>
    )
}

export default Footer