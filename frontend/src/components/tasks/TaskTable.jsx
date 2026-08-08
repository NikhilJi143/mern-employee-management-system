import { FaEdit, FaTrash } from "react-icons/fa";
import EmptyState from "../EmptyState";

const getStatusClass = (status) => {
  switch (status) {
    case "Completed":
      return "status-badge completed";

    case "In Progress":
      return "status-badge progress";

    default:
      return "status-badge pending";
  }
};

const TaskTable = ({ tasks, handleEdit, handleDelete }) => {
  return (
    <div className="table-container">
      <table className="task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="4" className="no-data">
                <EmptyState
                  icon="📋"
                  title="No Tasks Found"
                  subtitle="Create your first task."
                />
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task._id}>
                {/* Task */}
                <td>
                  <div className="task-info">
                    <div className="task-icon">📋</div>

                    <div>
                      <div className="task-title">{task.title}</div>

                      <small className="task-description">
                        {task.description}
                      </small>
                    </div>
                  </div>
                </td>

                {/* Employee */}
                <td>
                  {task.assignedTo ? (
                    <div className="employee-info">
                      <div className="employee-avatar">
                        {task.assignedTo.name.charAt(0).toUpperCase()}
                      </div>

                      <span>{task.assignedTo.name}</span>
                    </div>
                  ) : (
                    <span className="not-assigned">Not Assigned</span>
                  )}
                </td>

                {/* Status */}
                <td>
                  <span className={getStatusClass(task.status)}>
                    {task.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="action-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(task)}
                    title="Edit Task"
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(task._id)}
                    title="Delete Task"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
