import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Layout from "../components/Layout";
import EmployeeForm from "../components/employees/EmployeeForm";
import EmployeeTable from "../components/employees/EmployeeTable";
import SearchBar from "../components/employees/SearchBar";
import Pagination from "../components/employees/Pagination";
import api from "../services/api";
import { FaPlus } from "react-icons/fa";
import confirmDelete from "../utils/confirmDelete";
import Loader from "../components/Loader";

import "../assets/styles/employee.css";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);

  // ------------- FETCH EMPLOYEE ------------//
  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(`/employees?page=${page}`);
      setEmployees(data.employee);
      setTotalPages(1);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [page]);

  // ------------- DELETE EMPLOYEE ------------//
  const handleDelete = async (id) => {
    const confirmed = await confirmDelete("Delete Employee?");

    if (!confirmed) return;

    try {
      await api.delete(`/employees/${id}`);
      toast.success("Employee Deleted Successfully");
      fetchEmployees();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // ------------- EDIT EMPLOYEE ------------//
  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  // ------------- CLEAR SECTION ------------//
  const clearSelection = () => {
    setSelectedEmployee(null);
    setShowForm(false);
  };

  const filteredEmployees = (employees || []).filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Layout>
      <div className="page-header">
        <div>
          <h1>Employees Management</h1>
          <p>Manage all employees of your organization.</p>
        </div>
      </div>

      <div className="employee-toolbar">
        <SearchBar search={search} setSearch={setSearch} />

        <button
          className="add-employee-btn"
          onClick={() => {
            setSelectedEmployee(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? (
            "✖ Close Form"
          ) : (
            <>
              <FaPlus />
              <span>Add Employee</span>
            </>
          )}
        </button>
      </div>

      {showForm && (
        <EmployeeForm
          selectedEmployee={selectedEmployee}
          fetchEmployees={fetchEmployees}
          clearSelection={clearSelection}
        />
      )}

      {loading ? (
        <Loader text="Loading Employees..." />
      ) : (
        <EmployeeTable
          employees={filteredEmployees}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </Layout>
  );
};

export default Employees;
