import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-12">
      {/* Navigation Buttons */}
      <div className="w-full flex justify-between items-center mb-10">
        {/* <Link to="/main" className="text-blue-600 font-medium hover:underline">All Main</Link> */}
        <Link to="/functions" className="text-blue-600 font-medium hover:underline">Function List</Link>
      </div>

      {/* Hero Section */}
      <section className="text-center max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Platform</h1>
        <p className="text-gray-600 text-lg mb-6">
          Explore modern solutions, powerful tools, and intuitive features built to help you grow faster and smarter.
        </p>
        <Link
          to="/main"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Explore Now
        </Link>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16 w-full max-w-6xl">
        {[
          {
            title: "Seamless Integration",
            desc: "Easily connect with your tools and streamline your workflows without hassle.",
            icon: "🔗"
          },
          {
            title: "Responsive Design",
            desc: "Access your content anywhere, anytime on any device with pixel-perfect responsiveness.",
            icon: "📱"
          },
          {
            title: "User-Friendly Interface",
            desc: "Navigate, interact, and perform tasks effortlessly.",
            icon: "👌"
          }
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home;
