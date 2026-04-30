import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="sticky top-0 z-50 flex justify-between items-center bg-gray-900/80 backdrop-blur-md text-white px-6 py-4 border-b border-gray-800">

            {/* Logo */}
            <h2 className="font-extrabold text-xl tracking-wide">
                Mini SaaS 🚀
            </h2>

            {/* Menu */}
            <div className="flex items-center gap-3">

                <button
                    onClick={() => navigate("/templates")}
                    className={`px-4 py-2 rounded-full transition ${isActive("/templates")
                            ? "bg-gradient-to-r from-orange-500 to-pink-500"
                            : "bg-gray-800 hover:bg-gray-700"
                        }`}
                >
                    Templates
                </button>

                <button
                    onClick={() => navigate("/favorites")}
                    className={`px-4 py-2 rounded-full transition ${isActive("/favorites")
                            ? "bg-gradient-to-r from-orange-500 to-pink-500"
                            : "bg-gray-800 hover:bg-gray-700"
                        }`}
                >
                    Favorites
                </button>

                <button
                    onClick={logout}
                    className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 transition"
                >
                    Logout
                </button>

            </div>
        </div>
    );
}

export default Navbar;