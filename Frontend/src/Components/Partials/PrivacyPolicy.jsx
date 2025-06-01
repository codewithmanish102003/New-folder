import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md border-l-4 border-purple-500">
        <h1 className="text-4xl font-bold text-purple-800 mb-6 text-center">Privacy Policy</h1>

        <p className="text-gray-700 mb-4">
          At <strong>Starway Collections</strong>, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website.
        </p>

        <h2 className="text-2xl font-semibold text-purple-700 mt-6 mb-2">1. Information We Collect</h2>
        <p className="text-gray-700 mb-4">
          We may collect personal information such as your name, email address, phone number, shipping address, and payment details when you place an order or sign up on our website.
        </p>

        <h2 className="text-2xl font-semibold text-purple-700 mt-6 mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
          <li>To process and ship your orders</li>
          <li>To provide customer support</li>
          <li>To send promotional offers or updates (if opted-in)</li>
          <li>To improve our services and website experience</li>
        </ul>

        <h2 className="text-2xl font-semibold text-purple-700 mt-6 mb-2">3. Information Sharing</h2>
        <p className="text-gray-700 mb-4">
          We do not sell, trade, or rent your personal information to third parties. We may share data with trusted partners for payment processing and shipping.
        </p>

        <h2 className="text-2xl font-semibold text-purple-700 mt-6 mb-2">4. Data Security</h2>
        <p className="text-gray-700 mb-4">
          We use industry-standard security measures to protect your information. However, no method of transmission over the internet is completely secure.
        </p>

        <h2 className="text-2xl font-semibold text-purple-700 mt-6 mb-2">5. Your Rights</h2>
        <p className="text-gray-700 mb-4">
          You can access, update, or delete your personal data by logging into your account or contacting our support team.
        </p>

        <h2 className="text-2xl font-semibold text-purple-700 mt-6 mb-2">6. Changes to This Policy</h2>
        <p className="text-gray-700 mb-4">
          We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
        </p>

        <p className="text-gray-600 mt-8 text-sm text-center">
          Effective Date: June 1, 2025
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
