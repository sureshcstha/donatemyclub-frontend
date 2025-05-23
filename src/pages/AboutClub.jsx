import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const columns = [
  {
    name: 'First Name',
    selector: row => row.donorFirstName,
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: row => row.donorLastName,
    sortable: true,
  },
  {
    name: 'Amount',
    selector: row => row.amount,
    format: row => `$${row.amount.toFixed(2)}`,
    sortable: true,
  },
  {
    name: 'Date',
    selector: row => new Date(row.date),
    format: row =>
      new Date(row.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }),
    sortable: true,
  },
];

const customStyles = {
  headCells: {
    style: {
      fontWeight: 'bold',
    },
  },
};

const AboutClub = () => {
  const { clubId } = useParams();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [donationCount, setDonationCount] = useState(0);

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
        setDonationCount(data.donationCount || 0);
      } catch (err) {
        console.error('Error fetching donations:', err);
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
        <h2 className="text-xl font-semibold mb-1">Donation Summary</h2>
        <p className="mb-1 text-gray-700">Total Donations: <strong>{donationCount}</strong></p>
        <p className="mb-4 text-gray-700">Total Raised: <strong>${totalAmount}</strong></p>
      </div>

      <DataTable
        keyField="_id"
        columns={columns}
        data={donations}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        highlightOnHover
        striped
        dense
        customStyles={customStyles}
      />

      <Link to="/" className="inline-block mt-8 text-blue-600 underline hover:text-blue-800">
        ← Back to Home
      </Link>
    </div>
  );
};

export default AboutClub;
