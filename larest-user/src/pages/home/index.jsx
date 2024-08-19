import OvalButton from "@/components/Elements/Button/OvalButton"
import CardMenu from "@/components/Fragments/Card/CardMenu"
import Footer from "@/components/Fragments/Footer"
import CartMenuLayout from "@/components/Layouts/CardMenuLayout"
import axiosClient from "@/services/axios"
import { PiBowlFood } from "react-icons/pi"
import { Link, useLoaderData } from "react-router-dom"
import Check from "./../../assets/check.svg"
import Chef from "./../../assets/chef-1.svg"
import Facebook from "./../../assets/facebook.svg"
import HeroImage from "./../../assets/hero.svg"
import Instagram from "./../../assets/instagram.svg"
import Twitter from "./../../assets/twitter.svg"
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa6"
import { TfiTwitter } from "react-icons/tfi";
import { Button } from "@mui/joy"

export async function loader() {
  const categories = await axiosClient.get('/categories')
  return { categories: categories?.data?.data }
}

export default function Home() {
  const { categories } = useLoaderData()

  return (
    <div className="overflow-x-clip">
      <section className="container justify-between flex flex-col sm:flex-row items-center sm:px-3 sm:pt-8 pb-16">
        <img src="https://images.unsplash.com/photo-1478749485505-2a903a729c63?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="sm:hidden mb-10  h-80" />
        <div className="sm:w-2/5 animate-left-slide-in text-center sm:text-start px-3 sm:px-0">
          <h1 className="text-3xl sm:text-5xl font-semibold">We provide the best food for you</h1>
          <p className="text-base my-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <Link to={"/menus"}>
            <OvalButton text="Menu" type="dark" style="me-5" />
          </Link>
          <Link to={"/reservation"}>
            <OvalButton text="Book A table" />
          </Link>
          <div className="flex gap-4 mt-10 sm:mt-20 justify-center sm:justify-start">
            <img src={Facebook} alt="" />
            <img src={Instagram} alt="" />
            <img src={Twitter} alt="" />
          </div>
        </div>
        <img
          className="hidden sm:block sm:w-2/4 min-h-[36rem] animate-right-slide-in"
          src={HeroImage}
          alt=""
        />
      </section>

      <section className="bg-gray-100 py-12 text-center">
        <div className="container">
          <h1 className="text-3xl sm:text-5xl font-semibold my-5">Our Special Dishes</h1>
          <p className="sm:w-1/2 mx-auto mb-16">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique, ratione! Atque consectetur blanditiis molestias. Accusantium rerum at sed fuga mollitia.</p>
          <CartMenuLayout>
            <CardMenu menu={{
              name: "Lumpia",
              image: "https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              price: 10000
            }} />
            <CardMenu menu={{
              name: "Lumpia",
              image: "https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              price: 10000
            }} />
            <CardMenu menu={{
              name: "Lumpia",
              image: "https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              price: 10000
            }} />
            <CardMenu menu={{
              name: "Lumpia",
              image: "https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              price: 10000
            }} />
            <CardMenu menu={{
              name: "Lumpia",
              image: "https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              price: 10000
            }} />
            <CardMenu menu={{
              name: "Lumpia",
              image: "https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              price: 10000
            }} />
            <CardMenu menu={{
              name: "Lumpia",
              image: "https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              price: 10000
            }} />
            <CardMenu menu={{
              name: "Lumpia",
              image: "https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              price: 10000
            }} />
          </CartMenuLayout>

          <div className="flex flex-col mt-20 container">
            <h1 className="text-3xl sm:text-5xl font-semibold text-center">Our Best Category</h1>
            <CartMenuLayout>
              {categories.map((category) => (
                <Link key={category.id} className="bg-white rounded cursor-pointer shadow">
                  <div
                    className="bg-cover bg-center h-64 rounded-t"
                    style={{ backgroundImage: `url(${category?.image})` }}
                  >
                    <div className="backdrop-blur-sm rounded-[inherit] w-full h-full flex items-center justify-center">
                      <PiBowlFood className="text-white text-6xl" />
                    </div>
                  </div>
                  <h5 className="px-8 py-6 text-xl font-bold">{category.name}</h5>
                </Link>
              ))}
            </CartMenuLayout>
          </div>
        </div>
      </section>

      <section className="flex flex-col sm:flex-row container items-center py-12 gap-3 sm:gap-5">
        <div className="mx-5 sm:mx-0">
          <h1 className="text-3xl text-center sm:text-start sm:text-5xl font-semibold">Our Expert Chefs</h1>
          <p className="text-base my-8 sm:my-16">Discover the culinary talents of our skilled and experienced chefs.</p>
          <div className="grid sm:grid-cols-2 gap-y-8 gap-x-4">
            <div className="flex gap-3 items-start">
              <img className="py-2" src={Check} alt="Check mark" />
              <p>Chef John Doe: French cuisine and pastry arts.</p>
            </div>
            <div className="flex gap-3 items-start">
              <img className="py-2" src={Check} alt="Check mark" />
              <p>Chef Jane Smith: Italian and Mediterranean dishes.</p>
            </div>
            <div className="flex gap-3 items-start">
              <img className="py-2" src={Check} alt="Check mark" />
              <p>Chef Carlos Rodriguez: Latin American cuisine.</p>
            </div>
            <div className="flex gap-3 items-start">
              <img className="py-2" src={Check} alt="Check mark" />
              <p>Chef Emily Brown: Asian fusion dishes.</p>
            </div>
            <div className="flex gap-3 items-start">
              <img className="py-2" src={Check} alt="Check mark" />
              <p>Chef Michael Lee: Barbecue and smoked meats.</p>
            </div>
            <div className="flex gap-3 items-start">
              <img className="py-2" src={Check} alt="Check mark" />
              <p>Chef Sarah Kim: Desserts and confectionery.</p>
            </div>
          </div>
        </div>

        <img className="w-2/5 order-first sm:order-last" src={Chef} alt="" />
      </section>
      <Footer />
    </div>
  )

}


