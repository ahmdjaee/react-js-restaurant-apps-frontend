import { useState } from "react"
import { Link } from "react-router-dom"
import OvalButton from "../../components/Elements/Button/OvalButton"
import CardCustomer from "../../components/Fragments/Card/CardCustomer"
import CardMenuOval from "../../components/Fragments/Card/CardMenuOval"
import Footer from "../../components/Fragments/Footer"
import BookingForm from "../../components/Fragments/Form/BookingForm"
import Modal from "../../components/Fragments/Modal/Modal"
import Check from "./../../assets/check.svg"
import Chef from "./../../assets/chef-1.svg"
import Facebook from "./../../assets/facebook.svg"
import HeroImage from "./../../assets/hero.svg"
import HeroImage2 from "./../../assets/hero2.svg"
import Instagram from "./../../assets/instagram.svg"
import Twitter from "./../../assets/twitter.svg"
import { getTable } from "../../services/TableService"
import BookingDetail from "../../components/Fragments/Form/BookingDetail"
import CardUserNotLogin from "../../components/Fragments/Card/CardUserNotLogin"
import useReservation from "../../hooks/reservation/useReservation"

export default function Home() {
    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState([]);

    const user = localStorage.getItem("user") !== undefined && JSON.parse(localStorage.getItem("user"))
    const [reservation, loading, error] = useReservation();

    async function fetchTable() {
        const response = await getTable()

        if (response.data) {
            setData(response.data)
        }
    }

    function checkUser() {
        if (user) {
            return (
                <>
                    {reservation
                        ? <BookingDetail reservation={reservation} loading={loading} onCancel={() => setShowModal(false)} />
                        : <BookingForm onCancel={() => setShowModal(false)} success={() => setShowModal(false)} />
                    }
                </>
            )
        } else {
            return <CardUserNotLogin onClose={() => setShowModal(false)} />
        }
    }


    return (
        <div className="overflow-x-clip">
            <Modal onKeyDown={() => setShowModal(false)} showModal={showModal} >
                {checkUser()}
            </Modal>

            <section className="container justify-between flex flex-col sm:flex-row items-center pt-8 pb-16">
                <div className="sm:w-2/5 animate-left-slide-in">
                    <h1 className="text-5xl font-semibold">We provide the best food for you</h1>
                    <p className="text-base my-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <Link to={"/menus"}><OvalButton text="Menu" type="dark" style="me-5" /></Link>

                    <OvalButton text="Book A table" onClick={() => {
                        setShowModal(true)
                        fetchTable()
                    }} />
                    <div className="flex gap-4 mt-20">
                        <img src={Facebook} alt="" />
                        <img src={Instagram} alt="" />
                        <img src={Twitter} alt="" />
                    </div>
                </div>
                <img
                    className="sm:w-2/4 min-h-[36rem] animate-right-slide-in"
                    src={HeroImage}
                    alt=""
                />
            </section>

            <section className="bg-zinc-200 py-12 text-center">
                <div className="container">
                    <h1 className="text-5xl font-semibold my-5">Our Special Dishes</h1>
                    <p className="sm:w-1/2 mx-auto mb-16">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique, ratione! Atque consectetur blanditiis molestias. Accusantium rerum at sed fuga mollitia.</p>

                    <div className="flex flex-row overflow-x-auto overflow-y-clip sm:justify-center gap-7">
                        <CardMenuOval />
                        <CardMenuOval />
                        <CardMenuOval />
                        <CardMenuOval />
                    </div>

                    <div className="flex flex-col sm:flex-row mt-20 container text-start items-center">
                        <img className="sm:w-2/4 animate-spin-slow " src={HeroImage2} alt="" />
                        <div className="sm:ms-24">
                            <h1 className="text-5xl font-semibold">Wecome to Our Restaurant</h1>
                            <p className="text-base my-16">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <OvalButton text="Menu" type="dark" style="me-5" />
                            <OvalButton text="Book A table" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex flex-col sm:flex-row container items-center py-12 gap-5">
                <div>
                    <h1 className="text-5xl font-semibold">Our Expects Chef</h1>
                    <p className="text-base my-16">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <div className="grid sm:grid-cols-2 gap-y-8 gap-x-4">
                        <div className="flex gap-3 items-start">
                            <img className="py-2" src={Check} alt="" />
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <img className="py-2" src={Check} alt="" />
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <img className="py-2" src={Check} alt="" />
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <img className="py-2" src={Check} alt="" />
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <img className="py-2" src={Check} alt="" />
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <img className="py-2" src={Check} alt="" />
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore</p>
                        </div>
                    </div>
                </div>
                <img className="w-2/5 order-first sm:order-last" src={Chef} alt="" />
            </section>

            <section className="bg-zinc-200 py-12 text-center">
                <div className="container">
                    <h1 className="text-5xl font-semibold">Our Happy Customers</h1>
                    <p className="text-base my-16">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                    <div className="flex justify-center  gap-7">
                        <CardCustomer />
                        <CardCustomer />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )

}
