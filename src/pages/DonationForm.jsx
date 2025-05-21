import { useState } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useParams, Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#32325d',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
    },
  },
};

const DonationForm = () => {
    const { clubId } = useParams();
    const [formData, setFormData] = useState({
        amount: '',
        donorFirstName: '',
        donorLastName: '',
        donorEmail: '',
    });

    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);
        setMessage('');

        try {   
            const res = await fetch(`${API_BASE_URL}/api/clubs/${clubId}/donate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const responseBody = await res.json();

            if (!res.ok) {
                setMessage(responseBody.error || 'Something went wrong. Please try again.');
                setMessageType('error');
                return;
            }

            const { clientSecret } = responseBody;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: `${formData.donorFirstName} ${formData.donorLastName}`,
                        email: formData.donorEmail,
                    },
                },
            });

            if (result.error) {
                setMessage(result.error.message);
            } else if (result.paymentIntent.status === 'succeeded') {
                setMessage('Donation successful! Thank you.');
                setFormData({ amount: '', donorFirstName: '', donorLastName: '', donorEmail: '' });
                setMessageType('success');

                // Clear Stripe fields
                elements.getElement(CardNumberElement)?.clear();
                elements.getElement(CardExpiryElement)?.clear();
                elements.getElement(CardCvcElement)?.clear();
            }
        } catch (err) {
            setMessage('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const formatClubName = (id) => {
        if (!id) return '';
        return id
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div className="max-w-md mx-auto py-6 px-1">
            <h1 className="text-2xl font-bold text-center mb-4">
                Donate to {formatClubName(clubId) || '...'}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <label className="block text-base font-medium text-gray-700" htmlFor="amount">
                Donation Amount (USD) <span className="text-red-500">*</span>
            </label>
            <input
                type="number"
                id="amount"
                name="amount"
                placeholder="Amount (USD)"
                onChange={handleChange}
                value={formData.amount}
                className="w-full p-2 border rounded"
                required
            />
            <label className="block text-base font-medium text-gray-700" htmlFor="donorFirstName">
                First Name <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                id="donorFirstName"
                name="donorFirstName"
                placeholder="First Name"
                onChange={handleChange}
                value={formData.donorFirstName}
                className="w-full p-2 border rounded"
                required
            />
            <label className="block text-base font-medium text-gray-700" htmlFor="donorLastName">
                Last Name <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                id="donorLastName"
                name="donorLastName"
                placeholder="Last Name"
                onChange={handleChange}
                value={formData.donorLastName}
                className="w-full p-2 border rounded"
                required
            />
            <label className="block text-base font-medium text-gray-700" htmlFor="donorEmail">
                Email Address <span className="text-red-500">*</span>
            </label>
            <input
                type="email"
                id="donorEmail"
                name="donorEmail"
                placeholder="Email"
                onChange={handleChange}
                value={formData.donorEmail}
                className="w-full p-2 border rounded"
                required
            />
            <Link to="/test-cards" className="text-blue-600 underline hover:text-blue-800">
                How to use test cards →
            </Link>
            <label className="block text-base font-medium text-gray-700">
                Card Number <span className="text-red-500">*</span>
            </label>
            <div className="p-2 border rounded">
            <CardNumberElement options={ELEMENT_OPTIONS} />
            </div>

            <div className="flex gap-4 mt-4">
                <div className="w-1/2">
                    <label className="block text-base font-medium text-gray-700 mb-1">
                        Expiration Date <span className="text-red-500">*</span>
                    </label>
                    <div className="p-2 border rounded">
                    <CardExpiryElement options={ELEMENT_OPTIONS} />
                    </div>
                </div>

                <div className="w-1/2">
                    <label className="block text-base font-medium text-gray-700 mb-1">
                        CVC <span className="text-red-500">*</span>
                    </label>
                    <div className="p-2 border rounded">
                    <CardCvcElement options={ELEMENT_OPTIONS} />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={!stripe || loading}
                className={`w-full text-white py-2 rounded ${loading ? 'bg-gray-400' : 'bg-blue-600'}`}
            >
                {loading ? 'Processing...' : 'Donate'}
            </button>

            {message && (
                <div
                    className={`mt-2 text-center ${
                    messageType === 'success' ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                    {message}
                </div>
            )}
            </form>
        </div>
    );
};

export default DonationForm;
