import { Link } from 'react-router-dom'


function Logo({ home }) {
    return (
        <Link to={home} className=" flex items-center gap-5 " >
            <svg width="40" height="47" viewBox="0 0 48 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.2857 38.0715C20.6113 38.0715 24.9285 33.7542 24.9285 28.4286C24.9285 23.103 20.6113 18.7858 15.2857 18.7858C9.96008 18.7858 5.64282 23.103 5.64282 28.4286C5.64282 33.7542 9.96008 38.0715 15.2857 38.0715Z" stroke="url(#paint0_linear_186_4)" strokeWidth="3.57143" />
                <path d="M0.00261579 31C0.000871931 31.1188 0 31.2378 0 31.3571C0 44.5725 10.7132 55.2857 23.9286 55.2857C37.1439 55.2857 47.8571 44.5725 47.8571 31.3571C47.8571 31.2378 47.8563 31.1188 47.8545 31H0.00261579Z" fill="url(#paint1_linear_186_4)" />
                <path d="M35.6429 24.5C38.0098 24.5 39.9286 22.5812 39.9286 20.2143C39.9286 17.8474 38.0098 15.9286 35.6429 15.9286C33.276 15.9286 31.3572 17.8474 31.3572 20.2143C31.3572 22.5812 33.276 24.5 35.6429 24.5Z" stroke="#EAA427" strokeWidth="2.14286" />
                <path d="M27.7857 10.2144C30.1526 10.2144 32.0714 8.29559 32.0714 5.92865C32.0714 3.56172 30.1526 1.64294 27.7857 1.64294C25.4188 1.64294 23.5 3.56172 23.5 5.92865C23.5 8.29559 25.4188 10.2144 27.7857 10.2144Z" stroke="#EA7727" strokeWidth="2.14286" />
                <defs>
                    <linearGradient id="paint0_linear_186_4" x1="7.42859" y1="20.2143" x2="22.4286" y2="37.7143" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#EA6D27" />
                        <stop offset="1" stopColor="#EAA827" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_186_4" x1="6.42857" y1="31" x2="35" y2="46.7142" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF9400" />
                        <stop offset="1" stopColor="#EA6D27" />
                    </linearGradient>
                </defs>
            </svg>
            <p className='text-2xl font-bold text-gray-800 mt-2'>larest</p></Link>

        // <Link to={home}>
        //     {/* <img src={logo} className='cursor-pointer' alt="Logo Restaurant" /> */}
        // </Link>
    )
}

export default Logo