// src/components/Footer.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">University Department Information</h3>
          <p className="text-sm text-gray-400">
            Discover and explore information about our university departments, including academic programs, research initiatives, and student services.
          </p>
        </div>
        
        {/* Resources Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Resources</h3>
          <ul>
            <li><a href="/library" className="text-gray-400 hover:text-white">Library</a></li>
            <li><a href="/admissions" className="text-gray-400 hover:text-white">Admissions</a></li>
            <li><a href="/events" className="text-gray-400 hover:text-white">Events</a></li>
            <li><a href="/career" className="text-gray-400 hover:text-white">Career Services</a></li>
          </ul>
        </div>
        
        {/* Contact & Social Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-sm text-gray-400">123 University Ave, City, State, 12345</p>
          <p className="text-sm text-gray-400 mt-2">Phone: (123) 456-7890</p>
          <p className="text-sm text-gray-400">Email: info@university.edu</p>

          <div className="flex space-x-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-3xl">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-3xl">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-3xl">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </div>

        {/* Map Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Campus Map</h3>
          <div className="relative" style={{ height: '240px', width: '100%' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.587454063622!2d78.5373096737276!3d14.335379686120072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb3a3138e2593b9%3A0x98992fa5d3002a97!2sDEPARTMENT%20OF%20COMPUTER%20SCIENCE%20AND%20ENGINEERING%2C%20RGUKT%20RK%20VALLEY!5e0!3m2!1sen!2sin!4v1732985023829!5m2!1sen!2sin"
              title="campus map" 
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

      </div>
      
      <div className="text-center mt-8 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Tech Alchemists - Aadhya2k25. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;