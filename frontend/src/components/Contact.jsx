import React from "react";
import Banner from "./Banner";
import Header from "./Header";
import Footer from "../components/Footer";
const Contact = () => {
  return (
    <div>
      <Header />
      <Banner />
      <div className="w-full bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Contact Us
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Get in touch with our team for any inquiries or support
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-4">
                Send us a message
              </h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-white">Location</h4>
                  <p className="mt-2 text-gray-300">
                    123 Gun Street, Armory District, GN 12345
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Email</h4>
                  <p className="mt-2 text-gray-300">info@gunshop.com</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Phone</h4>
                  <p className="mt-2 text-gray-300">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">Hours</h4>
                  <p className="mt-2 text-gray-300">
                    Monday - Friday: 9am - 6pm
                  </p>
                  <p className="text-gray-300">Saturday: 10am - 4pm</p>
                  <p className="text-gray-300">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Contact;
