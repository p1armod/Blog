import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About Us</h1>
      
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
        <p className="text-gray-600 mb-4">
          Welcome to our blog! We're passionate about sharing knowledge, insights, and stories that matter. 
          Our platform was born out of a desire to create a space where ideas can be freely exchanged and 
          meaningful conversations can take place.
        </p>
        <p className="text-gray-600 mb-4">
          Since our founding, we've been committed to providing high-quality content that informs, inspires, 
          and engages our readers. Our team of dedicated writers and editors work tirelessly to bring you 
          fresh perspectives on a wide range of topics.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-600 mb-4">
          Our mission is to create a community where people can learn, share, and grow together. We believe 
          in the power of information and the importance of diverse voices in shaping our understanding of 
          the world around us.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Integrity</h3>
            <p className="text-gray-600">
              We are committed to honesty, accuracy, and transparency in everything we do.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Quality</h3>
            <p className="text-gray-600">
              We strive for excellence in our content and user experience.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Community</h3>
            <p className="text-gray-600">
              We value our readers and contributors, fostering a welcoming and inclusive environment.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Innovation</h3>
            <p className="text-gray-600">
              We embrace new ideas and technologies to better serve our audience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
