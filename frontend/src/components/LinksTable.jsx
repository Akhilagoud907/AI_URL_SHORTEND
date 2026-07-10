import { Link } from "react-router-dom";
import {
  FaCopy,
  FaEdit,
  FaTrash,
  FaChartBar,
  FaPowerOff,
  FaExternalLinkAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

const LinksTable = ({
  links,
  onDelete,
  onToggle,
  onEdit,
}) => {
  const copyLink = (shortCode) => {
  const shortUrl = `${import.meta.env.VITE_API_URL}/links/r/${shortCode}`;

  navigator.clipboard.writeText(shortUrl);
  toast.success("Short URL Copied!");
};

  if (links.length === 0) {
    return (
      <div className="mt-8 bg-white rounded-2xl shadow-md p-16 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png"
          alt="empty"
          className="w-28 mx-auto mb-4 opacity-70"
        />

        <h2 className="text-2xl font-semibold text-gray-700">
          No Links Found
        </h2>

        <p className="text-gray-500 mt-2">
          Create your first short URL to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow mt-8 overflow-x-auto">

      <table className="min-w-[1100px] w-full">

        <thead className="bg-gray-100">

          <tr className="text-gray-700">

            <th className="px-6 py-4 text-left font-semibold">
              Title
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Original URL
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              Short URL
            </th>

            <th className="px-6 py-4 text-center font-semibold">
              Status
            </th>

            <th className="px-6 py-4 text-center font-semibold">
              Clicks
            </th>

            <th className="px-6 py-4 text-center font-semibold">
              Created
            </th>

            <th className="px-6 py-4 text-center font-semibold w-72">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {links.map((link) => (

            <tr
              key={link.id}
              className="border-t hover:bg-blue-50 transition-all duration-200"
            >

              {/* Title */}

              <td className="px-6 py-4 font-semibold text-gray-800 max-w-[180px] truncate">
                {link.title}
              </td>

              {/* Original URL */}

              <td className="px-6 py-4 max-w-xs truncate text-gray-600">

                <a
                  href={link.originalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-600 flex items-center gap-2"
                >
                  {link.originalUrl}

                  <FaExternalLinkAlt
                    size={12}
                    className="text-gray-400"
                  />

                </a>

              </td>

              {/* Short URL */}

              <td className="px-6 py-4">
                <a href={`${import.meta.env.VITE_API_URL}/links/r/${link.shortCode}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition"
                >
                  🔗 {link.customAlias || link.shortCode}
                </a>
              </td>

              {/* Status */}

              <td className="px-6 py-4 text-center">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors duration-200 ${
                    link.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {link.isActive ? "Active" : "Disabled"}
                </span>

              </td>

              {/* Clicks */}

              <td className="px-6 py-4 text-center font-semibold">
                {link.clickCount}
              </td>

              {/* Created */}

              <td className="px-6 py-4 text-center text-gray-600">
                {new Date(link.createdAt).toLocaleDateString()}
              </td>

              {/* Actions */}

              <td className="px-6 py-4 w-72">

                <div  className="flex items-center justify-center gap-2">

                  <button
                    onClick={() => copyLink(link.shortCode)}
                    className="bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 text-white p-2 rounded-lg transition"
                    title="Copy"
                  >
                    <FaCopy />
                  </button>

                  <button
                    onClick={() => onEdit(link)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-lg transition"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => onToggle(link.id)}
                    className={`${
                      link.isActive
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white p-2 rounded-lg transition`}
                    title="Toggle Status"
                  >
                    <FaPowerOff />
                  </button>

                  <button
                    onClick={() => onDelete(link.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>

                  <Link
                    to={`/analytics/${link.id}`}
                    className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-lg transition"
                    title="Analytics"
                  >
                    <FaChartBar />
                  </Link>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default LinksTable;