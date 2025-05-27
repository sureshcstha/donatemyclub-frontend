import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ClubCard from '../components/ClubCard';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const debounceRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const endpoint = query.trim()
          ? `${API_BASE_URL}/api/clubs/search?query=${encodeURIComponent(query)}`
          : `${API_BASE_URL}/api/clubs`;

        const response = await fetch(endpoint, {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
          },
        });
        const data = await response.json();
        setClubs(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching clubs:', err);
        setError('Unable to load clubs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    // Debounce the search
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(fetchClubs, 500);
    
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handleDonate = (clubId) => {
    navigate(`/donate/${clubId}`);
  };

  const handleLearnMore = (clubId) => {
    navigate(`/about/${clubId}`);
  };

  if (loading) return <div className="p-4 text-center">Loading clubs...</div>;

  if (error) return (
    <div className="p-4 text-center text-red-600">
      {error}
    </div>
  );

  return (
    <div className="py-6 px-1 md:px-6">
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search clubs..."
          className="w-full max-w-md px-4 py-2 border border-blue-500 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center">Loading clubs...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {clubs.length > 0 ? (
            clubs.map((club) => (
              <ClubCard
                key={club.id}
                title={club.name}
                description={club.description}
                onDonateClick={() => handleDonate(club.id)}
                onLearnMoreClick={() => handleLearnMore(club.id)}
              />
            ))
          ) : (
            <div className="text-center text-gray-500">No clubs found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
