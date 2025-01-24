"use client";

import { useEffect, useState } from "react";
import LocalHeader from "../../test/Topbar";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ReadContent() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/tnc?populate=*"
        );
        const data = await response.json();

        if (response.ok) {
          setContent(data.data.Content); // Extracting the nested content data
        } else {
          setError("Failed to fetch content");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container font-fredoka mx-auto px-8 py-12 font-poppins">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-xl font-medium text-gray-600">Last Updated:</h2>
          <p className="text-lg text-gray-500">{content.Lastupdated}</p>
        </div>
        <div className="flex justify-end">
          <Link
            className="border-gray-300 text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 rounded-lg px-6 py-2"
            href="/cora/website/pages/tnc/update"
          >
            Edit
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        <Card className="p-8 bg-gray-50 shadow-xl rounded-lg hover:shadow-2xl transition duration-300 ease-in-out">
          <h1 className="text-4xl font-semibold text-gray-800 mb-6">
            {content.Title}
          </h1>
          {/* <p className="text-lg text-gray-600 prose leading-relaxed mb-6">
            {content.Pagecontent}
          </p> */}
          <div
              className="text-lg text-gray-600 prose leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: content.Pagecontent }}
            />
        </Card>
      </div>
    </div>
  );
}
