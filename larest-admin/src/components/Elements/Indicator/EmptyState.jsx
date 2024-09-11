function EmptyState({ text }) {
    const divStyle = {
        backgroundImage: `url(/empty-box.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '150px',
        height: '150px'
      };

  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <div style={divStyle}/>
      <p className="text-lg mb-4 mt-2 font-bold text-gray-400">{text}</p>
    </div>
  );
}

export default EmptyState;
