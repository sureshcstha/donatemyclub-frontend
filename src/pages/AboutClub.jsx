import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AboutClub = () => {
  const { clubId } = useParams();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/clubs/${clubId}`);
        const data = await response.json();
        setClub(data);
      } catch (error) {
        console.error('Error fetching club details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubDetails();
  }, [clubId]);

  if (loading) return <div className="p-4 text-center">Loading club info...</div>;
  if (!club) return <div className="p-4 text-center">Club not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{club.name}</h1>
      <p className="mb-4 text-gray-700">{club.description}</p>

      {club.details && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">More About Us</h2>
          <p className="text-gray-600">{club.details}</p>
        </div>
      )}

      <Link to="/" className="inline-block mt-8 text-blue-600 underline hover:text-blue-800">
        ← Back to Home
      </Link>
    </div>
  );
};

export default AboutClub;
