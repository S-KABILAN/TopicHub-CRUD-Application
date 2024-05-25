import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
    return { topics: [] };
  }
};

export default async function TopicsList() {
  const { topics } = await getTopics();

  if (!topics || topics.length === 0) {
    return <p>No topics available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {topics.map((t) => (
        <div
          key={t._id}
          className="p-6 border border-gray-200 rounded-xl shadow-lg bg-gradient-to-r from-purple-100 to-purple-300 transition-transform transform hover:scale-105"
        >
          <div className="mb-4">
            <h2 className="font-bold text-2xl text-purple-900 mb-2">{t.title}</h2>
            <p className="text-purple-700">{t.description}</p>
          </div>
          <div className="flex justify-end gap-3">
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`} className="text-purple-600 hover:text-purple-800 transition duration-300">
               
                <HiPencilAlt size={24} />
              
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
