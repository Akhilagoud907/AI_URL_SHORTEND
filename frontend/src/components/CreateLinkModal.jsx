import { useState } from "react";
import { createLink } from "../services/linkService";
import toast from "react-hot-toast";

const CreateLinkModal = ({ open, onClose, onSuccess }) => {

  const [form, setForm] = useState({
    title: "",
    originalUrl: "",
    customAlias: "",
    expiresAt: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {

    if (!form.title || !form.originalUrl) {
      toast.error("Title and URL are required");
      return;
    }

    try {

      await createLink(form);

      toast.success("Link Created");

      onSuccess();

      onClose();

      setForm({
        title: "",
        originalUrl: "",
        customAlias: "",
        expiresAt: "",
      });

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Error creating link"
      );

    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white p-6 rounded-xl w-[500px]">

        <h2 className="text-2xl font-bold mb-5">
          Create Short Link
        </h2>

        <input
          className="border p-3 w-full mb-3 rounded"
          placeholder="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <input
          className="border p-3 w-full mb-3 rounded"
          placeholder="Original URL"
          name="originalUrl"
          value={form.originalUrl}
          onChange={handleChange}
        />

        <input
          className="border p-3 w-full mb-3 rounded"
          placeholder="Custom Alias"
          name="customAlias"
          value={form.customAlias}
          onChange={handleChange}
        />

        <input
          className="border p-3 w-full mb-5 rounded"
          type="date"
          name="expiresAt"
          value={form.expiresAt}
          onChange={handleChange}
        />

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-blue-600 text-white rounded"
          >
            Create
          </button>

        </div>

      </div>

    </div>
  );
};

export default CreateLinkModal;