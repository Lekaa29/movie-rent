import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-500 pointer-events-none ${
          menuOpen ? 'opacity-50' : 'opacity-0'
        }`}
        style={{ zIndex: 40 }}
      />

      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link 
              to="/" 
              className="text-white font-medium tracking-wider text-sm hover:opacity-70 transition-opacity duration-300"
            >
              VHS RENTAL
            </Link>

            {/* Menu Button */}
            <button 
              onClick={toggleMenu}
              className="relative px-8 py-3 rounded-full backdrop-blur-md bg-white bg-opacity-10 border border-white border-opacity-20 hover:bg-opacity-15 transition-all duration-300 group"
              style={{ minWidth: '140px' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-white text-xs uppercase tracking-wider">
                  Menu
                </span>
                <div className="flex flex-col gap-1.5 ml-6">
                  <span 
                    className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                      menuOpen ? 'translate-y-1' : 'group-hover:-translate-y-0.5'
                    }`}
                  />
                  <span 
                    className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                      menuOpen ? '-translate-y-1' : 'group-hover:translate-y-0.5'
                    }`}
                  />
                </div>
              </div>
            </button>
          </div>

          {/* Dropdown Menu */}
          <div 
            className={`absolute left-0 right-0 top-20 mx-6 rounded-2xl backdrop-blur-md bg-white bg-opacity-10 border border-white border-opacity-20 overflow-hidden transition-all duration-500 ${
              menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
          >
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Navigation Links */}
                <div>
                  <p className="text-white text-xs uppercase tracking-wider opacity-60 mb-4">
                    Navigation
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link 
                      to="/" 
                      onClick={() => setMenuOpen(false)}
                      className="text-white text-lg hover:opacity-70 transition-opacity duration-300"
                    >
                      Browse
                    </Link>
                    
                    {user && (
                      <>
                        <Link 
                          to="/my-rentals" 
                          onClick={() => setMenuOpen(false)}
                          className="text-white text-lg hover:opacity-70 transition-opacity duration-300"
                        >
                          My Rentals
                        </Link>
                        <Link 
                          to="/my-reviews" 
                          onClick={() => setMenuOpen(false)}
                          className="text-white text-lg hover:opacity-70 transition-opacity duration-300"
                        >
                          My Reviews
                        </Link>
                        {isAdmin() && (
                          <Link 
                            to="/admin" 
                            onClick={() => setMenuOpen(false)}
                            className="text-white text-lg hover:opacity-70 transition-opacity duration-300"
                          >
                            Admin
                          </Link>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Account Section */}
                <div>
                  <p className="text-white text-xs uppercase tracking-wider opacity-60 mb-4">
                    Account
                  </p>
                  {user ? (
                    <div className="flex flex-col gap-4">
                      <p className="text-white text-sm opacity-80">
                        Logged in as {user.username}
                      </p>
                      <button 
                        onClick={() => {
                          handleLogout();
                          setMenuOpen(false);
                        }}
                        className="text-white text-xs uppercase tracking-wider px-6 py-3 rounded-full border border-white border-opacity-30 hover:bg-white hover:text-black transition-all duration-300 w-fit"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Link 
                        to="/login" 
                        onClick={() => setMenuOpen(false)}
                        className="text-white text-xs uppercase tracking-wider px-6 py-3 rounded-full border border-white border-opacity-30 hover:bg-white hover:text-black transition-all duration-300 text-center"
                      >
                        Login
                      </Link>
                      <Link 
                        to="/register" 
                        onClick={() => setMenuOpen(false)}
                        className="text-white text-xs uppercase tracking-wider px-6 py-3 rounded-full bg-white text-black hover:bg-opacity-80 transition-all duration-300 text-center"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;