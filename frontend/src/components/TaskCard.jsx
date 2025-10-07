import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { RiDragMove2Fill } from "react-icons/ri";
import api from "../api/api";
import TaskModal from "./TaskModal";

export default function TaskCard({
  task,
  dragListeners,
  dragAttributes,
  disabled,
  onTaskUpdated,
  onTaskDeleted,
}) {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  const canEdit =
    user && (user._id === task.createdBy._id || user.role === "admin");

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${task._id}`);
      if (onTaskDeleted) onTaskDeleted(task._id);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete task");
    }
  };

  return (
    <div className="relative bg-gray-800 border border-gray-700 rounded shadow hover:border-cyan-600 transition duration-200 select-none">
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-lg font-semibold text-cyan-600">{task.title}</h4>

          {!disabled && (
            <button
              {...dragListeners}
              {...dragAttributes}
              className="cursor-grab text-gray-400 hover:text-cyan-400 active:cursor-grabbing transition"
              title="Drag"
            >
              <RiDragMove2Fill size={18} />
            </button>
          )}
        </div>

        <p className="text-sm text-gray-300 mb-2">{task.description}</p>
        <small className="text-xs text-gray-500">
          By: <span className="text-gray-400">{task.createdBy.username}</span>
        </small>
      </div>

      {canEdit && (
        <div className="flex gap-4 px-4 py-2 border-t border-gray-700">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="text-cyan-500 hover:text-cyan-400 transition text-xs"
            title="Edit"
          >
            Update
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="text-red-500 hover:text-red-400 transition text-xs"
            title="Delete"
          >
            Delete
          </button>
        </div>
      )}

      {isEditing && (
        <TaskModal
          task={task}
          onClose={() => setIsEditing(false)}
          onTaskUpdated={onTaskUpdated}
        />
      )}
    </div>
  );
}
