import React from 'react'
import Image from 'next/image'
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs'

function Hero() {
  return (
    <section className="bg-gradient-to-b from-black to-gray-900 min-h-screen">
      <div className='flex items-center justify-center pt-10'>
        <div className='bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text'>
          <h2 className='text-transparent border px-6 py-3 rounded-full text-center border-sky-500/30 bg-sky-900/20 backdrop-blur-md shadow-lg'>
            <span className='font-medium'>See What's New</span> | <span className='font-bold'>AI Diagram</span>
          </h2>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-4 py-16 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-center lg:text-left lg:pr-8">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
                Documents & diagrams
              </span>
              <span className="block text-white mt-2">for engineering teams.</span>
            </h1>

            <p className="mt-6 text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              All-in-one markdown editor, collaborative canvas, and diagram-as-code builder for modern teams.
            </p>

            <div className="mt-10 flex flex-wrap gap-5 justify-center lg:justify-start">
              <RegisterLink>
                <button className="px-8 py-4 bg-gradient-to-r from-sky-400 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-sky-500/25 transition duration-300 transform hover:translate-y-[-2px]">
                  Get Started — It's Free
                </button>
              </RegisterLink>

              <a href="#features" className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-medium rounded-lg hover:bg-white/20 transition duration-300 transform hover:translate-y-[-2px]">
                Learn More
              </a>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 mt-16 lg:mt-0 relative">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400/20 to-blue-600/20 rounded-xl blur-3xl"></div>
            <div className="relative shadow-2xl rounded-xl overflow-hidden border border-sky-500/20 bg-gray-900/60 backdrop-blur-md">
              <Image 
                src="/demo-screenshot.png" 
                alt="Erasor App Demo" 
                width={900} 
                height={600} 
                className="w-full h-auto"
                onError={(e) => e.currentTarget.src = 'https://placehold.co/900x600/1a1a1a/ffffff?text=Erasor+App+Demo'}
              />
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
            <span className="h-2 w-2 rounded-full bg-sky-400"></span>
            <span className="h-2 w-2 rounded-full bg-white/40"></span>
            <span className="h-2 w-2 rounded-full bg-white/40"></span>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-12 opacity-80">
        <div className="px-16 py-6 bg-white/5 backdrop-blur-lg rounded-full border border-white/10 flex items-center space-x-12">
          {['Collaborative', 'AI-Powered', 'Real-time', 'Secure'].map((item, index) => (
            <div key={index} className="text-sm font-medium text-gray-300 flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-sky-400 mr-2"></span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero