import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

import StatCard from "../components/StatCard";
import Loader from "../components/Loader";
import LinksTable from "../components/LinksTable";
import CreateLinkModal from "../components/CreateLinkModal";
import EditLinkModal from "../components/EditLinkModal";

import {
  getLinks,
  deleteLink,
  toggleStatus,
} from "../services/linkService";

import {
  FaLink,
  FaCheckCircle,
  FaClock,
  FaMousePointer,
  FaPlus,
  FaSearch,
} from "react-icons/fa";

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);

  // Dashboard Stats
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await api.get("/dashboard/stats");
      return res.data;
    },
  });

  // Links
  const { data: linksData, refetch } = useQuery({
    queryKey: ["links", page, search],
    queryFn: () => getLinks(page, search),
  });

  if (isLoading) return <Loader />;

  const stats = data.stats;

  const handleDelete = async (id) => {
    await deleteLink(id);
    refetch();
  };

  const handleToggle = async (id) => {
    await toggleStatus(id);
    refetch();
  };

  const handleEdit = (link) => {
    setSelectedLink(link);
    setOpenEdit(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            URL Dashboard
          </h1>

          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Manage, monitor and analyze all your shortened URLs.
          </p>
        </div>

        <button
          onClick={() => setOpenCreate(true)}
          className="mt-5 md:mt-0 w-full md:w-auto justify-center flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl shadow-lg transition"
        >
          <FaPlus />
          Create Link
        </button>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Total Links"
          value={stats.totalLinks}
          color="bg-blue-600"
          icon={<FaLink />}
        />

        <StatCard
          title="Active Links"
          value={stats.activeLinks}
          color="bg-green-600"
          icon={<FaCheckCircle />}
        />

        <StatCard
          title="Expired Links"
          value={stats.expiredLinks}
          color="bg-red-600"
          icon={<FaClock />}
        />

        <StatCard
          title="Total Clicks"
          value={stats.totalClicks}
          color="bg-purple-600"
          icon={<FaMousePointer />}
        />

      </div>

      {/* Search */}

      <div className="mt-8 flex justify-center md:justify-end">

        <div className="relative w-full md:w-96">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search title or URL..."
            className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>

      {/* Table */}

      <div className="mt-8">
        <LinksTable
          links={linksData?.data || []}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onEdit={handleEdit}
        />
      </div>

      {/* Pagination */}

      <div className="flex flex-wrap justify-center items-center gap-4 mt-8">

        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="bg-white border hover:bg-gray-100 px-5 py-2 rounded-lg shadow disabled:opacity-40"
        >
          Previous
        </button>

        <span className="font-semibold text-gray-700">
          Page {page}
        </span>

        <button
          disabled={page >= (linksData?.totalPages || 1)}
          onClick={() => setPage(page + 1)}
          className="bg-white border hover:bg-gray-100 px-5 py-2 rounded-lg shadow disabled:opacity-40"
        >
          Next
        </button>

      </div>

      {/* Create Modal */}

      <CreateLinkModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSuccess={refetch}
      />

      {/* Edit Modal */}

      <EditLinkModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        link={selectedLink}
        onSuccess={refetch}
      />

    </div>
  );
};

export default Dashboard;