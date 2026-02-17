const express = require("express");
const cors = require("cors");
const oracledb = require("oracledb");

const app = express();
app.use(cors());
app.use(express.json());

// Oracle DB connection config
const dbConfig = {
  user: "system",
  password: "123456",
  connectString: "localhost:1521/XE"
};

// Test API
app.get("/", (req, res) => {
  res.send("Oracle CRUD Backend Running...");
});

// GET all employees
app.get("/employees", async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      "SELECT * FROM employees ORDER BY emp_id"
    );

    await connection.close();

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add employee
app.post("/employees", async (req, res) => {
  const { name, email, role, salary } = req.body;

  try {
    const connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `INSERT INTO employees (name, email, role, salary)
       VALUES (:name, :email, :role, :salary)`,
      { name, email, role, salary },
      { autoCommit: true }
    );

    await connection.close();
    res.json({ message: "Employee Added Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update employee
app.put("/employees/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, role, salary } = req.body;

  try {
    const connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `UPDATE employees 
       SET name=:name, email=:email, role=:role, salary=:salary
       WHERE emp_id=:id`,
      { id, name, email, role, salary },
      { autoCommit: true }
    );

    await connection.close();
    res.json({ message: "Employee Updated Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE employee
app.delete("/employees/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      "DELETE FROM employees WHERE emp_id=:id",
      { id },
      { autoCommit: true }
    );

    await connection.close();
    res.json({ message: "Employee Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export app for Lambda handler (lambda.js)
module.exports = { app };

// Start server only when not running in AWS Lambda
if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
