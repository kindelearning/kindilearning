"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function CreateContactForm() {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Subject: "",
    Message: "",
    EnquiryType: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("https://kindiadmin.up.railway.app/api/contact-forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: formData,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({
          Name: "",
          Email: "",
          Phone: "",
          Subject: "",
          Message: "",
          EnquiryType: "",
        });
      } else {
        throw new Error("Failed to create contact form entry");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full h-auto pb-24 bg-[#EAEAF5] items-center justify-center py-4 flex flex-col md:flex-row gap-[20px]">
      <div className="claracontainer p-4 md:py-8 md:px-2 lg:p-12 w-full flex flex-col overflow-hidden gap-8">
        {error && <p className="text-red-500">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col gap-2 lg:gap-4 w-full"
        >
          <Input
            type="text"
            id="Name"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <Input
            type="email"
            id="Email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <div className="flex w-full gap-2">
            <Input
              type="tel"
              id="Phone"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
              className="w-full p-2 border border-gray-300 rounded-md"
            />

            <Input
              type="text"
              id="Subject"
              name="Subject"
              value={formData.Subject}
              onChange={handleChange}
              required
              placeholder="Enter subject of your enquiry"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <Textarea
            id="Message"
            name="Message"
            value={formData.Message}
            onChange={handleChange}
            required
            placeholder="Enter your message or enquiry"
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="4"
          />

          <select
            id="EnquiryType"
            name="EnquiryType"
            value={formData.EnquiryType}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Enquiry Type</option>
            <option value="General">General</option>
            <option value="Support">Support</option>
            <option value="Sales">Sales</option>
            <option value="Career Opportunities">Career Opportunities</option>
            <option value="Partnership or Collaboration Opportunity">
              Partnership or Collaboration Opportunity
            </option>
            <option value="Investment Opportunities">
              Investment Opportunities
            </option>
            <option value="Compliment or Praise">Compliment or Praise</option>
            <option value="Press or Media Inquiry">
              Press or Media Inquiry
            </option>
            <option value="Product Suggestions or Recommendations">
              Product Suggestions or Recommendations
            </option>
            <option value="Custom Orders or Special Requests">
              Custom Orders or Special Requests
            </option>
            <option value="Wholesale or Bulk Order Inquiry">
              Wholesale or Bulk Order Inquiry
            </option>
            <option value="Events">Events</option>
            <option value="Subscription or Service Questions">
              Subscription or Service Questions
            </option>
            <option value="Billing or Payment">Billing or Payment</option>
            <option value="Website Bug or Technical Issue">
              Website Bug or Technical Issue
            </option>
            <option value="Technical Assistance">Technical Assistance</option>
            <option value="Returns, Exchanges, or Refunds">
              Returns, Exchanges, or Refunds
            </option>
            <option value="Order Status">Order Status</option>
            <option value="Product Information Request">
              Product Information Request
            </option>
            <option value="Account Login or Password Help">
              Account Login or Password Help
            </option>
            <option value="Feedback or Complaint">Feedback or Complaint</option>
            <option value="Developer Support (API, Integration)">
              Developer Support (API, Integration)
            </option>
          </select>

          <Button
            type="submit"
            disabled={loading}
            className="clarabutton w-[200px] lg:w-[300px] bg-red hover:bg-hoverRed text-white p-2"
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
          {success && (
            <p className="text-green-500">Form submitted successfully!</p>
          )}
        </form>
      </div>
    </section>
  );
}

export default function CreateContactFormPage() {
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
        <CreateContactForm />
      </div>
    </section>
  );
}
