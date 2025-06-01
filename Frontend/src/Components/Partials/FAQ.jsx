import React from 'react';

const FAQs = () => {
  const questions = [
    {
      q: 'What products does Starway Collections offer?',
      a: 'We offer a curated range of premium bags, designer glasses, and seasonal fashion items crafted for modern tastes.',
    },
    {
      q: 'Do you ship internationally?',
      a: 'Currently, we only ship within India. We’re working on expanding our services globally soon!',
    },
    {
      q: 'How can I track my order?',
      a: 'Once your order is shipped, you will receive a tracking ID via email or SMS. You can use it to track your shipment on our website.',
    },
    {
      q: 'What is your return policy?',
      a: 'We accept returns within 7 days of delivery. Products must be unused and in original packaging to qualify.',
    },
    {
      q: 'How do I contact customer support?',
      a: 'You can reach out to us via our Contact Us page or email us directly at support@starwaycollections.com.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center text-purple-800">Frequently Asked Questions</h1>
        <div className="space-y-6">
          {questions.map((faq, index) => (
            <div
              key={index}
              className="bg-white border-l-4 border-purple-500 shadow-md p-6 rounded-xl transition hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold text-purple-800">{faq.q}</h3>
              <p className="text-gray-700 mt-2">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
