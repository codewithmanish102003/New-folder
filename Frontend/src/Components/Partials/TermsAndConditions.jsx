import React from "react";

const TermsAndConditions = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 md:p-12">
        <h1 className="text-4xl font-extrabold text-purple-800 mb-6 text-center">
          Terms & Conditions
        </h1>

        <p className="text-gray-700 mb-4 text-lg">
          Welcome to <strong>Starway Collections</strong>. Please read the following terms and conditions carefully before using our website.
        </p>

        <div className="space-y-6 text-gray-800 text-base">
          <div>
            <h2 className="font-semibold text-lg text-purple-700 mb-1">1. Acceptance</h2>
            <p>
              By using this website, you agree to be bound by these terms and conditions.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-purple-700 mb-1">2. Products</h2>
            <p>
              All products are subject to availability and may be withdrawn at any time.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-purple-700 mb-1">3. Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account and password.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-purple-700 mb-1">4. Intellectual Property</h2>
            <p>
              All content on this site is owned by Starway Collections and may not be reused without permission.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-purple-700 mb-1">5. Payment & Refunds</h2>
            <p>
              Payments are processed securely. Please refer to our return policy for refunds.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-purple-700 mb-1">6. Changes</h2>
            <p>
              We may revise these terms at any time without prior notice. Changes will be effective once posted.
            </p>
          </div>

          <p className="text-sm italic text-purple-500 pt-6">
            Last updated: May 31, 2025
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
