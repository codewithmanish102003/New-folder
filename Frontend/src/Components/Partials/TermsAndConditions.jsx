import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md border-l-4 border-purple-500">
        <h1 className="text-4xl font-bold text-purple-800 mb-6 text-center">Terms & Conditions</h1>

        <p className="text-gray-700 mb-6">
          Welcome to <strong>Starway Collections</strong>. By using our website and services, you agree to comply with and be bound by the following terms and conditions. Please review them carefully before using our platform.
        </p>

        <h2 className="text-2xl font-semibold text-purple-700 mt-6 mb-2">1. Use of Website</h2>
        <p className="text-gray-700 mb-4">
          You agree to use this website for lawful purposes only and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use.
        </p>

        <h2 className="text-2xl font-semibold text-purple-700 mt-6 mb-2">2. Product Information</h2>
        <p className="text-gray-700 mb-4">
          We strive to provide accurate descriptions and pricing for all products. However, errors may occur, and we reserve the right to correct them at any time.
        </p>

        <h2 className="text-2xl font-semibold text-purple-700 mt-6 mb-2">3. Orders & Payments</h2>
        <p className="text-gray-700 mb-4">
          All orders are subject to acceptance and availability. We reserve the right to cancel any order. Payments must be completed before shipment.
        </p>

        <h2 className="text-2xl font-semibold text-purple-700 mt-6 mb-2">4. Shipping & Delivery</h2>
        <p className="text-gray-700 mb-4">
          Delivery times are estimates only. We are not liable for any delays beyond our control.
        </p>

        <h2 className="text-2xl font-semibold text-purple-700 mt-6 mb-2">5. Returns & Refunds</h2>
        <p className="text-gray-700 mb-4">
          Returns are accepted within 7 days of delivery. Items must be unused and in original packaging. Refunds will be processed within 5–7 business days.
        </p>

        <h2 className="text-2xl font-semibold text-purple-700 mt-6 mb-2">6. Intellectual Property</h2>
        <p className="text-gray-700 mb-4">
          All content on this site, including logos, text, and graphics, is the property of Starway Collections and protected under applicable laws.
        </p>

        <h2 className="text-2xl font-semibold text-purple-700 mt-6 mb-2">7. Changes to Terms</h2>
        <p className="text-gray-700 mb-4">
          We may modify these terms at any time without prior notice. Updated terms will be posted on this page.
        </p>

        <p className="text-gray-600 mt-8 text-sm text-center">
          Last Updated: June 1, 2025
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
