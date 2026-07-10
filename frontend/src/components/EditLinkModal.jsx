import { useEffect, useState } from "react";
import { updateLink } from "../services/linkService";
import toast from "react-hot-toast";

const EditLinkModal = ({ open, onClose, link, onSuccess }) => {

  const [form, setForm] = useState({});

  useEffect(() => {

    if (link) {

      setForm({
        title: link.title,
        originalUrl: link.originalUrl,
        customAlias: link.customAlias || "",
        expiresAt: link.expiresAt
          ? link.expiresAt.substring(0, 10)
          : "",
      });

    }

  }, [link]);

  if (!open || !link) return null;

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async () => {

    try {

      await updateLink(link.id, form);

      toast.success("Link Updated");

      onSuccess();

      onClose();

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Update failed"
      );

    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-xl p-6 w-[500px]">

        <h2 className="text-2xl font-bold mb-5">
          Edit Link
        </h2>

        <input
          className="border p-3 w-full mb-3 rounded"
          name="title"
          value={form.title || ""}
          onChange={handleChange}
        />

        <input
          className="border p-3 w-full mb-3 rounded"
          name="originalUrl"
          value={form.originalUrl || ""}
          onChange={handleChange}
        />

        <input
          className="border p-3 w-full mb-3 rounded"
          name="customAlias"
          value={form.customAlias || ""}
          onChange={handleChange}
        />

        <input
          className="border p-3 w-full mb-5 rounded"
          type="date"
          name="expiresAt"
          value={form.expiresAt || ""}
          onChange={handleChange}
        />

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-5 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-5 py-2 rounded"
          >
            Update
          </button>

        </div>

      </div>

    </div>
  );
};

export default EditLinkModal;