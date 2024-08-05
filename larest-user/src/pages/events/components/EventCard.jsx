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

const EventCard = ({ title, event_start, description, image, type }) => {

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
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{event_start}</span>
      </div>
    </div>
  );
};

export default EventCard