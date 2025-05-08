"use client";

import { useState } from 'react';
import { ArrowLeft, Upload, CreditCard } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function PaymentPage({ params }: { params: { packageId: string } }) {
  const [paymentMethod, setPaymentMethod] = useState('qr');
  const [transactionId, setTransactionId] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const packagePrice = 1999;

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Payment submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
            <div className="flex items-center gap-4 mb-4">
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Link href="/buy-now">

                <ArrowLeft className="h-6 w-6" />


                  </Link>
              </button>
              <h1 className="text-2xl font-bold">Complete Payment</h1>
            </div>
            <p className="text-green-100">Amount to pay: Rs. {packagePrice}/-</p>
          </div>

          <div className="p-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg">
              <p className="font-medium text-yellow-800">Important Notice:</p>
              <p className="text-sm text-yellow-700 mt-1">
                Please pay the exact package amount. Payments that are lower or higher than the package price will not be accepted, and refunds will not be processed.
              </p>
              <p className="text-sm text-yellow-700 mt-2">
                नोटः कृपया सही रकम तिर्नुहोस्। प्याकेज मूल्य भन्दा कम वा बढी रकम स्वीकार गरिने छैन र रिफन्ड गरिने छैन।
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h2 className="text-lg font-semibold mb-4">Scan QR Code to Pay</h2>
                  <div className="bg-white p-4 rounded-lg shadow-inner">
                    <div className="w-full max-w-xs mx-auto aspect-square bg-gray-100 rounded-lg">
                      <Image
                        src="/qr.jpg"
                        alt="QR Code"
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                      
                      
                      
                                          </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('qr')}
                    className={`flex-1 p-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
                      paymentMethod === 'qr'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <CreditCard className="h-5 w-5" />
                    QR Payment
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Payment Screenshot
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-500 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleScreenshotChange}
                        className="hidden"
                        id="screenshot"
                      />
                      <label
                        htmlFor="screenshot"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        <Upload className="h-8 w-8 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          Click to upload or drag and drop
                        </span>
                        <span className="text-xs text-gray-500">
                          PNG, JPG up to 10MB
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transaction ID
                    </label>
                    <input
                      type="text"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="Enter your transaction ID"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transform hover:-translate-y-1 transition-all duration-200"
                  >
                    Confirm Payment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}