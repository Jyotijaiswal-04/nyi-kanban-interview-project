import { useState, useEffect, useContext } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import Column from "../components/Column";
import CreateTaskModal from "../components/CreateTaskModal";

export default function Board() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const columns = ["To Do", "In Progress", "Done"];
  const sensors = useSensors(useSensor(PointerSensor));

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((t) => t._id === active.id);
    if (!activeTask) return;

    if (activeTask.createdBy._id !== user._id && user.role !== "admin") return;

    const newStatus = over.id;
    console.log("Dropped into:", newStatus);

    if (!["To Do", "In Progress", "Done"].includes(newStatus)) return;
    if (newStatus === activeTask.status) return;

    const updatedTasks = tasks.map((t) =>
      t._id === activeTask._id ? { ...t, status: newStatus } : t
    );
    setTasks(updatedTasks);

    try {
      await api.put(`/tasks/${activeTask._id}`, { status: newStatus });
    } catch (err) {
      console.error(err);
      fetchTasks();
    }
  };

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Board</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          + Add Task
        </button>
      </div>

      <div className="flex gap-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {columns.map((status) => (
            <SortableContext
              key={status}
              items={tasks.filter((t) => t.status === status).map((t) => t._id)}
              strategy={rectSortingStrategy}
            >
              <Column
                id={status}
                title={status}
                tasks={tasks.filter((t) => t.status === status)}
                user={user}
                onTaskUpdated={fetchTasks}
                onTaskDeleted={fetchTasks}
              />
            </SortableContext>
          ))}
        </DndContext>
      </div>

      {showModal && (
        <CreateTaskModal
          onClose={() => setShowModal(false)}
          onCreated={fetchTasks}
        />
      )}
    </div>
  );
}
