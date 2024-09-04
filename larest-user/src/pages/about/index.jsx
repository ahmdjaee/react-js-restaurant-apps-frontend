import dish3 from "../../assets/dish-3.svg"

function About() {
   return (
      <div className="container flex flex-col items-center text-center sm:py-5   ">
         <section>
            <div className="w-full sm:rounded-xl h-80 bg-slate-100 bg-about-us bg-no-repeat bg-center bg-cover"></div>
            <h1 className="text-5xl font-bold my-8 text-primary">GREAT INDONESIAN FOOD COMES FIRST</h1>
            <div className="sm:px-28">
               <p className="my-3">Every day, millions of guests visit our restaurants across Indonesia. They do so because our establishments are known for serving high-quality, great tasting, and affordable Indonesian cuisine. Founded in 2000, we have grown to become one of the largest Indonesian food chains in the country.</p>
               <p className="my-3">Our journey commenced in Jakarta, and today, we operate more than 200 restaurants across Indonesia where customers can savor the rich and diverse flavors of Indonesian cuisine. Download the Company Profile from here. Download the Financial Statements for the year 2019 from here and 2020 from here.</p>
               <p className="my-3">Our commitment to premium ingredients, signature recipes, and family-friendly dining experiences has defined our brand for over 20 successful years.</p>
            </div>
         </section>
         <section>
            <img className="mx-auto mt-8 w-1/4" src={dish3} alt="" />
            <h1 className="text-5xl font-bold my-8 text-primary">NASI GORENG</h1>
            <h2 className="text-xl font-bold">OUR ICONIC DISH</h2>
            <div className="sm:px-28">
               <p className="my-3">Nasi Goreng is Indonesia's favorite dish. First served in our restaurants in 2000, Nasi Goreng, with its aromatic fried rice, tender pieces of chicken, fresh vegetables, and a hint of traditional spices, has become an iconic dish loved by generations. Served with a side of crispy prawn crackers and a fried egg on top, it is a complete meal that delights the senses and satisfies hunger.</p>
               <p className="my-3">For those who prefer a lighter option, we also offer Nasi Goreng with smaller portions and a variety of side dishes to complement the meal.</p>
               <p className="my-3">Our dedication to authentic Indonesian flavors, high-quality ingredients, and a welcoming dining atmosphere ensures that every visit to our restaurants is a memorable experience.</p>
            </div>
         </section>
      </div>
   )
}

export default About