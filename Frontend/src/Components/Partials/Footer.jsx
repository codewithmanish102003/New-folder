import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm text-gray-400">
            Your trusted e-commerce platform for the best products and deals. We
            aim to provide a seamless shopping experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/about"
                className="text-sm text-gray-400 hover:text-white"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="text-sm  text-gray-400 hover:text-white">
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/faqs"
                className="text-sm text-gray-400 hover:text-white"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="/terms-and-conditions"
                className="text-sm text-gray-400 hover:underline"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="text-sm text-gray-400 hover:text-white"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe to our newsletter to get the latest updates and offers.
          </p>
          <form className="flex">
            <input
              type="tel"
              name="whatsapp"
              placeholder="Enter your Whatsapp number"
              className="w-full p-2 border-1 border-purple-400 rounded-l-md focus:outline-none"
            />
            <button className="bg-purple-500 border-1 border-purple-400 text-white px-4 rounded-r-md hover:bg-purple-600">
              Subscribe
            </button>
          </form>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <i className="fab fa-x"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/107627477/admin/dashboard/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        <p>© 2025 starwayCollections. All rights reserved.</p>
        <h4>Developed By : Naveen Kumawat & Manish Prajapati</h4>

      </div>
    </footer>
  );
};

export default Footer;
