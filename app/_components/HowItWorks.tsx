import React from 'react';
import Image from 'next/image';

function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Create or Join a Workspace',
      description: 'Start by creating your workspace or join an existing one with your team members.',
      image: '/step1.png' // You'll need to add these images to your public folder
    },
    {
      number: '02',
      title: 'Create Documents & Diagrams',
      description: 'Use our powerful editor for documents and intuitive canvas for diagrams.',
      image: '/step2.png'
    },
    {
      number: '03',
      title: 'Collaborate in Real-time',
      description: 'Work simultaneously with your team, seeing changes as they happen.',
      image: '/step3.png'
    }
  ];

  return (
    <section className="bg-black py-24">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-sky-400 tracking-wide uppercase">How it works</h2>
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Simple, yet powerful workflow
          </p>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-300">
            Get started with Erasor in minutes and transform the way your team collaborates.
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-8 items-center`}
            >
              {/* Step number and content */}
              <div className="md:w-1/2 space-y-4">
                <div className="flex items-center">
                  <span className="text-4xl font-bold bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
                    {step.number}
                  </span>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-sky-400 to-blue-600 ml-4"></div>
                </div>
                
                <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                <p className="text-lg text-gray-300">{step.description}</p>
              </div>
              
              {/* Image */}
              <div className="md:w-1/2 relative">
                <div className="aspect-video relative rounded-xl overflow-hidden border border-sky-500/20 shadow-lg bg-gray-900/60 backdrop-blur-md">
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-400/10 to-blue-600/10 rounded-xl"></div>
                  <Image 
                    src={step.image}
                    alt={step.title}
                    width={600}
                    height={400}
                    className="w-full h-auto"
                    onError={(e) => e.currentTarget.src = `https://placehold.co/600x400/1a1a1a/ffffff?text=Step+${index + 1}`}
                  />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -z-10 -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full blur-xl opacity-20"></div>
                <div className="absolute -z-10 -top-6 -left-6 w-32 h-32 bg-sky-500 rounded-full blur-2xl opacity-10"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
