import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Contact = () => {
  return (
    <div className="w-full bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-center gap-6">
          <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
          <div className="flex items-center gap-4">
            <PhoneIcon className="text-blue-600" />
            <span className="text-gray-700 text-lg">+265 999 123 456</span>
          </div>
          <div className="flex items-center gap-4">
            <EmailIcon className="text-blue-600" />
            <span className="text-gray-700 text-lg">
              info@automotivesystem.com
            </span>
          </div>
          <div className="flex items-center gap-4">
            <LocationOnIcon className="text-blue-600" />
            <span className="text-gray-700 text-lg">
              Area 51, Lilongwe, Malawi
            </span>
          </div>
          <p className="text-gray-500 mt-6">
            We are always happy to hear from our customers. Fill the form or use
            the contact info above to reach us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
