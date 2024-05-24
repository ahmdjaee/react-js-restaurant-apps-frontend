/* eslint-disable react/no-unescaped-entities */
import dish3 from "../../assets/dish-3.svg"

function About() {
    return (
        <div className="container flex flex-col items-center text-center py-8   ">
            <section>
                <div className="w-full rounded-xl h-80 bg-slate-100 bg-about-us bg-no-repeat bg-center bg-cover"></div>
                <h1 className="text-5xl font-bold my-8 text-primary">GREAT FOOD COMES FIRST  </h1>
                <div className="px-28">
                    <p className="my-3">Every day, more than 11 million guests visit BURGER KING® restaurants around the world. And they do so because our restaurants are known for serving high-quality, great tasting, and affordable food. Founded in 1954, BURGER KING® is the second largest fast food hamburger chain in the world.</p>
                    <p className="my-3">BURGER KING® commenced operations in Indonesia in 2007. Today, Burger King Indonesia operates more than 170 BURGER KING® restaurants in Indonesia where customers across the city can enjoy the great flame-grilled taste of our products. Download the Company Profile from here. Download the Financial Statements for the year 2019 from here and 2020 from here.</p>
                    <p className="my-3">The original HOME OF THE WHOPPER®, our commitment to premium ingredients, signature recipes, and family-friendly dining experiences is what has defined our brand for more than 50 successful years.</p>
                </div>
            </section>
            <section>
                <img className="mx-auto mt-8 w-1/4" src={dish3} alt="" />
                <h1 className="text-5xl font-bold my-8 text-primary">The WHOPPER</h1>
                <h2 className="text-xl font-bold">BURGER KING®’S ICONIC PRODUCT</h2>
                <div className="px-28">
                    <p className="my-3">The WHOPPER® is America's favourite burger. First off a hot broiler in 1957, the WHOPPER®, boasting a quarter pound of flame-grilled beef, ripe tomatoes, crisp lettuce, creamy mayo, ketchup, onions and crunchy pickles on a toasted sesame seed bun, has become an iconic burger for the ages and boasts generations of fans worldwide. There are 221,184 possible ways for a guest to order an original WHOPPER®.</p>
                    <p className="my-3">For those who like the taste of the WHOPPER® but find it too filling, we also have the smaller version of this all time classic, the WHOPPER JR®.</p>
                </div>
            </section>
        </div>
    )
}

export default About