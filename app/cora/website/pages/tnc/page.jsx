"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Define the form data types
const initialFormState = {
  title: "",
  body: "",
  pageContent: "",
};

export default function TncForm({ tncId }) {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fetch Tnc data to pre-fill form (for updating)
  useEffect(() => {
    if (tncId) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/tncs/${tncId}`);
          const data = await response.json();
          if (data) {
            setFormData({
              title: data.data.attributes.Title || "",
              body: data.data.attributes.Body || "",
              pageContent: data.data.attributes.Pagecontent || "",
            });
          }
        } catch (error) {
          setError("Failed to fetch Tnc data");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setLoading(false); // No Tnc ID, so it's a new entry
    }
  }, [tncId]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission for POST or PUT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestData = {
      data: {
        Title: formData.title,
        Body: formData.body,
        Pagecontent: formData.pageContent,
      },
    };

    try {
      let response;
      if (tncId) {
        // Update existing Tnc (PUT request)
        response = await fetch(`/api/tncs/${tncId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
      } else {
        // Create new Tnc (POST request)
        response = await fetch("/api/tncs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
      }

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        router.push("/admin/tncs"); // Redirect to the Tnc list page after successful submission
      }
    } catch (error) {
      setError("Error submitting the form");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white shadow-md rounded-lg"
    >
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="body"
          className="block text-sm font-medium text-gray-700"
        >
          Body
        </label>
        <input
          type="text"
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="pageContent"
          className="block text-sm font-medium text-gray-700"
        >
          Page Content
        </label>
        <textarea
          id="pageContent"
          name="pageContent"
          value={formData.pageContent}
          onChange={handleChange}
          rows="4"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        ></textarea>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {tncId ? "Update" : "Create"} Tnc
        </button>
      </div>
    </form>
  );
}
