import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://5197hw05bi.execute-api.ap-south-1.amazonaws.com/prod";

function App() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    salary: ""
  });

  const [editId, setEditId] = useState(null);

  // Fetch employees
  const fetchEmployees = async () => {
    const res = await axios.get(`${API_URL}/employees`);
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update employee
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`${API_URL}/employees/${editId}`, formData);
      setEditId(null);
    } else {
      await axios.post(`${API_URL}/employees`, formData);
    }

    setFormData({ name: "", email: "", role: "", salary: "" });
    fetchEmployees();
  };

  // Delete employee
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/employees/${id}`);
    fetchEmployees();
  };

  // Edit employee
  const handleEdit = (emp) => {
    setEditId(emp[0]);
    setFormData({
      name: emp[1],
      email: emp[2],
      role: emp[3],
      salary: emp[4]
    });
  };

  const formatSalary = (val) => {
    const num = Number(val);
    if (isNaN(num)) return val;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Employee Hub</h1>
        <p>Manage your team · React + Oracle</p>
      </header>

      <section className="card">
        <h2 className="card-title">
          {editId ? "Edit employee" : "Add new employee"}
          {editId && <span className="edit-badge">Editing</span>}
        </h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="e.g. Jane Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="jane@company.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input
              id="role"
              type="text"
              name="role"
              placeholder="e.g. Developer"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="salary">Salary</label>
            <input
              id="salary"
              type="number"
              name="salary"
              placeholder="0"
              value={formData.salary}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editId ? "Update" : "Add"} employee
            </button>
          </div>
        </form>
      </section>

      <section className="card">
        <h2 className="card-title">All employees</h2>
        <div className="table-wrap">
          {employees.length === 0 ? (
            <div className="empty-state">
              <p>No employees yet.</p>
              <p>Add one using the form above.</p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp[0]}>
                    <td className="cell-id">{emp[0]}</td>
                    <td>{emp[1]}</td>
                    <td>{emp[2]}</td>
                    <td>{emp[3]}</td>
                    <td className="cell-salary">{formatSalary(emp[4])}</td>
                    <td>
                      <div className="cell-actions">
                        <button
                          type="button"
                          className="btn btn-edit"
                          onClick={() => handleEdit(emp)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-delete"
                          onClick={() => handleDelete(emp[0])}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
