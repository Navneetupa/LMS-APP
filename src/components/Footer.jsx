import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faXTwitter,
  faLinkedinIn,
  faInstagram,
  faTiktok,
  faYoutube,
  faTelegram,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
              <span className="text-2xl font-bold">Brain Bridge</span>
              <span className="text-sm uppercase text-gray-400">Empower Your Future</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <span className="hover:underline cursor-pointer">FAQs</span>
            <span className="hover:underline cursor-pointer">Customer Support</span>
            <div className="flex items-center space-x-2 text-sm">
              <span>Rated Excellent</span>
              <span className="text-yellow-400">★★★★★</span>
              <span>(Trustpilot)</span>
            </div>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {/* Course Category */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Course Category</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Web Development</a></li>
              <li><a href="#" className="hover:underline">App Development</a></li>
              <li><a href="#" className="hover:underline">Machine Learning</a></li>
              <li><a href="#" className="hover:underline">Data Science</a></li>
              <li><a href="#" className="hover:underline">Cyber Security</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-3">About</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/aboutus" className="hover:underline">About Us</a></li>
              <li><a href="/career" className="hover:underline">Careers</a></li>
              <li><a href="/contactus" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>

          {/* Business */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Brain Bridge for Business</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Corporate Business</a></li>
              <li><a href="#" className="hover:underline">Corporate Training</a></li>
              <li><a href="#" className="hover:underline">Partner Program</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Legal & Accessibility</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Accessibility Statement</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Sitemap</a></li>
              <li><a href="#" className="hover:underline">Terms</a></li>
            </ul>
          </div>
        </div>

        {/* Social and Download */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-700 pt-4 gap-4">
          {/* Social Icons */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-4">
            {[faFacebookF, faXTwitter, faLinkedinIn, faInstagram, faTiktok, faYoutube, faTelegram].map((icon, idx) => (
              <a key={idx} href="#" className="hover:text-gray-400">
                <FontAwesomeIcon icon={icon} style={{ width: 22, height: 22 }} />
              </a>
            ))}
          </div>

          {/* App Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#" className="bg-white text-black px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-gray-200 text-sm">
              <span role="img" aria-label="apple">🍏</span>
              <span>App Store</span>
            </a>
            <a href="#" className="bg-white text-black px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-gray-200 text-sm">
              <span role="img" aria-label="play">▶️</span>
              <span>Google Play</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm mt-6 text-gray-400">
          <p>© Brain Bridge 2025 | <a href="#" className="hover:underline">Privacy</a> | <a href="#" className="hover:underline">Terms</a> | <a href="#" className="hover:underline">Cookie Policy</a> | <a href="#" className="hover:underline">Sitemap</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
