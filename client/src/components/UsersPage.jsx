import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2 } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./Sidebar";
import Header from './Header';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/users/getall');
        setUsers(response.data);
        setFilteredUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filterUsers = () => {
      const filtered = users.filter(user => 
        (user.role && user.role.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredUsers(filtered);
    };
  
    filterUsers();
  }, [searchTerm, users]);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/users/delete/${userId}`);
      toast.success('User deleted successfully');
      setUsers(users.filter(user => user._id !== userId));
      setFilteredUsers(filteredUsers.filter(user => user._id !== userId));
    } catch (error) {
      toast.error('Failed to delete user');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar /> 
      <div className="flex-1 p-6 "> 
      <div className="flex-1 p-6">
          {/* Header */}
          <Header title="Users" user="user" /> {/* Pass props to Header */}

        <div className="mt-6">
          {/* Users Table */}
          <div className="bg-white rounded-lg border">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4">Loading...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-red-500">{error}</td>
                  </tr>
                ) : (
                  filteredUsers.map(user => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <button onClick={() => toast.info(`Editing user ${user.name}`)}>
                          <Pencil className="w-5 h-5 text-gray-500" />
                        </button>
                        <button onClick={() => handleDeleteUser(user._id)} className="ml-2">
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <ToastContainer />
      </div>
    </div>
    </div>
  );
  
};

export default UsersPage;
