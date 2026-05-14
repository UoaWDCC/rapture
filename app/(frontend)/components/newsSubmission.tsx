"use client";

import React, { useState } from "react";
import Image from "next/image";

interface NewsSubmissionProps {
  isAdmin?: boolean;
}

export default function NewsSubmission({ isAdmin = false }: NewsSubmissionProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      setSuccess(false);
      return;
    }
    
    setError("");
    setSuccess(true);
    console.log("Submitted:", { title, description, image });

    setTitle("");
    setDescription("");
    setImage(null);
    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-red-50 border border-red-200 rounded-md text-center">
        <p className="text-red-600 font-semibold">Access Denied: Only admin users have access to perform this action.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-2xl font-bold">Submit News</h1>

        {error && <p className="text-red-500 font-medium">{error}</p>}
        {success && <p className="text-green-600 font-medium">News submitted successfully!</p>}

        <div className="flex flex-col space-y-2">
          <label htmlFor="title" className="font-semibold">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the news title..."
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="description" className="font-semibold">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the news description..."
            rows={4}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="image" className="font-semibold">Image (Optional)</label>
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="Preview"
              width={500}
              height={500}
              className="w-full h-auto max-h-96 object-contain rounded-md border border-gray-300 mb-2 bg-gray-50" />
          ) : (
            <div className="w-full h-48 bg-gray-100 border-2 border-dashed border-gray-400 rounded-md flex items-center justify-center mb-2">
              <span className="text-gray-500">No Image Selected</span>
            </div>
          )}
          <input
            id="image"
            type="file"
            accept="image/*" 
            onChange={handleImageChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 text-gray-700"
          />
        </div>

        <button 
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
