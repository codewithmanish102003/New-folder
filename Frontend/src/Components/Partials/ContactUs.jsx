import React from 'react';
// Contact us page
const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md border-l-4 border-purple-500">
        <h1 className="text-4xl font-bold text-purple-800 mb-6 text-center">Contact Us</h1>
        
        <p className="text-gray-700 mb-8 text-center">
          Have questions or need help? We'd love to hear from you. Fill out the form and our team will get back to you shortly.
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-purple-700">Name</label>
            <input
              type="text"
              placeholder="Your full name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-700">Subject</label>
            <input
              type="text"
              placeholder="What's this about?"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-700">Message</label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-purple-500 focus:border-purple-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-200 w-full"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
