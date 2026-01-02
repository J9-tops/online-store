"use client";

import { useState } from "react";
import { X, Info } from "lucide-react";

const DemoCredentials = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isExpanded ? (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80 animate-in slide-in-from-bottom-2">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-500" />
              Demo Credentials
            </h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="font-medium text-blue-800">Admin Account</p>
              <p className="text-blue-600">admin@gmail.com</p>
              <p className="text-gray-500 text-xs mt-1">Full dashboard access</p>
            </div>
            
            <div className="bg-green-50 p-3 rounded-md">
              <p className="font-medium text-green-800">Vendor Account</p>
              <p className="text-green-600">vendor@gmail.com</p>
              <p className="text-gray-500 text-xs mt-1">Product & sales management</p>
            </div>
            
            <p className="text-gray-500 text-xs text-center">
              Password: <code className="bg-gray-100 px-1 rounded">password123</code>
            </p>
          </div>
          
          <button
            onClick={() => setIsExpanded(false)}
            className="mt-3 w-full text-xs text-gray-500 hover:text-gray-700"
          >
            Minimize
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all hover:scale-105"
          title="View demo credentials"
        >
          <Info className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default DemoCredentials;
