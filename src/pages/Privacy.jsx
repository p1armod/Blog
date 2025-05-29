import React from 'react';

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <p className="text-gray-600 mb-8">Last updated: May 24, 2025</p>
      
      <div className="bg-white shadow rounded-lg p-6 space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
          <p className="text-gray-600">
            Welcome to our blog. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you about how we look after your personal data when you visit our 
            website and tell you about your privacy rights and how the law protects you.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
          <p className="text-gray-600 mb-4">
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
            <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li><strong>Usage Data</strong> includes information about how you use our website and services.</li>
            <li><strong>Marketing and Communications Data</strong> includes your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">3. How We Use Your Data</h2>
          <p className="text-gray-600 mb-4">
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>To register you as a new user</li>
            <li>To manage our relationship with you</li>
            <li>To enable you to participate in our blog features</li>
            <li>To administer and protect our business and this website</li>
            <li>To deliver relevant website content and advertisements to you</li>
            <li>To use data analytics to improve our website, products/services, marketing, customer relationships and experiences</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Data Security</h2>
          <p className="text-gray-600">
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Your Legal Rights</h2>
          <p className="text-gray-600 mb-4">
            Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Request access to your personal data</li>
            <li>Request correction of your personal data</li>
            <li>Request erasure of your personal data</li>
            <li>Object to processing of your personal data</li>
            <li>Request restriction of processing your personal data</li>
            <li>Request transfer of your personal data</li>
            <li>Right to withdraw consent</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
          </p>
          <p className="mt-2 text-gray-600">
            Email: privacy@example.com<br />
            Address: 123 Blog Street, San Francisco, CA 94107
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
