import React from "react";
import { useQuery } from "@apollo/client";
import { GET_EMPLOYEES } from "../services/graphql/queries";
import { Employee } from "./EmployeeForm";

type Props = {
  onSelectEmployee: (employee: Employee | null) => void;
};

const EmployeeList: React.FC<Props> = ({ onSelectEmployee }) => {
  const { loading, error, data } = useQuery(GET_EMPLOYEES);

  const handleCreateClick = () => {
    onSelectEmployee(null);
  };

  const handleEditClick = (employee: Employee) => {
    onSelectEmployee(employee);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Employee List</h2>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCreateClick}
        >
          Create Employee
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Position
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Salary ($)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.employees.map((employee: Employee) => (
            <tr key={employee.id}>
              <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {employee.position}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {employee.salary}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => handleEditClick(employee)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
