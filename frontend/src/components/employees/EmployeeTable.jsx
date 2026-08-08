import { FaEdit, FaTrash } from "react-icons/fa";
import EmptyState from "../EmptyState";

const EmployeeTable = ({ employees, handleEdit, handleDelete }) => {
  const getDepartmentClass = (department) => {
    switch (department) {
      case "IT":
        return "department-badge it";

      case "HR":
        return "department-badge hr";

      case "Finance":
        return "department-badge finance";

      case "Marketing":
        return "department-badge marketing";

      case "Sales":
        return "department-badge sales";

      default:
        return "department-badge";
    }
  };

  return (
    <div className="table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="5">
                <EmptyState
                  icon="👨‍💼"
                  title="No Employees Found"
                  subtitle="Start by adding your first employee."
                />
              </td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee._id}>
                {/* Employee */}
                <td>
                  <div className="employee-info">
                    <div className="employee-avatar">
                      {employee.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="employee-details">
                      <span className="employee-name">{employee.name}</span>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td>{employee.email}</td>

                {/* Department */}
                <td>
                  <span className={getDepartmentClass(employee.department)}>
                    {employee.department}
                  </span>
                </td>

                {/* Salary */}
                <td className="salary-cell">
                  ₹ {employee.salary.toLocaleString("en-IN")}
                </td>

                {/* Actions */}
                <td className="action-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(employee)}
                    title="Edit Employee"
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(employee._id)}
                    title="Delete Employee"
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

export default EmployeeTable;
