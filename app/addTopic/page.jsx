'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and description are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      if (res.ok) {
        router.push('/');
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 bg-gradient-to-r from-green-100 to-green-200 border border-green-300 rounded-xl shadow-lg max-w-lg mx-auto mt-10 transition-transform transform hover:scale-105">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Add New Topic</h2>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-green-400 p-3 rounded-lg focus:ring focus:ring-green-300"
        type="text"
        placeholder="Topic Title"
      />
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-green-400 p-3 rounded-lg focus:ring focus:ring-green-300"
        placeholder="Topic Description"
      />
      <button
        type="submit"
        className="bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-green-700 transition duration-300"
      >
        Add Topic
      </button>
    </form>
  );
}
