'use client';


import EditTopicForm from "@/components/EditTopicForm";
import { useRouter } from "next/navigation";


const getTopicById = async (id) => {
    const router = useRouter();

  try {
    const res = await fetch(`https://topic-hub-crud-application-jpw2.vercel.app/api/topics/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
  if (res.ok) {
    router.refresh();
  }

}

export default async function EditTopic({ params }) {
  const { id } = params;
  const { topic } = await getTopicById(id);
  const { title, description } = topic;
  console.log("id: ", id);
  return (
    <EditTopicForm id={id} title={title} description={description} />
  );
}
