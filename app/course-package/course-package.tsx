import React from 'react';
import PackageCard from './packageCard';
import { CheckCircle2, HelpCircle } from 'lucide-react';

const CoursePackages = () => {
  const packages = [
    {
      name: "Silver",
      price: "499",
      description: "Perfect for beginners looking to start their digital marketing journey.",
      features: [
        { name: "Digital Marketing Introduction", included: true },
        { name: "SEO", included: true },
        { name: "Email Marketing", included: true },
        { name: "Copywriting and content writing", included: true },
        { name: "Social Media Marketing", included: true },
        { name: "WordPress Website Development", included: true },
      ],
      image: "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&fit=crop",
      gradientClass: "from-slate-200 to-slate-400",
      buttonClass: "bg-slate-600 hover:bg-slate-700",
    },
    {
      name: "Gold",
      price: "1499",
      description: "Ideal for those seeking to expand their digital marketing skills.",
      features: [
        { name: "Communication Skills", included: true },
        { name: "Affiliate Marketing Master", included: true },
        { name: "Introduction to Affiliate Marketing", included: true },
        { name: "Digital Marketing Introduction", included: true },
        { name: "SEO", included: true },
        { name: "Email Marketing", included: true },
      ],
      popular: true,
      image: "https://images.pexels.com/photos/4021256/pexels-photo-4021256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&fit=crop",
      gradientClass: "from-amber-200 to-amber-400",
      buttonClass: "bg-amber-600 hover:bg-amber-700",
    },
    {
      name: "Diamond",
      price: "2499",
      description: "Comprehensive package for serious digital marketing professionals.",
      features: [
        { name: "Canva Master", included: true },
        { name: "YouTube Master", included: true },
        { name: "Facebook Ads", included: true },
        { name: "Meta Ads", included: true },
        { name: "Video Editing", included: true },
        { name: "All Gold Package Features", included: true },
      ],
      image: "https://images.pexels.com/photos/2847648/pexels-photo-2847648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&fit=crop",
      gradientClass: "from-sky-200 to-sky-400",
      buttonClass: "bg-sky-600 hover:bg-sky-700",
    },
    {
      name: "Heroic",
      price: "4999",
      description: "Ultimate package for those aiming to master digital marketing.",
      features: [
        { name: "Digital Marketing Introduction", included: true },
        { name: "Google Search Console", included: true },
        { name: "Web Master Tools", included: true },
        { name: "WordPress Website Development", included: true },
        { name: "SEO Search Engine Optimization", included: true },
        { name: "Affiliate Marketing Master", included: true },
        { name: "Graphic Design", included: true },
        { name: "All Diamond Package Features", included: true },
      ],
      image: "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&fit=crop",
      gradientClass: "from-purple-200 to-purple-400",
      buttonClass: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  return (
    <>
      <header className="pt-12 pb-10 bg-gradient-to-r from-slate-100 to-slate-200">
        <div className="container mx-auto px-4 m-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="animate-fadeIn">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
                Course Packages
              </span>
              <h1 className="text-4xl font-bold mb-6 text-gray-900">Choose Your Learning Path</h1>
              <p className="text-gray-600 mb-8">
                Select from our range of carefully designed packages to accelerate your learning journey and achieve your career goals in digital marketing.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg, index) => (
              <PackageCard key={index} pkg={pkg} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="animate-slideUp bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Our team is ready to help you choose the right package for your learning goals. Contact us for
              personalized assistance.
            </p>
            <button className="px-6 py-3 bg-white text-blue-700 font-medium rounded-full hover:bg-gray-100 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Choose Our Courses?</h2>
            <p className="text-gray-600 mb-12">
              Our digital marketing courses are designed by industry experts to provide practical skills and knowledge that can be applied immediately.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-gray-50 animate-fadeIn">
                <div className="mb-4 flex justify-center">
                  <span className="p-3 bg-blue-100 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
                <p className="text-gray-600">Learn from professionals with years of industry experience</p>
              </div>
              
              <div className="p-6 rounded-xl bg-gray-50 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                <div className="mb-4 flex justify-center">
                  <span className="p-3 bg-blue-100 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Practical Knowledge</h3>
                <p className="text-gray-600">Hands-on projects and real-world applications</p>
              </div>
              
              <div className="p-6 rounded-xl bg-gray-50 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                <div className="mb-4 flex justify-center">
                  <span className="p-3 bg-blue-100 rounded-full">
                    <HelpCircle className="h-6 w-6 text-blue-600" />
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Ongoing Support</h3>
                <p className="text-gray-600">Access to community and instructor support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CoursePackages;