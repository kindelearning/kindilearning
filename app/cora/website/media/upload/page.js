"use client";

import React, { useState } from "react";

const UploadMediaPage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [dragOver, setDragOver] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setErrorMessage(""); // Reset error message when a new file is selected

    // Validate file type and size
    if (selectedFile) {
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "video/mp4",
        "video/quicktime",
        "image/svg+xml",
        "image/webp",
        "application/pdf",
        "application/zip",
      ];
      if (!validTypes.includes(selectedFile.type)) {
        setErrorMessage(
          "Please select a valid file (JPEG, PNG, GIF, MP4, SVG, WebP, PDF, ZIP)."
        );
        setFile(null); // Clear file if invalid
      } else if (selectedFile.size > 50 * 1024 * 1024) {
        // Limit file size to 10MB
        setErrorMessage("File size should be under 50MB.");
        setFile(null); // Clear file if too large
      }
    }
  };

  // Handle drag over
  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  // Handle drop
  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    handleFileChange({ target: { files: [droppedFile] } });
  };

  // Upload file to Strapi
  const handleUpload = async () => {
    if (!file) {
      setErrorMessage("Please select a file");
      return;
    }

    setUploading(true);
    setErrorMessage(""); // Reset error message on upload

    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload the media");
      }

      const data = await response.json();
      console.log("Uploaded file data:", data);

      // Extract the file URL from the response and store it
      const uploadedFileUrl = data[0]?.url; // Assuming Strapi returns a list of files
      setUploadedFileUrl(uploadedFileUrl);
    } catch (error) {
      console.error("Error uploading file", error);
      setErrorMessage("An error occurred while uploading the media.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        Upload Media (Image, Video, PDF, ZIP)
      </h1>

      <div className="w-full flex items-start gap-2 justify-start">
        <div className="w-full min-w-[50%] flex flex-col">
          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-500 mb-4">{errorMessage}</div>
          )}

          {/* File upload container */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 h-[200px] justify-center items-center flex flex-col mb-4 ${
              dragOver
                ? "bg-gray-100 border-blue-500"
                : "bg-gray-50 border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                Drag & Drop your file here, or
              </p>
              <input
                type="file"
                accept="image/*,video/mp4,video/quicktime,image/svg+xml,image/webp,application/pdf,application/zip"
                onChange={handleFileChange}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className=" text-red px-6 py-3 rounded-full cursor-pointer text-sm"
              >
                Click to Select File
              </label>
            </div>
          </div>

          {/* Upload button */}
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-red text-white py-3 rounded-md disabled:bg-gray-300 hover:bg-hoverRed transition duration-200"
          >
            {uploading ? (
              <span className="animate-spin">⏳</span>
            ) : (
              "Upload Media"
            )}
          </button>
        </div>

        {/* Display uploaded media */}
        {uploadedFileUrl && (
          <div className="w-full max-w-[50%]">
            <h2 className="text-xl font-semibold">Uploaded Media</h2>
            {file && file.type.startsWith("image") ? (
              <img
                // src={uploadedFileUrl}
                src={`https://lionfish-app-98urn.ondigitalocean.app${uploadedFileUrl}` }
                alt="Uploaded Media"
                className="mt-4 rounded-lg max-w-full h-auto"
              />
            ) : file && file.type.startsWith("video") ? (
              <video controls className="mt-4 rounded-lg max-w-full">
                <source
                  // src={uploadedFileUrl}
                src={`https://lionfish-app-98urn.ondigitalocean.app${uploadedFileUrl}` }

                  type={file.type}
                />
                Your browser does not support the video tag.
              </video>
            ) : file && file.type === "application/pdf" ? (
              <a
                href={uploadedFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-4"
              >
                View PDF
              </a>
            ) : file && file.type === "application/zip" ? (
              <a
                href={uploadedFileUrl}
                download
                className="text-blue-500 underline mt-4"
              >
                Download ZIP File
              </a>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadMediaPage;


export const BulkUploadMediaPage = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedFilesUrls, setUploadedFilesUrls] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [dragOver, setDragOver] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    setErrorMessage(""); // Reset error message when new files are selected
    setFiles([...selectedFiles]);
  };

  // Handle drag over
  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  // Handle drop
  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const droppedFiles = event.dataTransfer.files;
    setFiles([...droppedFiles]);
  };

  // Upload files to Strapi
  const handleUpload = async () => {
    if (files.length === 0) {
      setErrorMessage("Please select files");
      return;
    }

    setUploading(true);
    setErrorMessage(""); // Reset error message on upload

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload the files");
      }

      const data = await response.json();
      console.log("Uploaded files data:", data);

      // Extract the file URLs from the response and store them
      const uploadedFileUrls = data.map((file) => file.url);
      setUploadedFilesUrls(uploadedFileUrls);
    } catch (error) {
      console.error("Error uploading files", error);
      setErrorMessage("An error occurred while uploading the files.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        Upload Multiple Media (Images, Videos, PDFs, ZIP)
      </h1>

      {/* Error Message */}
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      <div className="w-full flex items-start gap-2 justify-start">
        <div className="w-full min-w-[50%] flex flex-col">
          {/* File upload container */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 h-[200px] justify-center items-center flex flex-col mb-4 ${
              dragOver ? "bg-gray-100 border-blue-500" : "bg-gray-50 border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                Drag & Drop your files here, or
              </p>
              <input
                type="file"
                accept="image/*,video/mp4,video/quicktime,image/svg+xml,image/webp,application/pdf,application/zip"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="text-red px-6 py-3 rounded-full cursor-pointer text-sm"
              >
                Click to Select Files
              </label>
            </div>
          </div>

          {/* Upload button */}
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-red text-white py-3 rounded-md disabled:bg-gray-300 hover:bg-hoverRed transition duration-200"
          >
            {uploading ? (
              <span className="animate-spin">⏳</span>
            ) : (
              "Upload Media"
            )}
          </button>
        </div>

        {/* Display uploaded media */}
        {uploadedFilesUrls.length > 0 && (
          <div className="w-full overflow-y-scroll max-h-[600px] max-w-[50%]">
            <h2 className="text-xl font-semibold">Uploaded Media</h2>
            {uploadedFilesUrls.map((url, index) => {
              const file = files[index]; // Get the corresponding file for the URL
              return (
                <div key={index} className="mt-4">
                  {file.type.startsWith("image") && (
                    <img
                      src={`https://lionfish-app-98urn.ondigitalocean.app${url}`}
                      alt="Uploaded Media"
                      className="rounded-lg max-w-full h-auto"
                    />
                  )}
                  {file.type.startsWith("video") && (
                    <video controls className="rounded-lg max-w-full">
                      <source
                        src={`https://lionfish-app-98urn.ondigitalocean.app${url}`}
                        type={file.type}
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {file.type === "application/pdf" && (
                    <a
                      href={`https://lionfish-app-98urn.ondigitalocean.app${url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View PDF
                    </a>
                  )}
                  {file.type === "application/zip" && (
                    <a
                      href={`https://lionfish-app-98urn.ondigitalocean.app${url}`}
                      download
                      className="text-blue-500 underline"
                    >
                      Download ZIP File
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};