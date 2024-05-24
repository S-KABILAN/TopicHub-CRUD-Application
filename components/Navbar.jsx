import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-gradient-to-r from-blue-800 to-purple-800 px-8 py-4 shadow-lg">
      <Link className="text-white text-2xl font-bold" href={"/"}>
        Kabilan S
      </Link>
      <Link className="bg-white text-blue-800 font-bold py-2 px-4 rounded-full shadow-lg hover:bg-gray-200 transition duration-300" href={"/addTopic"}>
        Add Topic
      </Link>
    </nav>
  );
}
