const ClubCard = ({ title, description, onDonateClick, onLearnMoreClick }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex gap-4">
        <button
          onClick={onDonateClick}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Donate
        </button>
        <button
          onClick={onLearnMoreClick}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ClubCard;
