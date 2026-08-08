import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Layout from "../components/Layout";
import TaskForm from "../components/tasks/TaskForm";
import TaskTable from "../components/tasks/TaskTable";
import TaskFilter from "../components/tasks/TaskFilter";
import api from "../services/api";
import { FaPlus } from "react-icons/fa";
import confirmDelete from "../utils/confirmDelete";
import Loader from "../components/Loader";

import "../assets/styles/task.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/tasks");
      setTasks(data.tasks);
    } catch (error) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const { data } = await api.get("/employees");
      setEmployees(data.employee);
    } catch (error) {
      toast.error("Failed to load employees");
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = await confirmDelete("Delete Task?");

    if (!confirmed) return;

    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task Deleted Successfully");
      fetchTasks();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clearSelection = () => {
    setSelectedTask(null);
    setShowForm(false);
  };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <Layout>
      <div className="page-header">
        <div>
          <h1>Task Management</h1>
          <p>Assign and manage employee tasks efficiently.</p>
        </div>
      </div>

      <div className="task-toolbar">
        <TaskFilter filter={filter} setFilter={setFilter} />

        <button
          className="add-task-btn"
          onClick={() => {
            setSelectedTask(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? (
            "✖ Close Form"
          ) : (
            <>
              <FaPlus />
              <span>Add Task</span>
            </>
          )}
        </button>
      </div>

      {showForm && (
        <TaskForm
          selectedTask={selectedTask}
          employees={employees}
          fetchTasks={fetchTasks}
          clearSelection={clearSelection}
        />
      )}

      {loading ? (
        <Loader text="Loading Tasks..."/>
      ) : (
        <TaskTable
          tasks={filteredTasks}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </Layout>
  );
};

export default Tasks;
