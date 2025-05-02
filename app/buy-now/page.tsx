'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Package {
  id: string;
  name: string;
  price: number;
}

export default function BillingPage({ params }: { params: { packageId: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    sponsorId: '',
    sponsorName: '',
    name: '',
    dob: '',
    email: '',
    whatsappNumber: '',
    district: '',
    password: '',
    confirmPassword: '',
    agreed: false
  });

  const packages: Package[] = [
    { id: 'starter', name: 'Starter Package', price: 1999 },
    { id: 'creator', name: 'Creator Package', price: 2999 },
    { id: 'prime', name: 'Prime Package', price: 3999 },
    { id: 'master', name: 'Master Package', price: 4999 }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (!formData.agreed) {
      alert("You must agree to the Privacy Policy and Terms & Condition");
      return;
    }
    
    // Proceed to payment
    router.push(`/courses/${params.packageId}/buy-now/payment`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Billing Details</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Sponsor Id</label>
          <input
            type="text"
            name="sponsorId"
            value={formData.sponsorId}
            onChange={handleChange}
            placeholder="Enter Sponsor Id..."
            className="w-full p-2 border rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Sponsor Name</label>
          <input
            type="text"
            name="sponsorName"
            value={formData.sponsorName}
            onChange={handleChange}
            placeholder="Enter Sponsor Name..."
            className="w-full p-2 border rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Your Name..."
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">DOB *</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="xyz@gmail.com"
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Whatsapp Mobile Number</label>
          <div className="flex">
            <select className="p-2 border rounded-l-md bg-gray-100">
              <option>+977</option>
            </select>
            <input
              type="tel"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              placeholder="Enter Mobile Number"
              className="flex-1 p-2 border rounded-r-md"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">District</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select District</option>
            <option value="kathmandu">Kathmandu</option>
            <option value="pokhara">Pokhara</option>
            {/* Add more districts */}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Confirm Password *</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Choose Package</label>
          <select
            name="package"
            className="w-full p-2 border rounded-md"
            defaultValue={params.packageId}
          >
            {packages.map(pkg => (
              <option key={pkg.id} value={pkg.id}>{pkg.name} - Rs. {pkg.price}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            name="agreed"
            checked={formData.agreed || false}
            onChange={handleChange}
            className="mr-2"
            required
          />
          <span className="text-sm">
            I agree the Privacy Policy and Terms & Condition.
          </span>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}