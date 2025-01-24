"use client";

import { useEffect, useState } from "react";

export default function FAQEditPage() {
  const [faqs, setFaqs] = useState([]);
  const [selectedFAQ, setSelectedFAQ] = useState(null); // Selected FAQ to edit
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For storing the edited question and answer
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // For adding a new FAQ
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch(
          "https://lionfish-app-98urn.ondigitalocean.app/api/faq?populate=*"
        );
        const data = await response.json();

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

  const handleFAQSelect = (faq) => {
    setSelectedFAQ(faq);
    setQuestion(faq.Question);
    setAnswer(faq.Answer);
  };

  const handleQuestionChange = (e) => setQuestion(e.target.value);
  const handleAnswerChange = (e) => setAnswer(e.target.value);

  const handleNewQuestionChange = (e) => setNewQuestion(e.target.value);
  const handleNewAnswerChange = (e) => setNewAnswer(e.target.value);

  const handleUpdateFAQ = async () => {
    if (!question || !answer) {
      setError("Both question and answer are required!");
      return;
    }

    try {
      const updatedFAQ = { Question: question, Answer: answer };

      const response = await fetch(
        `https://lionfish-app-98urn.ondigitalocean.app/api/faq/${selectedFAQ.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: updatedFAQ }),
        }
      );

      const data = await response.json();

      if (data?.data) {
        setFaqs((prevFAQs) =>
          prevFAQs.map((faq) =>
            faq.id === selectedFAQ.id ? { ...faq, ...updatedFAQ } : faq
          )
        );
        setSelectedFAQ(null); // Close the form after update
        setQuestion("");
        setAnswer("");
        setError(null); // Clear error
      } else {
        setError("Failed to update FAQ");
      }
    } catch (err) {
      setError("Error updating FAQ: " + err.message);
    }
  };

  const handleAddFAQ = async () => {
    if (!newQuestion || !newAnswer) {
      setError("Both question and answer are required!");
      return;
    }

    try {
      const newFAQ = { Question: newQuestion, Answer: newAnswer };

      const response = await fetch("https://lionfish-app-98urn.ondigitalocean.app/api/faq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: newFAQ }),
      });

      const data = await response.json();

      if (data?.data) {
        // Add the new FAQ to the list
        setFaqs((prevFAQs) => [...prevFAQs, data.data]);
        setNewQuestion("");
        setNewAnswer("");
        setError(null); // Clear error
      } else {
        setError("Failed to add FAQ");
      }
    } catch (err) {
      setError("Error adding FAQ: " + err.message);
    }
  };

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
      <h2 className="text-3xl font-medium mb-8">Edit FAQ</h2>

      <div className="flex gap-4">
        {/* FAQ list for selecting */}
        <div className="w-1/3 bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold text-lg">Select FAQ to Edit</h3>
          <ul className="mt-4">
            {faqs.map((faq) => (
              <li
                key={faq.id}
                className="cursor-pointer hover:bg-gray-200 p-2 mb-2 rounded-lg"
                onClick={() => handleFAQSelect(faq)}
              >
                {faq.Question}
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ editing form */}
        {selectedFAQ && (
          <div className="w-2/3 p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Edit FAQ</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium">Question</label>
              <input
                type="text"
                value={question}
                onChange={handleQuestionChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter the question"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Answer</label>
              <textarea
                value={answer}
                onChange={handleAnswerChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="4"
                placeholder="Enter the answer"
              />
            </div>

            <button
              onClick={handleUpdateFAQ}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Update FAQ
            </button>
          </div>
        )}
      </div>

      {/* Add new FAQ form */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4">Add New FAQ</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium">Question</label>
          <input
            type="text"
            value={newQuestion}
            onChange={handleNewQuestionChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter the question"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Answer</label>
          <textarea
            value={newAnswer}
            onChange={handleNewAnswerChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="4"
            placeholder="Enter the answer"
          />
        </div>

        <button
          onClick={handleAddFAQ}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Add FAQ
        </button>
      </div>
    </div>
  );
}
