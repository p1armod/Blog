import React, { useState } from 'react';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'To create an account, click on the "Sign Up" button in the top right corner of the page. You\'ll need to provide your name, email address, and create a password. Once submitted, you\'ll receive a confirmation email to verify your account.'
    },
    {
      question: 'How do I write a blog post?',
      answer: 'After logging in, click on "Add Post" in the navigation menu. You\'ll be taken to the post editor where you can add a title, content, and any images. Once you\'re done, click "Publish" to make your post live.'
    },
    {
      question: 'Can I edit or delete my posts?',
      answer: 'Yes, you can edit or delete your posts at any time. Go to "My Posts" to view all your published articles. Click on the three dots menu next to the post you want to modify and select "Edit" or "Delete".'
    },
    {
      question: 'How do I reset my password?',
      answer: 'If you\'ve forgotten your password, click on "Forgot Password" on the login page. Enter your email address and we\'ll send you a link to reset your password.'
    },
    {
      question: 'How can I contact support?',
      answer: 'You can reach our support team by visiting the "Contact Us" page and filling out the contact form. We typically respond to all inquiries within 24-48 hours.'
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Currently, we don\'t have a dedicated mobile app, but our website is fully responsive and works well on mobile devices through any modern web browser.'
    },
    {
      question: 'How do I report inappropriate content?',
      answer: 'If you come across any content that violates our community guidelines, please click the "Report" button on the post or contact our support team with details about the content in question.'
    },
    {
      question: 'Can I customize my profile?',
      answer: 'Yes, you can customize your profile by clicking on your profile picture in the top right corner and selecting "Edit Profile". Here you can update your profile picture, bio, and other personal information.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600">Find answers to common questions about our platform</p>
      </div>
      
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
            <button
              className={`w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none ${openIndex === index ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}
              onClick={() => toggleAccordion(index)}
            >
              <span className="text-lg font-medium text-gray-900">{faq.question}</span>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div 
              className={`px-6 overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 py-4' : 'max-h-0'}`}
            >
              <div className="pb-4 text-gray-600">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Still have questions?</h2>
        <p className="text-gray-600 mb-6">
          Can't find the answer you're looking for? Our support team is here to help.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default Faq;
