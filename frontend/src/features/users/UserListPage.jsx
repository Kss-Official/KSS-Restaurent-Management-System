import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import { User, Eye } from 'lucide-react';

export const UserListPage = () => {
  const users = [
    { id: 'usr-1', name: 'Sophia Montgomery', email: 'customer@auramocha.com', role: 'Customer', phone: '+1 (555) 392-8819' },
    { id: 'usr-2', name: 'Arthur Pendelton', email: 'admin@auramocha.com', role: 'Admin', phone: '+1 (555) 800-4499' },
    { id: 'usr-3', name: 'Marco Pierre', email: 'kitchen@auramocha.com', role: 'Kitchen Staff', phone: '+1 (555) 777-2211' },
    { id: 'usr-4', name: 'Elena Rostova', email: 'reception@auramocha.com', role: 'Receptionist', phone: '+1 (555) 444-1234' },
    { id: 'usr-5', name: 'Julian Vance', email: 'waiter@auramocha.com', role: 'Waiter Staff', phone: '+1 (555) 666-8921' },
  ];

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6">
      <div className="bg-white rounded-3xl p-8 border border-[#E8DDD8] shadow-md space-y-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#2D2528]">System Users Directory</h2>
          <p className="text-xs text-[#873C50]">List of all registered customers and staff members across the restaurant.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#FAF7F5] text-[#873C50] uppercase text-xs">
                <th className="py-3 px-2">Name</th>
                <th className="py-3 px-2">Email</th>
                <th className="py-3 px-2">Role</th>
                <th className="py-3 px-2">Phone</th>
                <th className="py-3 px-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FAF7F5]">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-[#F4EDE8]">
                  <td className="py-3 px-2 font-bold text-[#2D2528]">{u.name}</td>
                  <td className="py-3 px-2 text-[#75696B]">{u.email}</td>
                  <td className="py-3 px-2 font-semibold text-[#873C50]">{u.role}</td>
                  <td className="py-3 px-2 text-[#75696B]">{u.phone}</td>
                  <td className="py-3 px-2">
                    <Link to={`/users/${u.id}`}>
                      <Button variant="outline" size="sm" icon={Eye}>View</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserListPage;
