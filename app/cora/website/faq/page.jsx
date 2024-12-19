"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function Accordion({ title, description }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-[white] px-4 rounded-[12px] claracontainer">
      <div
        className="flex bg-[white] py-[6px] duration-300 justify-between w-full items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-[#414141] text-[20px] font-medium clarabodyTwo font-fredoka">
          {title}
        </h2>
        <span
          className={`text-lg text-red ${
            isOpen ? "rotate-90" : ""
          } transition-transform duration-300 transition-max-height`}
        >
          ❯
        </span>
      </div>
      {isOpen && (
        <div className="pb-4 transition-max-height duration-500">
          <p className="clarabodyTwo text-[#7d7d7d]">{description}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/faq?populate=*");
        const data = await response.json();

        // Check if the data structure matches and if Content is available
        if (data?.data?.Content) {
          setFaqs(data.data.Content); // Set the Content array directly
        } else {
          setError("No FAQ data found");
        }
      } catch (err) {
        setError("Error fetching FAQs: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  // Show loading message while fetching
  if (loading) {
    return <div>Loading FAQs...</div>;
  }

  // Show error if any
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto font-fredoka px-8 py-12">
      <div className="flex justify-between items-center mb-10">
      <h2 className="text-3xl font-medium mb-8">FAQs</h2>
        <div className="flex justify-end">
          <Link
            className="border-gray-300 text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 rounded-lg px-6 py-2"
            href="/cora/website/faq/update"
          >
            Edit
          </Link>
        </div>
      </div>
      
      <div className="w-full h-fit gap-2 flex flex-col">
        {faqs.length === 0 ? (
          <p>No FAQs available</p>
        ) : (
          faqs.map((faq) => (
            <Accordion
              key={faq.id}
              title={faq.Question}
              description={
                <div
                  className="text-gray-600 mt-2"
                  dangerouslySetInnerHTML={{ __html: faq.Answer }}
                />
              }
            />
          ))
        )}
      </div>
    </div>
  );
}