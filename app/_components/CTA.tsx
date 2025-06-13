import React from 'react'
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs'

function CTA() {
  return (
    <section className="bg-gradient-to-b from-gray-900 to-black py-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500/20 to-blue-600/20 backdrop-blur-lg shadow-xl border border-white/10 p-8 md:p-12">
          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-500 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Ready to transform your team's workflow?
              </h2>
              <p className="mt-4 text-lg text-gray-300 max-w-2xl">
                Join thousands of engineering teams who are already using Erasor to collaborate better, document faster, and create beautiful diagrams.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-0">
              <RegisterLink>
                <button className="px-8 py-4 bg-gradient-to-r from-sky-400 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-sky-500/25 transition duration-300 transform hover:-translate-y-1">
                  Start for free
                </button>
              </RegisterLink>
              <a 
                href="#features" 
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-medium rounded-lg hover:bg-white/20 transition duration-300 transform hover:-translate-y-1 text-center"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
