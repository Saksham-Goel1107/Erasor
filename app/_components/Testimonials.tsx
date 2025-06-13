import React from 'react';
import Image from 'next/image';

function Testimonials() {
  const testimonials = [
    {
      content: "Erasor has revolutionized how our engineering team documents and diagrams our systems. The real-time collaboration has cut our documentation time in half.",
      author: "Sarah Johnson",
      position: "CTO, TechNova",
      avatar: "/avatar1.png"
    },
    {
      content: "The AI-powered diagram generation has been a game-changer for us. What used to take hours now takes minutes, and the results are consistently professional.",
      author: "Michael Chen",
      position: "Lead Developer, CodeStack",
      avatar: "/avatar2.png"
    },
    {
      content: "We've tried many documentation tools, but Erasor is the first one that truly understands the needs of engineering teams. It's become an essential part of our workflow.",
      author: "Emily Rodriguez",
      position: "Engineering Manager, DataFlow",
      avatar: "/avatar3.png"
    }
  ];

  return (
    <section id="testimonials" className="bg-gradient-to-b from-black to-gray-900 py-24">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-sky-400 tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Trusted by engineering teams everywhere
          </p>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-300">
            Don't just take our word for it — hear what our users have to say about Erasor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="relative bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-xl"
            >
              {/* Quotation mark decoration */}
              <div className="absolute top-4 left-4 text-sky-400/20 text-6xl font-serif">"</div>
              
              {/* Content */}
              <div className="relative z-10">
                <p className="text-gray-300 mb-6 relative z-10">{testimonial.content}</p>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 flex items-center justify-center text-white font-bold">
                      {testimonial.author.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">{testimonial.author}</h4>
                    <p className="text-xs text-gray-400">{testimonial.position}</p>
                  </div>
                </div>
              </div>
              
              {/* Background decoration */}
              <div className="absolute bottom-0 right-0 h-24 w-24 bg-gradient-to-r from-sky-400/10 to-blue-600/10 rounded-full blur-xl"></div>
            </div>
          ))}
        </div>
        
        {/* Logos section */}
        <div className="mt-20">
          <p className="text-center text-sm font-medium text-gray-400 mb-8">TRUSTED BY TEAMS AT</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            {['Microsoft', 'Google', 'Amazon', 'Netflix', 'Airbnb'].map((company, index) => (
              <div key={index} className="text-gray-400 font-bold text-xl">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
