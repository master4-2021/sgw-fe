import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import {
  CREATE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  GET_EMPLOYEES,
} from "../services/graphql/queries";

export interface Employee {
  id: string;
  name: string;
  position: string;
  salary: number;
}

interface Props {
  employee?: Employee;
  onClose: () => void;
  notify: (message: string, type: "success" | "error") => void;
}

const EmployeeForm: React.FC<Props> = ({ employee, onClose, notify }) => {
  const [name, setName] = useState(employee ? employee.name : "");
  const [position, setPosition] = useState(employee ? employee.position : "");
  const [salary, setSalary] = useState(
    employee ? employee.salary.toString() : ""
  );

  const [createEmployee] = useMutation(CREATE_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES }],
  });

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES }],
  });

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (employee) {
        await updateEmployee({
          variables: {
            id: employee.id,
            name,
            position,
            salary: parseInt(salary),
          },
        });
        notify("Employee updated successfully.", "success");
      } else {
        await createEmployee({
          variables: {
            name,
            position,
            salary: parseInt(salary),
          },
        });
        notify("Employee created successfully.", "success");
      }
      clearForm();
      onClose(); // Close the form after create/edit
    } catch (error) {
      notify("An error occurred. Please try again.", "error");
      console.error("Error saving employee:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        if (employee) {
          await deleteEmployee({
            variables: {
              id: employee.id,
            },
          });
          notify("Employee deleted successfully.", "success");
          clearForm();
          onClose(); // Close the form after delete
        }
      } catch (error) {
        notify("An error occurred. Please try again.", "error");
        console.error("Error deleting employee:", error);
      }
    }
  };

  const clearForm = () => {
    setName("");
    setPosition("");
    setSalary("");
  };

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setPosition(employee.position);
      setSalary(employee.salary.toString());
    }
  }, [employee]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded shadow-lg w-full md:max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          {employee ? "Edit Employee" : "Create Employee"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="position"
              className="block text-sm font-medium text-gray-700"
            >
              Position
            </label>
            <input
              id="position"
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="salary"
              className="block text-sm font-medium text-gray-700"
            >
              Salary ($)
            </label>
            <input
              id="salary"
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              {employee ? "Save Changes" : "Create Employee"}
            </button>
            {employee ? (
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-2 rounded"
              >
                Delete
              </button>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
