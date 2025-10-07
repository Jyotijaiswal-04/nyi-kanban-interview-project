import { useDroppable } from "@dnd-kit/core";
import SortableTask from "./SortableTask";

export default function Column({
  id,
  title,
  tasks,
  user,
  onTaskUpdated,
  onTaskDeleted,
}) {
  const { setNodeRef } = useDroppable({ id });

  const bgColorMap = {
    "To Do": "bg-orange-600",
    "In Progress": "bg-cyan-600",
    Done: "bg-green-600",
  };

  return (
    <div
      ref={setNodeRef}
      id={id}
      className="flex-1 bg-gray-900 rounded-md shadow-md min-h-[calc(100vh_-_150px)]"
    >
      <h3
        className={`${
          bgColorMap[title] || "bg-gray-900"
        } text-white font-semibold text-lg px-4 py-3 rounded-t-md border-b border-gray-700`}
      >
        {title}
      </h3>

      <div className="space-y-3 p-4">
        {tasks.map((task) => (
          <SortableTask
            key={task._id}
            id={task._id}
            task={task}
            disabled={task.createdBy._id !== user._id && user.role !== "admin"}
            onTaskUpdated={onTaskUpdated}
            onTaskDeleted={onTaskDeleted}
          />
        ))}
      </div>
    </div>
  );
}
