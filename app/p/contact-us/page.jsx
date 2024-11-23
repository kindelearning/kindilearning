"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    inquiryType: "",
    subject: "",
    phoneNumber: "", // Add phoneNumber here
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");


  const inquiryOptions = [
    "Career Opportunities",
    "Partnership or Collaboration Opportunity",
    "Investment Opportunities",
    "Compliment or Praise",
    "Press or Media Inquiry",
    "Product Suggestions or Recommendations",
    "Custom Orders or Special Requests",
    "Wholesale or Bulk Order Inquiry",
    "Events",
    "Subscription or Service Questions",
    "Billing or Payment",
    "Website Bug or Technical Issue",
    "Technical Assistance",
    "Returns, Exchanges, or Refunds",
    "Order Status",
    "Product Information Request",
    "Account Login or Password Help",
    "Feedback or Complaint",
    "Developer Support (API, Integration)",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setSuccessMessage("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          message: "",
          subject: "",
          inquiryType: "",
          phoneNumber: "",
        });
      } else {
        setError("Failed to send the message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setError("Error submitting contact form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full h-auto pb-24 bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
      <div className="claracontainer p-4 md:py-8 md:px-2 lg:p-12 w-full flex flex-col overflow-hidden gap-8">
        <div className="claracontainer w-full flex flex-col overflow-hidden gap-2 md:gap-4">
          <div className="w-full text-center">
            <span className="text-[#3f3a64] text-[32px] tracking-tight font-semibold font-fredoka uppercase leading-10">
              CONTACT{" "}
            </span>
            <span className="text-[#f05c5c] text-[32px] font-semibold font-fredoka uppercase leading-10">
              Us
            </span>
          </div>
          <div className="w-full text-center px-0 md:px-12 lg:px-24 xl:px-28 text-[#3f3a64] clarabodyTwo">
            At Kindi, we&apos;re committed to continuous improvement in our
            pursuit of enjoyable and impactful learning experiences. Each month,
            we retire play activities to introduce enhanced learning for the
            upcoming month. Which one will you select to elevate your
            child&apos;s early-years development?
          </div>
        </div>
        {/* Form */}

        <div className="flex flex-col items-center justify-center">
          {successMessage && (
            <p className="text-green-800 pb-4">{successMessage}</p>
          )}
          {error && <p className="text-red pb-4">{error}</p>}
          <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center flex-col gap-2 lg:gap-4 w-full"
          >
            <div className="flex w-full flex-col lg:flex-row gap-2 lg:gap-1">
              <Input
                type="text"
                name="name"
                value={formData.name}
                className="border p-2"
                placeholder="Your Name"
                onChange={handleChange}
                required
              />

              <Input
                type="email"
                name="email"
                className="border p-2"
                value={formData.email}
                placeholder="Your Email"
                onChange={handleChange}
                required
              />
            </div>

            <Input
              type="tel"
              name="phoneNumber"
              className="border p-2"
              value={formData.phoneNumber}
              required
              placeholder="Your Mobile Number"
              onChange={handleChange}
            />
            <Input
              name="subject"
              value={formData.subject}
              placeholder="Enter Subject"
              onChange={handleChange}
              className="border p-2"
              required
            />
            <select
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              required
              className="border p-2 font-fredoka text-[#7f8896] rounded-[8px] w-full"
            >
              <option className="text-black" value="">Select Inquiry Type</option>
              {inquiryOptions.map((option, index) => (
                <option className="text-black" key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <Textarea
              name="message"
              value={formData.message}
              placeholder="Your Message"
              onChange={handleChange}
              className="border p-2"
              required
            />
            <Button
              type="submit"
              disabled={loading}
              className="clarabutton w-[200px] lg:w-[300px] bg-red hover:bg-hoverRed text-white p-2"
            >
              {loading ? "Sending..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
