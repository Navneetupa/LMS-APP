import React from 'react';
import ContactInfo from '../Careercomponents/ContactInfo';
import ContactForm from '../Careercomponents/ContactForm';
import Navbar from '../components/StickyNavbar';
import bgImage from '../assets/contact-background.avif';


import Footer from '../components/Footer';

const ContactUs = () => {
  return (
  <>
  <Navbar/>
    <div className="min-h-screen pt-12 flex flex-col">
      
      {/* Background image container for contact info + form */}
      <div
        className="flex flex-col items-center justify-center p-6 bg-cover bg-center flex-grow"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="bg-transparent rounded-3xl shadow-2xl w-full max-w-6xl flex flex-col md:flex-row overflow-hidden border border-white/30 mb-10">
          <ContactInfo />
          <ContactForm />
        
        </div>
      </div>

       <Footer/>
     
     
    </div>
    </>
  );
};

export default ContactUs;