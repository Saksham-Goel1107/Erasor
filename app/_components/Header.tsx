
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/5">
      <div className="mx-auto flex h-20 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Image 
            src='/logo-1.png' 
            alt='Erasor' 
            width={40} 
            height={40} 
            className="transition-transform hover:scale-110"
          />
          <span className="font-bold text-xl bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
            Erasor
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-8 text-sm">
              <li>
                <a className="text-white/80 hover:text-sky-400 transition duration-300 font-medium" href="#features"> 
                  Features 
                </a>
              </li>

              <li>
                <a className="text-white/80 hover:text-sky-400 transition duration-300 font-medium" href="#pricing"> 
                  Pricing 
                </a>
              </li>

              <li>
                <a className="text-white/80 hover:text-sky-400 transition duration-300 font-medium" href="#testimonials"> 
                  Testimonials 
                </a>
              </li>

              <li>
                <a className="text-white/80 hover:text-sky-400 transition duration-300 font-medium" href="#faq"> 
                  FAQ 
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex sm:gap-4">
              <LoginLink postLoginRedirectURL="/dashboard">
                <button className="px-5 py-2.5 text-sm font-medium text-white hover:text-sky-400 transition duration-300">
                  Sign In
                </button>
              </LoginLink>

              <RegisterLink>
                <button className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-sky-400 to-blue-600 text-white rounded-lg shadow-lg hover:shadow-sky-500/25 transition duration-300">
                  Sign Up Free
                </button>
              </RegisterLink>
            </div>

            <button
              className="block rounded-lg p-2.5 text-white transition hover:text-sky-400 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-black to-gray-900 border-t border-white/5">
          <ul className="px-4 py-6 space-y-4">
            <li>
              <a className="block text-white hover:text-sky-400" href="#features" onClick={() => setMobileMenuOpen(false)}>
                Features
              </a>
            </li>
            <li>
              <a className="block text-white hover:text-sky-400" href="#pricing" onClick={() => setMobileMenuOpen(false)}>
                Pricing
              </a>
            </li>
            <li>
              <a className="block text-white hover:text-sky-400" href="#testimonials" onClick={() => setMobileMenuOpen(false)}>
                Testimonials
              </a>
            </li>
            <li>
              <a className="block text-white hover:text-sky-400" href="#faq" onClick={() => setMobileMenuOpen(false)}>
                FAQ
              </a>
            </li>
            <li className="pt-4 flex space-x-4">
              <LoginLink postLoginRedirectURL="/dashboard">
                <button className="w-full py-2 px-4 border border-white/20 rounded-lg text-white">
                  Sign In
                </button>
              </LoginLink>
              <RegisterLink>
                <button className="w-full py-2 px-4 bg-gradient-to-r from-sky-400 to-blue-600 rounded-lg text-white">
                  Sign Up
                </button>
              </RegisterLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}


export default Header