import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/errorHandler";

import api from "../../services/api";

const initialState = {
  name: "",
  email: "",
  department: "",
  salary: "",
};

const EmployeeForm = ({ selectedEmployee, fetchEmployees, clearSelection }) => {
  const [formData, setFormData] = useState(initialState);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedEmployee) {
      setFormData({
        name: selectedEmployee.name,
        email: selectedEmployee.email,
        department: selectedEmployee.department,
        salary: selectedEmployee.salary,
      });
    } else {
      setFormData(initialState);
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.department ||
      !formData.salary
    ) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);

      if (selectedEmployee) {
        const response = await api.put(
          `/employees/${selectedEmployee._id}`,
          formData,
        );

        console.log(response.data);
        toast.success("Employee Updated");
      } else {
        await api.post("/employees", formData);

        toast.success("Employee Added");
      }

      await fetchEmployees();
      clearSelection();
      setFormData(initialState);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2 className="form-title">
        {selectedEmployee ? "Update Employee" : "Add New Employee"}
      </h2>

      <div className="form-grid">
        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />

        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
        >
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
        </select>

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
        />
      </div>

      <div className="form-buttons">
        <button type="submit" className="save-btn" disabled={loading}>
          {loading
            ? "Saving..."
            : selectedEmployee
              ? "Update Employee"
              : "Add Employee"}
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

export default EmployeeForm;
