import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md border-l-4 border-purple-500">
        <h1 className="text-4xl font-bold text-purple-800 mb-6 text-center">About Us</h1>

        <p className="text-gray-700 mb-6 text-lg">
          <strong>Starway Collections</strong> is your gateway to luxury fashion and curated elegance. Founded with a vision to bring premium quality accessories and timeless styles to your doorstep, we specialize in <span className="text-purple-700 font-medium">premium bags, designer glasses</span>, and unique seasonal collections.
        </p>

        <h2 className="text-2xl font-semibold text-purple-700 mb-2">🌟 Our Mission</h2>
        <p className="text-gray-700 mb-4">
          To redefine everyday style by offering carefully selected, fashion-forward products that express individuality, elegance, and confidence.
        </p>

        <h2 className="text-2xl font-semibold text-purple-700 mb-2">👜 What We Offer</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
          <li>Premium handcrafted bags for all occasions</li>
          <li>Designer glasses that blend style with comfort</li>
          <li>Seasonal collections curated with the latest trends</li>
        </ul>

        <h2 className="text-2xl font-semibold text-purple-700 mb-2">💜 Why Choose Us?</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
          <li>High-quality and stylish products</li>
          <li>Reliable customer service</li>
          <li>Fast and secure delivery</li>
          <li>Regular updates and seasonal offers</li>
        </ul>

        <p className="text-gray-700 mt-6">
          Whether you're elevating your wardrobe or gifting someone special, Starway Collections is here to make every moment stylish. Thank you for choosing us to be part of your fashion journey!
        </p>

        <p className="text-center mt-10 text-sm text-gray-500">— The Starway Collections Team</p>
      </div>
    </div>
  );
};

export default AboutUs;
