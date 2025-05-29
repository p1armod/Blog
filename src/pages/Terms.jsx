import React from 'react';

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
      <p className="text-gray-600 mb-8">Last updated: May 24, 2025</p>
      
      <div className="bg-white shadow rounded-lg p-6 space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
          <p className="text-gray-600">
            Welcome to our blog. These terms and conditions outline the rules and regulations for the use of our website.
            By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use 
            our website if you do not accept all of the terms and conditions stated on this page.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Intellectual Property Rights</h2>
          <p className="text-gray-600 mb-4">
            Unless otherwise stated, we or our licensors own the intellectual property rights for all material on this website. 
            All intellectual property rights are reserved. You may view and/or print pages from this website for your own 
            personal use subject to restrictions set in these terms and conditions.
          </p>
          <p className="text-gray-600">
            You must not:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-600">
            <li>Republish material from this website</li>
            <li>Sell, rent, or sub-license material from the website</li>
            <li>Reproduce, duplicate, or copy material from this website</li>
            <li>Redistribute content from this website (unless content is specifically made for redistribution)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">3. User Content</h2>
          <p className="text-gray-600 mb-4">
            In these terms and conditions, "Your Content" shall mean any audio, video, text, images, or other material 
            you choose to display on this website. By displaying Your Content, you grant us a non-exclusive, worldwide, 
            irrevocable, royalty-free, sublicensable license to use, reproduce, adapt, publish, translate, and distribute 
            it in any and all media.
          </p>
          <p className="text-gray-600">
            Your Content must be your own and must not be invading any third-party's rights. We reserve the right to 
            remove any of Your Content from this website at any time, and for any reason, without notice.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">4. User Responsibilities</h2>
          <p className="text-gray-600 mb-4">
            As a user of our website, you agree to the following:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>You will not use this website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website</li>
            <li>You will not use this website in any way which is unlawful, illegal, fraudulent, or harmful</li>
            <li>You will not conduct any systematic or automated data collection activities on or in relation to this website without our express written consent</li>
            <li>You will not use this website to copy, store, host, transmit, send, use, publish, or distribute any material which consists of (or is linked to) any spyware, computer virus, or other malicious computer software</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Limitations of Liability</h2>
          <p className="text-gray-600">
            In no event shall we be liable for any indirect, consequential, special, incidental, or punitive damages, 
            including but not limited to loss of data or profits, arising out of the use or the inability to use the 
            materials on this website, even if we have been notified of the possibility of such damage.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Changes to Terms</h2>
          <p className="text-gray-600">
            We reserve the right to revise these terms and conditions at any time as we see fit, and by using this 
            website you are expected to review these terms on a regular basis. The revised terms will apply to the use of 
            this website from the date of publication of the revised terms on this website.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Governing Law</h2>
          <p className="text-gray-600">
            These terms and conditions will be governed by and construed in accordance with the laws of the State of 
            California, and you submit to the non-exclusive jurisdiction of the state and federal courts located in 
            California for the resolution of any disputes.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Contact Information</h2>
          <p className="text-gray-600">
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <p className="mt-2 text-gray-600">
            Email: legal@example.com<br />
            Address: 123 Blog Street, San Francisco, CA 94107
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
