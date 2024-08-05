import EmptyState from '@/components/Elements/Indicator/EmptyState';
import SearchInput from '@/components/Elements/Input/SearchInput';
import axiosClient from '@/services/axios';
import { Option, Select } from '@mui/joy';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useLoaderData } from 'react-router-dom';
import EventCard from './components/EventCard';

export async function loader() {
  const events = await axiosClient.get('/events');
  return { events: events?.data?.data };
}

const Events = () => {
  const { events } = useLoaderData();
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
        className="sm:rounded-lg overflow-hidden shadow-xl mb-8"
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute top-1/2 transform -translate-y-1/2 left-0 z-10 h-full text-center"
            >
              <svg className='size-12' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M9.293 11.293l4-4a1 1 0 0 1 1.414 1.414L11.414 12l3.293 3.293a1 1 0 1 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414z"
                  style={{
                    fill: "white",
                    stroke: "gray",
                    strokeWidth: 0.5,
                  }}
                />
              </svg>
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute top-1/2 transform -translate-y-1/2 right-0 z-10 h-full text-center p-2 "
            >
              <svg className='size-12' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="m14.707 12.707-4 4a1 1 0 0 1-1.414-1.414L12.586 12 9.293 8.707a1 1 0 1 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414z"
                  style={{
                    fill: "white",
                    stroke: "gray", // Warna border
                    strokeWidth: 0.5,  // Ketebalan border
                  }}
                />
              </svg>
            </button>
          )
        }
      >
        {events.map((event, index) => (
          <div key={index} className="relative">
            <img className="h-52 sm:h-96 object-cover" src={event.image_large} alt={event.title} />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
              <h2 className="text-2xl font-bold">{event.title}</h2>
              <p>{event.date}</p>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </Carousel>

      <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 sm:rounded-lg shadow-md mb-8 text-white">
        <p className="text-center text-lg">Jangan lewatkan event-event menarik di restoran kami! Kami menyediakan berbagai promo, konser, dan flash sale yang bisa Anda nikmati.</p>
      </div>

      <div className="flex justify-between items-center mb-8 gap-5 sm:mx-0 mx-3">
        <SearchInput onChange={setSearchTerm} value={searchTerm} />
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
      <div className="flex flex-wrap mx-auto sm:-mx-4 mt-4">
        {filteredEvents.length === 0
          ? <EmptyState />
          : filteredEvents.map((event, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4">
              <EventCard {...event} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Events;
