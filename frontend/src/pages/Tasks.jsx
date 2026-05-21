import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/axios.js";
import EmptyState from "../components/EmptyState.jsx";
import Loader from "../components/Loader.jsx";
import Modal from "../components/Modal.jsx";
import TaskForm from "../forms/TaskForm.jsx";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = () => api.get("/tasks").then(({ data }) => setTasks(data.data)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const create = async (values) => {
    await api.post("/tasks", values);
    setOpen(false);
    load();
  };

  const toggleComplete = async (task) => {
    await api.put(`/tasks/${task._id}`, { status: task.status === "completed" ? "pending" : "completed" });
    load();
  };

  const remove = async (task) => {
    await api.delete(`/tasks/${task._id}`);
    load();
  };

  if (loading) return <Loader label="Loading tasks..." />;

  return (
    <div className="stack">
      <div className="page-heading">
        <div><h1>Task Planner</h1><p>Plan coding, aptitude, resume, and HR preparation work.</p></div>
        <button className="primary-button" onClick={() => setOpen(true)}><Plus size={18} />New task</button>
      </div>
      <section className="panel">
        {!tasks.length ? <EmptyState title="No tasks yet" message="Create your first placement preparation task." /> : (
          <div className="task-list">
            {tasks.map((task) => (
              <article className="task-item" key={task._id}>
                <input type="checkbox" checked={task.status === "completed"} onChange={() => toggleComplete(task)} />
                <div>
                  <strong>{task.title}</strong>
                  <p>{task.description || task.category}</p>
                </div>
                <span className={`pill ${task.priority}`}>{task.priority}</span>
                <span className="muted">{task.deadline ? new Date(task.deadline).toLocaleDateString() : "No deadline"}</span>
                <button className="icon-button" title="Delete task" onClick={() => remove(task)}><Trash2 size={17} /></button>
              </article>
            ))}
          </div>
        )}
      </section>
      <Modal open={open} title="Create Task" onClose={() => setOpen(false)}>
        <TaskForm onSubmit={create} />
      </Modal>
    </div>
  );
}
