const TestCardInfo = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">How to use test cards</h1>
      <p className="mb-4 text-gray-700">
        You can use the following test card when making donations during development or testing. No real money is involved.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">💳 Most Common Test Card</h2>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <p><strong>Card Number:</strong> 4242 4242 4242 4242</p>
        <p><strong>Expiration:</strong> Any future date (e.g. 12/34)</p>
        <p><strong>CVC:</strong> Any 3 digits (e.g. 123)</p>
        <p><strong>ZIP:</strong> Any 5 digits (e.g. 12345)</p>
      </div>

      <p className="mt-6 text-gray-600 text-sm">
        These cards work only in test mode.
      </p>
    </div>
  );
};

export default TestCardInfo;
