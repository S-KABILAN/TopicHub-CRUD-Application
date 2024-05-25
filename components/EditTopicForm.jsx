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
      const res = await fetch(`https://topic-hub-crud-application-jpw2.vercel.app/api/topics/${id}`, {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white border border-gray-200 rounded-xl shadow-lg max-w-md mx-auto mt-8">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-gray-300 p-3 rounded-lg focus:ring focus:ring-indigo-200"
        type="text"
        placeholder="Topic title"
      />
      <textarea
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-gray-300 p-3 rounded-lg focus:ring focus:ring-indigo-200"
        placeholder="Topic Description"
      />
      <button className="bg-green-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-green-600 transition duration-300">
        Update Topic
      </button>
    </form>
  );
}
