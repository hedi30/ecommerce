import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-400">
              Your trusted source for quality firearms and accessories. We pride
              ourselves on safety, reliability, and customer satisfaction.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-white">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <FaPhone className="mr-2" /> +1 (555) 123-4567
              </li>
              <li className="flex items-center text-gray-400">
                <FaEnvelope className="mr-2" /> info@gunshop.com
              </li>
              <li className="flex items-center text-gray-400">
                <FaMapMarkerAlt className="mr-2" /> 123 Gun Street, Armory City,
                ST 12345
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="facebook.com"
                className="text-gray-400 hover:text-white text-2xl"
              >
                <FaFacebook />
              </a>
              <a
                href="x.com"
                className="text-gray-400 hover:text-white text-2xl"
              >
                <FaTwitter />
              </a>
              <a
                href="x.com"
                className="text-gray-400 hover:text-white text-2xl"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Gun Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
