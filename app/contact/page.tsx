"use client";

import React, { useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import MapPinIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Nav from "@/app/components/Nav"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission (API call or email service)
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="w-full bg-gray-50">
      <Nav />
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] w-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Reach out to our team
            for any inquiries about buying or hiring a car.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Phone Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition text-center">
            <div className="flex justify-center mb-4">
              <PhoneIcon className="text-blue-600" sx={{ fontSize: 40 }} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Phone</h3>
            <p className="text-gray-600">+265 1 234 567</p>
            <p className="text-sm text-gray-500 mt-2">Mon-Fri, 9am-6pm</p>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition text-center">
            <div className="flex justify-center mb-4">
              <MailIcon className="text-green-600" sx={{ fontSize: 40 }} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Email</h3>
            <p className="text-gray-600">info@automalawi.com</p>
            <p className="text-sm text-gray-500 mt-2">
              We'll reply within 24hrs
            </p>
          </div>

          {/* Address Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition text-center">
            <div className="flex justify-center mb-4">
              <MapPinIcon className="text-red-600" sx={{ fontSize: 40 }} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Address
            </h3>
            <p className="text-gray-600">123 Main Street</p>
            <p className="text-sm text-gray-500">Lilongwe, Malawi</p>
          </div>

          {/* Hours Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition text-center">
            <div className="flex justify-center mb-4">
              <AccessTimeIcon
                className="text-purple-600"
                sx={{ fontSize: 40 }}
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Hours</h3>
            <p className="text-gray-600">9:00 AM - 6:00 PM</p>
            <p className="text-sm text-gray-500">Mon - Fri</p>
          </div>
        </div>

        {/* Contact Form and Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Send us a Message
            </h2>

            {submitted && (
              <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
                ✓ Thank you! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+265 1 234 567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Tell us more..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Map and Additional Info */}
          <div className="space-y-6">
            {/* Embedded Map */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-96">
              <iframe
                title="Auto Malawi Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3843.8788394822546!2d35.3395!3d-13.9626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1940ccc0000001%3A0x0!2sLilongwe%2C%20Malawi!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* FAQ or Additional Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Quick FAQs
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    How long does delivery take?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Standard delivery within Lilongwe takes 2-3 business days.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Do you offer financing options?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Yes, we partner with local banks for flexible payment plans.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    What's your return policy?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    30-day money-back guarantee on all vehicle purchases.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16 mt-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to find your perfect car?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Browse our inventory or contact our team to learn more about our
            vehicles.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Browse Cars
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Schedule a Test Drive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
