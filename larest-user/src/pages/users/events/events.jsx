import { Option, Select } from '@mui/joy';
import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import SearchInput from '../../../components/Elements/Input/SearchInput';

const events = [
    {
        title: 'Promo Makan Siang',
        date: '2024-07-01',
        description: 'Dapatkan diskon 50% untuk semua menu makan siang!',
        image: 'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        type: 'Promo',
    },
    {
        title: 'Live Music Performance',
        date: '2024-07-05',
        description: 'Nikmati live music dari band lokal favorit Anda.',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        type: 'Concert',
    },
    {
        title: 'Flash Sale Akhir Pekan',
        date: '2024-07-07',
        description: 'Flash sale dengan diskon hingga 70% untuk item tertentu!',
        image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        type: 'Flash Sale',
    },
    {
        title: 'Promo Makan Malam',
        date: '2024-07-10',
        description: 'Diskon 30% untuk menu makan malam.',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        type: 'Promo',
    },
    {
        title: 'Workshop Memasak',
        date: '2024-07-15',
        description: 'Pelajari cara memasak dari chef terkenal.',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        type: 'Workshop',
    },
    {
        title: 'Festival Makanan',
        date: '2024-07-20',
        description: 'Nikmati berbagai makanan dari berbagai daerah.',
        image: 'https://plus.unsplash.com/premium_photo-1661310032863-0488bf177c54?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        type: 'Festival',
    },
];

const EventCard = ({ title, date, description, image, type }) => {
    const getBadgeColor = (type) => {
        switch (type) {
            case 'Promo':
                return 'from-green-400 to-green-600';
            case 'Concert':
                return 'from-blue-400 to-blue-600';
            case 'Flash Sale':
                return 'from-red-400 to-red-600';
            case 'Workshop':
                return 'from-yellow-400 to-yellow-600';
            case 'Festival':
                return 'from-purple-400 to-purple-600';
            default:
                return 'from-gray-400 to-gray-600';
        }
    };

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg my-4 transition-transform transform hover:-translate-y-2 hover:shadow-2xl">
            <div className="relative">
                <img className="w-full h-48 object-cover" src={image} alt={title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h2 className="text-lg font-bold">{title}</h2>
                </div>
            </div>
            <div className="px-6 py-4">
                <p className="text-gray-700 text-base">{description}</p>
            </div>
            <div className="px-6 py-4 flex items-center justify-between">
                <span className={`inline-block bg-gradient-to-r ${getBadgeColor(type)} rounded-full px-3 py-1 text-sm font-semibold text-white`}>
                    {type}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{date}</span>
            </div>
        </div>
    );
};

const Events = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');

    const filteredEvents = events.filter((event) => {
        return (
            (filterType === 'All' || event.type === filterType) &&
            event.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="container mx-auto sm:py-5   ">
            <Carousel
                showThumbs={false}
                showStatus={false}
                autoPlay
                infiniteLoop
                className="rounded-lg overflow-hidden shadow-xl mb-8"
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                        <button
                            type="button"
                            onClick={onClickHandler}
                            title={label}
                            className="absolute top-1/2 transform -translate-y-1/2 left-0 z-10 bg-black/15 h-full text-center p-2 hover:bg-black/50"
                        >
                            <i class="fa-solid fa-angle-left fa-xl text-white" />
                        </button>
                    )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                        <button
                            type="button"
                            onClick={onClickHandler}
                            title={label}
                            className="absolute top-1/2 transform -translate-y-1/2 right-0 z-10  bg-black/15 h-full text-center p-2 hover:bg-black/50"
                        >
                            <i class="fa-solid fa-angle-right fa-xl text-white" />
                        </button>
                    )
                }
            >
                {events.map((event, index) => (
                    <div key={index} className="relative">
                        <img className="h-96 object-cover rounded-lg" src={event.image} alt={event.title} />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
                            <h2 className="text-2xl font-bold">{event.title}</h2>
                            <p>{event.date}</p>
                            <p>{event.description}</p>
                        </div>
                    </div>
                ))}
            </Carousel>

            <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 rounded-lg shadow-md mb-8 text-white">
                <p className="text-center text-lg">Jangan lewatkan event-event menarik di restoran kami! Kami menyediakan berbagai promo, konser, dan flash sale yang bisa Anda nikmati.</p>
            </div>

            <div className="flex justify-between items-center mb-8">
                <SearchInput setSearchTerm={setSearchTerm} searchTerm={searchTerm} />   
                <Select
                    value={filterType}
                    onChange={(_, value) => setFilterType(value)}
                    sx={{ width: 300 }}
                >
                    <Option value="All" >All</Option>
                    <Option value="Promo">Promo</Option>
                    <Option value="Concert">Concert</Option>
                    <Option value="Flash Sale">Flash Sale</Option>
                    <Option value="Workshop">Workshop</Option>
                    <Option value="Festival">Festival</Option>
                </Select>
            </div>

            <h1 className="text-4xl font-bold text-center mt-4">Upcoming Events</h1>
            <div className="flex flex-wrap -mx-4 mt-4">
                {filteredEvents.map((event, index) => (
                    <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4">
                        <EventCard
                            title={event.title}
                            date={event.date}
                            description={event.description}
                            image={event.image}
                            type={event.type}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
