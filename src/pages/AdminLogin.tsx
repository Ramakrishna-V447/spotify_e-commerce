import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAppStore } from '../store';
import { Lock, LogIn } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setAdminAuthenticated, setView } = useAppStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setAdminAuthenticated(true);
      setView({ name: 'admin-dashboard', adminTab: 'dashboard' });
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-[#ff3f6c]">
          <Lock size={48} strokeWidth={1.5} />
        </div>
        <h2 className="mt-6 text-center text-3xl font-serif font-bold text-gray-900 tracking-tight">
          Admin Portal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to access the management dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 sm:rounded-lg sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm font-medium border border-red-100">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <div className="mt-1">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#ff3f6c] focus:border-[#ff3f6c] sm:text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#ff3f6c] focus:border-[#ff3f6c] sm:text-sm transition-colors"
                />
              </div>
            </div>
            
            <div className="text-xs text-gray-500 mb-4">
              Hint: Try admin / admin123
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
              >
                <LogIn size={18} className="mr-2" />
                Sign in
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <button onClick={() => setView({ name: 'home' })} className="text-sm text-gray-500 hover:text-black font-medium transition-colors">
              &larr; Back to Store
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
