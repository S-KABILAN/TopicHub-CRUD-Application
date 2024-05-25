'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics/${id}`, {
        method: 'PUT',
        headers: {
          "Content-type": 'application/json'
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 bg-gradient-to-r from-green-100 to-green-200 border border-green-300 rounded-xl shadow-lg max-w-lg mx-auto mt-10 transition-transform transform hover:scale-105">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Edit Topic</h2>
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-green-400 p-3 rounded-lg focus:ring focus:ring-green-300"
        type="text"
        placeholder="Topic Title"
      />
      <textarea
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-green-400 p-3 rounded-lg focus:ring focus:ring-green-300"
        placeholder="Topic Description"
      />
      <button
        type="submit"
        className="bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-green-700 transition duration-300"
      >
        Update Topic
      </button>
    </form>
  );
}
