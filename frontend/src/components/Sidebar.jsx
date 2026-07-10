import { Link, useLocation } from "react-router-dom";
import {
  FaChartPie,
  FaLink,
  FaGithub,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-blue-700 to-indigo-900 text-white shadow-2xl flex flex-col">

      {/* Logo */}

      <div className="p-8 border-b border-blue-500">

        <div className="flex items-center gap-3">

          <div className="bg-white text-blue-700 p-3 rounded-xl shadow-lg">

            <FaLink size={24} />

          </div>

          <div>

            <h1 className="text-2xl font-bold">
              URL Shortener
            </h1>

            <p className="text-blue-200 text-sm">
              Smart Link Dashboard
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-5 py-8">

        <Link
          to="/"
          className={`flex items-center gap-4 px-5 py-4 rounded-xl font-medium transition-all duration-300 ${
            location.pathname === "/"
              ? "bg-white text-blue-700 shadow-lg"
              : "hover:bg-blue-600 text-white"
          }`}
        >
          <FaChartPie size={20} />

          Dashboard

        </Link>

      </nav>

      {/* Footer */}

      <div className="border-t border-blue-500 p-6">

        <div className="flex items-center gap-2 text-blue-200">

          <FaGithub />

          <span className="text-sm">
            Portfolio Project
          </span>

        </div>

        <p className="text-xs text-blue-300 mt-3">
          Version 1.0.0
        </p>

        <p className="text-xs text-blue-300">
          © 2026 Akhila
        </p>

      </div>

    </aside>
  );
};

export default Sidebar;