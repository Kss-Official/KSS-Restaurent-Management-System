import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import { ArrowLeft, User, Mail, Phone, Shield } from 'lucide-react';

export const UserDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
      <div className="bg-white rounded-3xl p-8 border border-[#E8DDD8] shadow-md space-y-6">
        <Link to="/users" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#754D45] hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Users Directory
        </Link>

        <div className="flex items-center gap-4 border-b border-[#FAF7F5] pb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#754D45] text-white flex items-center justify-center font-serif text-2xl font-bold">
            U
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#55352F]">User Record #{id}</h2>
            <p className="text-xs text-[#754D45]">Detailed account profile and privileges</p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="p-3 bg-[#F4EDE8] rounded-xl flex items-center justify-between">
            <span className="text-[#754D45] flex items-center gap-2"><User className="w-4 h-4 text-[#754D45]" /> Access Tier:</span>
            <span className="font-bold text-[#55352F]">Verified Member</span>
          </div>
          <div className="p-3 bg-[#F4EDE8] rounded-xl flex items-center justify-between">
            <span className="text-[#754D45] flex items-center gap-2"><Mail className="w-4 h-4 text-[#754D45]" /> Status:</span>
            <span className="font-bold text-emerald-700">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
