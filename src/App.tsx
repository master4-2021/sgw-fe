import React, { useState } from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm, { Employee } from "./components/EmployeeForm";
import Notification from "./components/Notification";

const App: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleNotify = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
  };

  const handleNotificationClose = () => {
    setNotification(null);
  };

  const onSelectEmployee = (employee: Employee | null) => {
    setSelectedEmployee(employee);
    setShowForm(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">
        Employee Management System
      </h1>
      {showForm && (
        <EmployeeForm
          employee={selectedEmployee as Employee}
          onClose={handleToggleForm}
          notify={handleNotify}
        />
      )}
      <EmployeeList onSelectEmployee={onSelectEmployee} />
      {notification && (
        <Notification
          message={notification?.message}
          onClose={handleNotificationClose}
          type={notification?.type}
        />
      )}
    </div>
  );
};

export default App;
