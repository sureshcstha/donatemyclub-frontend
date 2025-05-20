import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClubCard from '../components/ClubCard'; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Home = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/clubs`); 
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

    fetchClubs();
  }, []);

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
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {clubs.map((club) => (
        <ClubCard
          key={club.id}
          title={club.name}
          description={club.description}
          onDonateClick={() => handleDonate(club.id)}
          onLearnMoreClick={() => handleLearnMore(club.id)}
        />
      ))}
    </div>
  );
};

export default Home;
