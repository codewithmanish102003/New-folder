import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-600">About Starway Collections</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">🌟 Who We Are</h2>
          <p className="text-lg leading-relaxed">
            Starway Collections was founded with a simple vision:
            <br />
            <em>"To redefine online shopping by combining style, quality, and simplicity."</em>
            <br />
            We are a vibrant community of trend-lovers who believe in the power of choice and quality.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">🧾 What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>Wide range of handpicked, high-quality products.</li>
            <li>Seamless and secure shopping experience.</li>
            <li>Reliable and responsive customer service.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">🚀 Our Mission</h2>
          <p className="text-lg leading-relaxed">
            To provide our customers with affordable luxury, trendy selections, and a user-friendly shopping journey—so every purchase feels just right.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">🔒 Our Promise</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li><strong>Authenticity</strong> – Only genuine and high-quality products.</li>
            <li><strong>Trust</strong> – Transparent pricing, policies, and practices.</li>
            <li><strong>Innovation</strong> – Constantly evolving to serve you better.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">🤝 Let’s Connect</h2>
          <p className="text-lg leading-relaxed">
            We’d love to hear from you. Whether it's feedback, collaboration, or just a hello — we’re always listening.
          </p>
        </section>

        <section className="bg-white rounded-xl shadow-md p-6 mt-12">
          <h3 className="text-xl font-semibold mb-4">📫 Contact Information</h3>
          <p className="text-lg"><strong>Email:</strong> support@starwaycollections.com</p>
          <p className="text-lg"><strong>Location:</strong> Jaipur, Rajasthan, India</p>
          <p className="text-lg"><strong>Phone:</strong> +91-XXXXXXXXXX</p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
