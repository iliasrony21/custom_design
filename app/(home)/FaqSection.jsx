"use client";

import Link from "next/link";
import { useState } from "react";

export default function FaqSection() {
  const [openItem, setOpenItem] = useState(1); // Only one item can be open at a time

  const faqData = [
    {
      id: 1,
      question: "How do I create an account?",
      answer:
        "You can create an account by clicking the 'Sign Up' button in the top right corner. You'll need to provide your email address and create a password.",
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for certain subscription plans.",
    },
    {
      id: 3,
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period.",
    },
    {
      id: 4,
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a 14-day free trial for all new users. No credit card is required to start your trial.",
    },
    {
      id: 5,
      question: "How do I contact customer support?",
      answer:
        "You can reach our customer support team through the contact form on our website, or email us directly at support@example.com. We typically respond within 24 hours.",
    },
    {
      id: 6,
      question: "Do you offer discounts for students?",
      answer:
        "Yes, we offer a 50% discount for students with a valid .edu email address. Contact our support team to verify your student status and get the discount applied.",
    },
  ];

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id); // Toggle: if same item clicked, close it
  };

  return (
    <div className="container mx-auto p-4 md:p-20 ">
      <div className="px-6 sm:px-6 md:px-28 bg-white py-12  shadow-2xl rounded-2xl">
        {/* Header */}

        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-block my-5 text-center bg-pink-50 text-pink-700 text-lg font-medium rounded-full px-5 py-2   hover:scale-105 transition duration-300 shadow-sm"
          >
            Support FAQs
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Find answers to common questions about our service
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 ">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className={`flex justify-between items-center w-full p-6 text-left transition-colors duration-200 ${
                  openItem === item.id
                    ? "bg-red-600 text-white" // Active state
                    : "bg-white text-gray-900 hover:bg-gray-50" // Inactive state
                }`}
              >
                <span className="text-lg font-medium pr-4">
                  {item.question}
                </span>
                <svg
                  className={`w-5 h-5 transform transition-transform duration-200 ${
                    openItem === item.id
                      ? "rotate-180 text-white" // Active state
                      : "text-gray-500" // Inactive state
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openItem === item.id && (
                <div className="p-6 bg-white">
                  <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
