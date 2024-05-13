import CardMenu from "../Fragments/CardMenu"
import dish2 from "../../assets/dish-2.svg"

function Menu() {
    return (
        <div className="container">
            <h1 className="text-5xl font-semibold text-center">Sarapan Pagi</h1>
            <div className="grid grid-cols-4 gap-5 mt-8">
                <CardMenu image={dish2} title={"Cheese burger with fries"} price={"Rp15.000"} link="/menus/detail" />
                <CardMenu image={dish2} title={"Cheese burger with fries"} price={"Rp15.000"} link="/menus/detail" />
                <CardMenu image={dish2} title={"Cheese burger with fries"} price={"Rp15.000"} link="/menus/detail" />
                <CardMenu image={dish2} title={"Cheese burger with fries"} price={"Rp15.000"} link="/menus/detail" />
                <CardMenu image={dish2} title={"Cheese burger with fries"} price={"Rp15.000"} link="/menus/detail" />
                <CardMenu image={dish2} title={"Cheese burger with fries"} price={"Rp15.000"} link="/menus/detail" />
                <CardMenu image={dish2} title={"Cheese burger with fries"} price={"Rp15.000"} link="/menus/detail" />
            </div>
        </div>
    )
}

export default Menu