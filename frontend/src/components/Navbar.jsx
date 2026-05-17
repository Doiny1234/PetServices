import React, { useState } from "react";
import { FaPaw } from "react-icons/fa";
import { FiSearch, FiHeart, FiUser, FiX, FiMenu, FiLogOut } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [menu, setMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setMenu(false);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (searchTerm.trim()) {
        // Navighează către pagina de servicii cu query param pentru categorie
        navigate(`/services?category=${searchTerm}`);
        setSearchTerm("");
        setShowSearch(false);
      }
    }
  };

  const toggleMenu = () => setMenu(!menu);

  return (
    <header className="bg-white shadow-md px-6 py-4 lg:px-12 sticky top-0 z-50">
      <div className="flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="bg-[#e2c6aa] p-2 rounded-full text-black">
            <FaPaw />
          </span>
          <span className="font-bold text-xl text-[#5A3B1F]">Scooby</span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#212e0e]">
          <Link to="/" className="hover:text-[#d1733d] transition-colors">Acasă</Link>

          {/* Services dropdown */}
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setShowDropDown(true)}
            onMouseLeave={() => setShowDropDown(false)}
          >
            <div className="flex items-center gap-1 hover:text-[#d1733d] py-2">
              <span>Servicii</span>
              <IoMdArrowDropdown size={20} />
            </div>

            {showDropDown && (
              <div className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 w-40 flex flex-col z-10 border border-gray-100">
                <Link to="/services?category=grooming" className="px-4 py-2 hover:bg-[#fdf7f2] hover:text-[#d1733d]">Grooming</Link>
                <Link to="/services?category=training" className="px-4 py-2 hover:bg-[#fdf7f2] hover:text-[#d1733d]">Training</Link>
                <Link to="/services?category=sitting" className="px-4 py-2 hover:bg-[#fdf7f2] hover:text-[#d1733d]">Pet Sitting</Link>
                <Link to="/services?category=walking" className="px-4 py-2 hover:bg-[#fdf7f2] hover:text-[#d1733d]">Walking</Link>
              </div>
            )}
          </div>

          <Link to="/" className="hover:text-[#d1733d]">Despre Noi</Link>
          <Link to="/" className="hover:text-[#d1733d]">Blog</Link>
          <Link to="/" className="hover:text-[#d1733d]">Contact</Link>
        </nav>

        {/* Desktop icons & Search Bar */}
        <div className="hidden md:flex items-center gap-3 relative">
          
          {/* Search Input Field */}
          <div className={`flex items-center transition-all duration-300 ${showSearch ? "w-48 opacity-100" : "w-0 opacity-0 overflow-hidden"}`}>
            <input
              type="text"
              placeholder="Search category..."
              className="border-2 border-[#e2c6aa] rounded-full px-4 py-1 text-sm outline-none w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          <button
            onClick={() => setShowSearch(!showSearch)}
            className="cursor-pointer border-2 border-[#e2c6aa] hover:text-white hover:bg-[#e2c6aa] rounded-full p-2.5 flex items-center justify-center transition-all"
          >
            <FiSearch size={20} />
          </button>

          <Link
            to="/favorites"
            className="cursor-pointer border-2 border-[#e2c6aa] hover:text-white hover:bg-[#e2c6aa] rounded-full p-2.5 flex items-center justify-center transition-all"
          >
            <FiHeart size={20} />
          </Link>

          <Link
            to={token ? "/dashboard" : "/login"}
            className="cursor-pointer border-2 border-[#e2c6aa] hover:text-white hover:bg-[#e2c6aa] rounded-full p-2.5 flex items-center justify-center transition-all"
          >
            <FiUser size={20} />
          </Link>

          {token && (
            <button
              onClick={handleLogout}
              className="cursor-pointer border-2 border-red-100 text-red-500 hover:text-white hover:bg-red-500 rounded-full p-2.5 flex items-center justify-center transition-all"
              title="Logout"
            >
              <FiLogOut size={20} />
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
           {token && <FiLogOut className="text-red-500" onClick={handleLogout} size={22}/>}
           {menu ? <FiX size={28} onClick={toggleMenu} /> : <FiMenu size={28} onClick={toggleMenu} />}
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          menu ? "translate-x-0" : "-translate-x-full"
        } md:hidden flex flex-col absolute bg-[#f5eee6] text-[#6b4226] left-0 top-[72px] font-semibold text-2xl pt-8 px-5 pb-10 gap-6 w-full h-screen transition-transform duration-300 z-40`}
      >
        {/* Mobile Search */}
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-[#e2c6aa]">
            <FiSearch size={20} className="text-gray-400" />
            <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent outline-none text-lg w-full"
                onKeyDown={(e) => {
                    if(e.key === 'Enter') {
                        navigate(`/services?category=${e.target.value}`);
                        setMenu(false);
                    }
                }}
            />
        </div>

        <Link to="/" onClick={() => setMenu(false)}>Acasă</Link>
        
        <div className="flex flex-col gap-4">
          <span className="text-gray-400 text-sm uppercase tracking-widest">Serviciile noastre</span>
          <Link to="/services?category=grooming" className="pl-4 text-xl" onClick={() => setMenu(false)}>Grooming</Link>
          <Link to="/services?category=training" className="pl-4 text-xl" onClick={() => setMenu(false)}>Training</Link>
          <Link to="/services?category=sitting" className="pl-4 text-xl" onClick={() => setMenu(false)}>Pet Sitting</Link>
        </div>

        <Link to="/favorites" onClick={() => setMenu(false)}>Favorite</Link>
        <Link to={token ? "/dashboard" : "/login"} onClick={() => setMenu(false)}>
            {token ? "My Dashboard" : "Login / Register"}
        </Link>
        
        {token && (
            <button 
                onClick={handleLogout}
                className="text-left text-red-600 mt-4 flex items-center gap-2"
            >
                <FiLogOut /> Logout
            </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;