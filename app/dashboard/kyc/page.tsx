'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function KycForm() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session) {
      setMessage('Please log in to submit your KYC.');
      return;
    }

    setLoading(true);
    setMessage('');

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('/api/kyc', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('KYC submitted successfully!');
      } else {
        setMessage(data.error || 'Submission failed');
      }
    } catch (err) {
      setMessage('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-2xl bg-white shadow-md rounded-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">KYC Verification Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="fullName" type="text" required placeholder="Full Name" className="input" />
          <input name="dateOfBirth" type="date" required className="input" />
          <input name="nationality" type="text" required placeholder="Nationality" className="input" />
          <select name="gender" required className="input">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input name="fullAddress" type="text" required placeholder="Full Address" className="input" />
          <input name="idType" type="text" required placeholder="ID Type (e.g. Passport)" className="input" />
          <input name="idNumber" type="text" required placeholder="ID Number" className="input" />
        </div>

        <div className="space-y-2">
          <label>Upload ID Front</label>
          <input name="idFront" type="file" accept="image/*" required className="block" />
          <label>Upload ID Back</label>
          <input name="idBack" type="file" accept="image/*" required className="block" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Submitting...' : 'Submit KYC'}
        </button>

        {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
      </form>
    </div>
  );
}
