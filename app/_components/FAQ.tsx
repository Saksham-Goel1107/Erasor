import React, { useState } from 'react';

function FAQ() {
  const faqs = [
    {
      question: "How does real-time collaboration work in Erasor?",
      answer: "Erasor uses WebSockets to ensure all changes are instantly synchronized across all users currently viewing the document or diagram. You can see who's actively editing, track changes in real-time, and work together without conflicts."
    },
    {
      question: "Can I use Erasor for both technical and non-technical documentation?",
      answer: "Absolutely! While Erasor is designed with engineering teams in mind, it's versatile enough for any type of documentation. The markdown editor is perfect for text-based documentation, while the canvas is great for visual communication."
    },
    {
      question: "How does the AI diagram generator work?",
      answer: "Simply describe what you want to diagram using natural language, and our AI will generate a professional diagram based on your description. You can then edit and refine the diagram using our editor."
    },
    {
      question: "Is my data secure with Erasor?",
      answer: "Security is our top priority. All data is encrypted both in transit and at rest, and we use industry-leading security practices to protect your information. We also provide role-based access controls so you can decide who has access to your documents."
    },
    {
      question: "Can I export my documents and diagrams?",
      answer: "Yes, you can export documents in various formats including PDF, Markdown, and HTML. Diagrams can be exported as PNG, SVG, or included directly in your documents."
    },
    {
      question: "Does Erasor work offline?",
      answer: "Erasor has offline capabilities that allow you to continue working when your internet connection is unstable. Changes will automatically sync once you're back online."
    }
  ];

  const [openIndex, setOpenIndex] = useState(-1);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="bg-gray-900 py-24">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-sky-400 tracking-wide uppercase">FAQ</h2>
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Frequently asked questions
          </p>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-300">
            Everything you need to know about using Erasor for your team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-gray-700">
          {faqs.map((faq, index) => (
            <div key={index} className="py-6">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left focus:outline-none"
              >
                <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                <span className="ml-6 flex-shrink-0">
                  <svg
                    className={`h-6 w-6 transition-transform duration-300 ${
                      openIndex === index ? 'transform rotate-180 text-sky-400' : 'text-gray-400'
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {openIndex === index && (
                <div className="mt-4 prose prose-dark max-w-none">
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
