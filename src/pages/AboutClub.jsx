import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AboutClub = () => {
  const { clubId } = useParams();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState([]);
  const [donationLoading, setDonationLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);

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

    const fetchDonations = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/clubs/${clubId}/donations`);
        const data = await res.json();
        setDonations(data.donations || []);
        setTotalAmount(data.totalAmount || 0);
      } catch (err) {
        console.error('Error fetching donations:', err);
      } finally {
        setDonationLoading(false);
      }
    };

    fetchClubDetails();
    fetchDonations();
  }, [clubId]);

  if (loading) return <div className="p-4 text-center">Loading club info...</div>;
  if (!club) return <div className="p-4 text-center">Club not found.</div>;

  return (
    <div className="max-w-3xl mx-auto py-6 px-1">
      <h1 className="text-4xl font-bold mb-4">{club.name}</h1>
      <p className="mb-4 text-gray-700">{club.description}</p>

      <Link
        to={`/donate/${clubId}`}
        className="inline-block mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Donate
      </Link>

    <div className="mt-4">
        <h2 className="text-2xl font-semibold mb-4">Donation Summary</h2>
        {donationLoading ? (
          <div>Loading donations...</div>
        ) : donations.length === 0 ? (
          <div>No donations yet.</div>
        ) : (
          <>
            <p className="mb-4 text-gray-700">Total Raised: <strong>${totalAmount}</strong></p>
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Donor Name</th>
                  <th className="border px-4 py-2 text-left">Amount</th>
                  <th className="border px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation._id}>
                    <td className="border px-4 py-2">
                      {donation.donorFirstName} {donation.donorLastName}
                    </td>
                    <td className="border px-4 py-2">${donation.amount}</td>
                    <td className="border px-4 py-2">
                        {new Date(donation.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                        })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      <Link to="/" className="inline-block mt-8 text-blue-600 underline hover:text-blue-800">
        ← Back to Home
      </Link>
    </div>
  );
};

export default AboutClub;
