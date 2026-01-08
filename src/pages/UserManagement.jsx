import React, { useState } from 'react';
import { mockUsers } from '../utils/mockData';
import Badge from '../components/Badge';
import Button from '../components/Button';

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [filter, setFilter] = useState('all');

  const filteredUsers = filter === 'all' ? users : users.filter(u => u.role === filter);

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case 'admin':
        return 'danger';
      case 'recruiter':
        return 'success';
      case 'jobseeker':
        return 'primary';
      default:
        return 'default';
    }
  };

  const handleBlockUser = (userId) => {
    // In a real app, this would call an API
    alert(`User ${userId} blocked (demo only)`);
  };

  const handleUnblockUser = (userId) => {
    // In a real app, this would call an API
    alert(`User ${userId} unblocked (demo only)`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">User Management</h1>
          
          {/* Filters */}
          <div className="flex space-x-2">
            <Button
              variant={filter === 'all' ? 'primary' : 'secondary'}
              onClick={() => setFilter('all')}
            >
              All Users ({users.length})
            </Button>
            <Button
              variant={filter === 'jobseeker' ? 'primary' : 'secondary'}
              onClick={() => setFilter('jobseeker')}
            >
              Job Seekers ({users.filter(u => u.role === 'jobseeker').length})
            </Button>
            <Button
              variant={filter === 'recruiter' ? 'primary' : 'secondary'}
              onClick={() => setFilter('recruiter')}
            >
              Recruiters ({users.filter(u => u.role === 'recruiter').length})
            </Button>
            <Button
              variant={filter === 'admin' ? 'primary' : 'secondary'}
              onClick={() => setFilter('admin')}
            >
              Admins ({users.filter(u => u.role === 'admin').length})
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          {user.phone && (
                            <div className="text-sm text-gray-500">{user.phone}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.location || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => alert(`View details for ${user.name}`)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        View
                      </button>
                      {user.role !== 'admin' && (
                        <>
                          <button
                            onClick={() => alert(`Edit ${user.name}`)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleBlockUser(user.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Block
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Statistics Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Most Active Job Seekers</h3>
            <div className="space-y-2">
              {users
                .filter(u => u.role === 'jobseeker')
                .slice(0, 3)
                .map(user => (
                  <div key={user.id} className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-semibold mr-2">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-gray-700">{user.name}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Top Recruiters</h3>
            <div className="space-y-2">
              {users
                .filter(u => u.role === 'recruiter')
                .slice(0, 3)
                .map(user => (
                  <div key={user.id} className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-semibold mr-2">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="text-sm text-gray-700 block">{user.name}</span>
                      {user.company && (
                        <span className="text-xs text-gray-500">{user.company}</span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Registrations</h3>
            <div className="space-y-2">
              {users
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 3)
                .map(user => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold mr-2">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-gray-700">{user.name}</span>
                    </div>
                    <Badge variant={getRoleBadgeVariant(user.role)} size="sm">
                      {user.role}
                    </Badge>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
