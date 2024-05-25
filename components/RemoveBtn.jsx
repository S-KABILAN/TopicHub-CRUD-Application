'use client';

import { HiOutlineTrash } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

export default function RemoveBtn({ id }) {
  const router = useRouter();

  const removeTopic = async () => {
    const confirmed = confirm('Are you sure?');
    if (confirmed) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <button
      onClick={removeTopic}
      className="bg-red-500 text-white p-2 rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
    >
      <HiOutlineTrash size={24} />
    </button>
  );
}
