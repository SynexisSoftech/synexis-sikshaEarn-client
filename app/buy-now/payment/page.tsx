'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PaymentPage({ params }: { params: { packageId: string } }) {
  const [paymentMethod, setPaymentMethod] = useState('qr');
  const [transactionId, setTransactionId] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  
  // In a real app, you'd fetch package details based on packageId
  const packagePrice = 1999; // Example price

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment submission
    alert('Payment submitted!');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Payment</h1>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="font-medium">Note:</p>
        <p className="text-sm">
          Don't pay amount which is lower or higher then package price. please pay exact amount otherwise your id will not active and we will not accept any refund.
        </p>
        <p className="text-sm mt-2">
          नोटः प्याकेज मूल्य भन्दा कम वा बढी रकम नतिर्नुहोस्। कृपया सही रकम तिर्नुहोस् अन्यथा तपाईंको आईडी सक्रिय हुनेछैन र हामी कुनै पनि फिर्ती स्वीकार गर्दैनौं।
        </p>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Please Pay Rs. {packagePrice} /- On below given QR</h2>
        <div className="border p-4 max-w-xs mx-auto">
          <Image
            src="/qr-code-placeholder.png" // Replace with your actual QR code
            alt="Payment QR Code"
            width={300}
            height={300}
            className="w-full"
          />
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Payment Screenshot</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleScreenshotChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Transaction Id</label>
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="Enter Transaction Id"
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors"
        >
          Submit Payment
        </button>
      </form>
      
      <div className="mt-6 pt-6 border-t">
        <h3 className="font-medium mb-2">Payment Methods:</h3>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setPaymentMethod('qr')}
            className={`px-4 py-2 rounded-md ${paymentMethod === 'qr' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
          >
            QR Payment
          </button>
        
        </div>
      </div>
    </div>
  );
}