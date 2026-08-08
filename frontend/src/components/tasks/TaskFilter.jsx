import { FaFilter } from "react-icons/fa";

const TaskFilter = ({ filter, setFilter }) => {
  return (
    <div className="task-filter">
      <FaFilter className="filter-icon" />

      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All Tasks</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default TaskFilter;
