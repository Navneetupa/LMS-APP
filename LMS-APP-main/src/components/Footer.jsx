import React from "react";
import logo from "../assets/logo.png"; // Replace with the correct path to your logo

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 w-full mt-0">
      <div className="w-full px-4 sm:px-8 flex flex-col items-center">
     {/* Footer Brand Section */}
<div className="flex flex-col md:flex-row justify-center items-center mb-8 gap-8">
  <img src={logo} alt="Logo" className="h-12 mb-4 md:mb-0" />
  <div className="text-center md:text-left">
    <p className="text-xl">Virtual Class</p>
    <p className="text-xl">for Zoom</p>
  </div>
</div>


    {/* Newsletter Subscription Section */}
<div className="text-center mb-8 px-4">
  <h3 className="text-2xl mb-4 font-poppins text-white">
    Subscribe to get our Newsletter
  </h3>

  <div className="max-w-2xl mx-auto">
    <form className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
      <input
        type="email"
        placeholder="Your Email"
        className="flex-1 px-6 py-2 rounded-full border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 text-white w-full"
      />
      <button
        type="submit"
        className="px-4 py-1.5 rounded-full bg-blue-400 text-white font-semibold hover:bg-blue-300 transition duration-300 w-auto text-sm min-w-[100px]"
      >
        Subscribe
      </button>
    </form>
  </div>
</div>


        {/* Footer Links Section */}
        <div className="text-center mb-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <a
              href="/careers"
              className="text-white hover:text-blue-600 mx-4 text-lg transition duration-300 mb-2 md:mb-0"
            >
              Careers
            </a>
            <a
              href="/privacy"
              className="text-white hover:text-blue-600 mx-4 text-lg transition duration-300 mb-2 md:mb-0"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-white hover:text-blue-600 mx-4 text-lg transition duration-300"
            >
              Terms & Conditions
            </a>
          </div>
        </div>

        {/* Footer Copyright Section */}
        <div className="text-center">
          <p className="text-sm">© 2025 Class Technologies Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
