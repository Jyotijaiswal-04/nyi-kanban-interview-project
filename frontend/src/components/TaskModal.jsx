import { useState } from "react";
import api from "../api/api";

export default function TaskModal({ task, onClose, onTaskUpdated }) {
  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.put(`/tasks/${task._id}`, form);
      console.log(res.data);

      onTaskUpdated(res.data);
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white rounded-xl shadow-2xl w-[350px] p-6">
        <h3 className="text-2xl font-semibold mb-4 text-center text-cyan-400">
          Edit Task
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-md px-3 py-2 bg-gray-800 border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-md px-3 py-2 bg-gray-800 border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-md px-3 py-2 bg-gray-800 border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md font-medium bg-cyan-600 hover:bg-cyan-700 transition disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Task"}
          </button>
        </form>

        <button
          onClick={onClose}
          className="w-full mt-3 py-2 rounded-md font-medium bg-gray-700 hover:bg-gray-600 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
