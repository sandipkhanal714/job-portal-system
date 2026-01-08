import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              {/* Logo Image - Place your logo as 'logo.png' in the public folder */}
              <img 
                src="/logo.png" 
                alt="Saksham Rojgar Logo" 
                className="h-10 w-10 object-contain group-hover:scale-110 transition-transform duration-300"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div 
                className="text-2xl font-bold transition-all duration-300"
                style={{
                  backgroundImage: 'linear-gradient(to right, #45A28E, #5D99C6, #E67E22)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                SAKSHAM ROJGAR
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-primary-50"
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-primary-50"
            >
              Jobs
            </Link>

            {isAuthenticated() ? (
              <>
                {/* Job Seeker Links */}
                {user?.role === 'jobseeker' && (
                  <>
                    <Link
                      to="/profile"
                      className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/applied-jobs"
                      className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition"
                    >
                      Applied Jobs
                    </Link>
                  </>
                )}

                {/* Recruiter Links */}
                {user?.role === 'recruiter' && (
                  <>
                    <Link
                      to="/recruiter/dashboard"
                      className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/recruiter/post-job"
                      className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition"
                    >
                      Post Job
                    </Link>
                  </>
                )}

                {/* Admin Links */}
                {user?.role === 'admin' && (
                  <>
                    <Link
                      to="/admin/dashboard"
                      className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition"
                    >
                      Admin Dashboard
                    </Link>
                    <Link
                      to="/admin/users"
                      className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition"
                    >
                      Users
                    </Link>
                  </>
                )}

                {/* User Info & Logout */}
                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-300">
                  <span className="text-sm text-gray-700">
                    Hi, <span className="font-semibold">{user?.name}</span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
