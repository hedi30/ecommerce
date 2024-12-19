import React from "react";
import Banner from "./Banner";
import Footer from "./Footer";
import Header from "./Header";

const About = () => {
  return (
    <div>
      <Header></Header>
      <Banner></Banner>
      <div className="bg-gray-900 py-16">
        <div className="w-[85%] mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              About Our Gun Shop
            </h1>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-white">
                Premium Firearms & Expert Service
              </h2>
              <p className="text-gray-300 leading-relaxed">
                With over two decades of experience in the firearms industry, we
                pride ourselves on offering the finest selection of guns,
                ammunition, and accessories. Our commitment to quality and
                customer satisfaction sets us apart in the industry.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Expert Staff
                  </h3>
                  <p className="text-gray-400">
                    Highly trained professionals ready to assist
                  </p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Quality Products
                  </h3>
                  <p className="text-gray-400">
                    Premium selection of firearms and accessories
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1595590424283-b8f17842773f"
                alt="Gun Shop Interior"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-red-600 text-white p-8 rounded-lg">
                <p className="text-3xl font-bold">20+</p>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </div>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-400">
                To provide top-quality firearms and exceptional service while
                promoting responsible gun ownership.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Our Values
              </h3>
              <p className="text-gray-400">
                Safety, integrity, and customer satisfaction are at the core of
                everything we do.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Our Promise
              </h3>
              <p className="text-gray-400">
                We guarantee authentic products, competitive prices, and
                unmatched customer service.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default About;
