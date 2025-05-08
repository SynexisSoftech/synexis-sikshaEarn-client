'use client'
import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Feature {
  name: string;
  included: boolean;
  info?: string;
}

interface PackageProps {
  name: string;
  price: string;
  description: string;
  features: Feature[];
  popular?: boolean;
  image: string;
  gradientClass: string;
  buttonClass: string;
}

interface PackageCardProps {
  pkg: PackageProps;
  index: number;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg, index }) => {
    const router = useRouter();
    const onGetStartedClick = () =>{
        router.push('/buy-now')
    }
  return (
    <div 
      className="animate-fadeIn transform hover:scale-105 transition-all duration-300" 
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="h-full rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
        <div className={`h-48 relative overflow-hidden bg-gradient-to-r ${pkg.gradientClass} group`}>
          <img 
            src={pkg.image} 
            alt={`${pkg.name} Package`} 
            className="w-full h-full object-cover mix-blend-overlay transition-transform duration-700 group-hover:scale-110"
          />
          {pkg.popular && (
            <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 text-xs font-semibold rounded-full animate-pulse">
              POPULAR
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-40">
            <h3 className="text-3xl font-bold text-white shadow-text transform transition-transform duration-300 group-hover:scale-110">{pkg.name}</h3>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-3xl font-bold text-gray-900">₹{pkg.price}</span>
                <p className="text-gray-500 text-sm">one-time payment</p>
              </div>
              <button  onClick={onGetStartedClick} className={`px-4 py-2 text-white font-medium rounded-full ${pkg.buttonClass} transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1`}>
                Get Started
              </button>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-6">{pkg.description}</p>

          <div className="border-t border-gray-100 pt-4">
            <h4 className="font-medium mb-3 text-gray-900">What's included:</h4>
            <ul className="space-y-3">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 transform hover:translate-x-2 transition-transform duration-300">
                  {feature.included ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  )}
                  <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;