import React, { useState } from 'react';

interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
}

const EmployeeCRUD = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Manager' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'Developer' },
  ]);

  const [newEmployee, setNewEmployee] = useState<Employee>({
    id: 0,
    name: '',
    email: '',
    role: '',
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
    }
  };

  const handleCreateEmployee = () => {
    if (newEmployee.name && newEmployee.email && newEmployee.role) {
      setEmployees([...employees, { ...newEmployee, id: employees.length + 1 }]);
      setNewEmployee({ id: 0, name: '', email: '', role: '' });
    }
  };

  const handleUpdateEmployee = (id: number) => {
    const updatedEmployees = employees.map((employee) => {
      if (employee.id === id) {
        return { ...employee, name: newEmployee.name, email: newEmployee.email, role: newEmployee.role };
      }
      return employee;
    });
    setEmployees(updatedEmployees);
    setNewEmployee({ id: 0, name: '', email: '', role: '' });
  };

  const handleDeleteEmployee = (id: number) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="p-2 mb-2 border border-gray-400 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-2 mb-2 border border-gray-400 rounded"
        />
        <button onClick={handleLogin} className="p-2 bg-blue-500 text-white rounded">
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Employee CRUD</h1>
      <div className="flex flex-col items-center justify-center w-full">
        <input
          type="text"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
          placeholder="Name"
          className="p-2 mb-2 border border-gray-400 rounded"
        />
        <input
          type="email"
          value={newEmployee.email}
          onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
          placeholder="Email"
          className="p-2 mb-2 border border-gray-400 rounded"
        />
        <input
          type="text"
          value={newEmployee.role}
          onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
          placeholder="Role"
          className="p-2 mb-2 border border-gray-400 rounded"
        />
        <button onClick={handleCreateEmployee} className="p-2 bg-blue-500 text-white rounded">
          Create Employee
        </button>
      </div>
      <div className="flex flex-col items-center justify-center w-full mt-4">
        {employees.map((employee) => (
          <div key={employee.id} className="flex flex-col items-center justify-center w-full p-2 mb-2 border border-gray-400 rounded">
            <p className="text-lg font-bold">{employee.name}</p>
            <p className="text-lg">{employee.email}</p>
            <p className="text-lg">{employee.role}</p>
            <button
              onClick={() => setNewEmployee(employee)}
              className="p-2 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleUpdateEmployee(employee.id)}
              className="p-2 bg-green-500 text-white rounded"
            >
              Update
            </button>
            <button
              onClick={() => handleDeleteEmployee(employee.id)}
              className="p-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeCRUD;