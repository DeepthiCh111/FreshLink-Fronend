import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaMicrophone,
  FaShoppingCart,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice"; // adjust path if needed
import { setSearchTerm } from "../features/searchSlice";

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  const cartItems = useSelector((state) => state.cart.items); // adjust if your reducer name is different
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);

  const handleLogout = () => {
    dispatch(logout());
    setShowMenu(false);
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    // Send the search term to Marketplace
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(setSearchTerm(searchInput));
      navigate("/marketplace");
    }
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white text-black shadow-md fixed top-0 w-full z-50">
      <div
        className="text-2xl font-bold text-green-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        FreshLink
      </div>

      <div className="flex items-center gap-2 w-1/2 bg-gray-100 px-4 py-2 rounded-full">
        <input
          type="text"
          placeholder="Search products or suppliers"
          value={searchInput}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-transparent outline-none"
        />
        <FaSearch />
        <FaMicrophone />
      </div>

      <div className="flex items-center gap-4 text-lg font-semibold relative">
        <Link to="/marketplace" className="bg-color-pink">
          Marketplace
        </Link>

        <div className="relative">
          <FaShoppingCart
            onClick={() => navigate("/cart")}
            className="cursor-pointer  text-2xl"
          />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>

        {isAuthenticated && user ? (
          <div className="relative">
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            >
              <FaUserCircle size={24} />
              <span className="font-medium">{user.name}</span>
            </div>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10">
                <Link
                  to="/my-orders"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowMenu(false)}
                >
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
