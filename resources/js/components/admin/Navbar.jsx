import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import axios from 'axios';

export default function Navbar() {
  const { auth } = usePage().props;

  return (
    <nav className="mb-6 bg-white px-6 py-4 border-x-0 border-t-0 border-b border-gray-200 shadow-sm h-20">
      <div className="flex items-center justify-between h-full">
        {/* Left side - Empty or Logo */}
        <div className="flex items-center gap-3">
          {/* You can add a logo here if needed */}
        </div>

        {/* Right side - Brand and Version */}
        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-800 text-lg">Content Management System</span>
          <span className="text-xs text-gray-500 font-medium">
            v2.0
          </span>
        </div>
      </div>
    </nav>
  );
}