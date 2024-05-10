import logo from './../../../assets/restaurant.svg'
import { Link } from 'react-router-dom'


function Logo({ home }) {
    return (
        <Link to={home}>
            <img src={logo} className='cursor-pointer' alt="Logo Restaurant" />
        </Link>
    )
}

export default Logo