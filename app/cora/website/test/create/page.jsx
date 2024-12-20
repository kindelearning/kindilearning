"use client";
import { useState } from "react";
import LocalHeader from "../Topbar";

// export default function CreateContent() {
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");
//   const [date, setDate] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     const newContent = {
//       Title: title,
//       Body: body,
//       Date: date,
//     };

//     try {
//       const response = await fetch("http://localhost:1337/api/contents", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ data: newContent }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccess("Content created successfully!");
//         setTitle("");
//         setBody("");
//         setDate("");
//       } else {
//         setError("Failed to create content");
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
//       <LocalHeader />
//       <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 mt-8">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           Create New Content
//         </h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="title" className="block text-gray-700 font-medium">
//               Title
//             </label>
//             <input
//               type="text"
//               id="title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//               className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter the title"
//             />
//           </div>
//           <div>
//             <label htmlFor="body" className="block text-gray-700 font-medium">
//               Body
//             </label>
//             <textarea
//               id="body"
//               value={body}
//               onChange={(e) => setBody(e.target.value)}
//               required
//               rows="4"
//               className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter the content body"
//             />
//           </div>
//           <div>
//             <label htmlFor="date" className="block text-gray-700 font-medium">
//               Date
//             </label>
//             <input
//               type="date"
//               id="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               required
//               className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-2 px-4 font-medium text-white rounded-lg ${
//               loading
//                 ? "bg-blue-300 cursor-not-allowed"
//                 : "bg-blue-500 hover:bg-blue-600"
//             }`}
//           >
//             {loading ? "Creating..." : "Create"}
//           </button>
//         </form>
//         {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
//         {success && (
//           <p className="mt-4 text-green-500 text-center">{success}</p>
//         )}
//       </div>
//     </div>
//   );
// }

("use client");
import { useState, useEffect } from "react";
import LocalHeader from "./Topbar";

export default function ContentList() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null); // For update modal
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/contents?populate=*"
        );
        const data = await response.json();

        if (response.ok) {
          setContent(data.data); // Strapi content
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:1337/api/contents/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setContent((prevContent) =>
          prevContent.filter((item) => item.id !== id)
        );
        alert("Content deleted successfully!");
      } else {
        alert("Failed to delete content");
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:1337/api/contents/${updatedData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: updatedData }),
        }
      );

      if (response.ok) {
        const updatedContent = await response.json();
        setContent((prevContent) =>
          prevContent.map((item) =>
            item.id === updatedContent.data.id ? updatedContent.data : item
          )
        );
        alert("Content updated successfully!");
        setModalOpen(false); // Close modal after update
      } else {
        alert("Failed to update content");
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-8 text-lg font-medium">Loading...</div>
    );
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="w-full flex flex-col items-center">
      <LocalHeader />
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
        Content List
      </h1>
      {content.length === 0 ? (
        <p className="text-gray-500 text-lg mt-4">No content available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
          {content.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 flex flex-col space-y-4 bg-white"
            >
              <h2 className="text-2xl font-bold text-gray-700">{item.Title}</h2>
              <p className="text-gray-600 line-clamp-3">{item.Body}</p>
              <p className="text-sm text-gray-400">
                {new Date(item.Date).toLocaleDateString()}
              </p>
              <div className="flex justify-between items-center mt-auto">
                <button
                  onClick={() => {
                    setSelectedContent({
                      id: item.id,
                      Title: item.Title,
                      Body: item.Body,
                      Date: item.Date,
                    });
                    setModalOpen(true);
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium underline"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-700 font-medium underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <UpdateModal
          content={selectedContent}
          onClose={() => setModalOpen(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

function UpdateModal({ content, onClose, onUpdate }) {
  const [title, setTitle] = useState(content.Title);
  const [body, setBody] = useState(content.Body);
  const [date, setDate] = useState(content.Date);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ id: content.id, Title: title, Body: body, Date: date });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Update Content</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full border rounded p-2"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
