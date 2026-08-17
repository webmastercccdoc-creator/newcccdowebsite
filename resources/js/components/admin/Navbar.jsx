import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import axios from 'axios';

export default function Navbar() {
  const { auth } = usePage().props;

  return (
    <nav className="mb-6 bg-white px-6 py-4 border-x-0 border-t-0 border-b border-gray-200 shadow-sm h-20">
      <div className="flex items-center justify-between h-full">
        {/* Left side - Brand/Logo */}
        <div className="flex items-center gap-3">
          <div>
            <span className="font-semibold text-gray-800 text-lg">Content Management System</span>
            <span className="hidden sm:inline ml-2 text-xs text-gray-500 font-medium">
              v2.0
            </span>
          </div>
        </div>

        {/* Right side - Empty or you can add other actions here */}
        <div className="flex items-center gap-3">
          {/* You can add other header actions here if needed */}
        </div>
      </div>
    </nav>
  );
}