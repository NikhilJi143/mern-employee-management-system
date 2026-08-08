import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import { getErrorMessage } from "../../utils/errorHandler";

const initialState = {
  title: "",
  description: "",
  assignedTo: "",
  status: "Pending",
};

const TaskForm = ({ selectedTask, employees, fetchTasks, clearSelection }) => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedTask) {
      setFormData({
        title: selectedTask.title,
        description: selectedTask.description,
        assignedTo: selectedTask.assignedTo._id || "",
        status: selectedTask.status,
      });
    } else {
      setFormData(initialState);
    }
  }, [selectedTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.assignedTo) {
      return toast.error("Title and Employee required");
    }

    try {
      setLoading(true);
      if (selectedTask) {
        await api.put(`/tasks/${selectedTask._id}`, formData);
        toast.success("Task Updated");
      } else {
        const response = await api.post("/tasks", formData);
        toast.success("Task Added");
      }
      fetchTasks();
      clearSelection();
      setFormData(initialState);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2 className="form-title">
        {selectedTask ? "Update Task" : "Create New Task"}
      </h2>

      <div className="form-grid">
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
        />

        <select
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
        >
          <option value="">Select Employee</option>

          {(employees || []).map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>

        <textarea
          className="task-description-input"
          name="description"
          placeholder="Task Description..."
          value={formData.description}
          onChange={handleChange}
        />

        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="form-buttons">
        <button type="submit" className="save-btn" disabled={loading}>
          {loading ? "Saving..." : selectedTask ? "Update Task" : "Create Task"}
        </button>

        <button
          type="button"
          className="cancel-btn"
          onClick={() => {
            clearSelection();
            setFormData(initialState);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
