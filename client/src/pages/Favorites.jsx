import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    // fetch favorites
    const fetchFavorites = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) return;

            const res = await axios.get(
                "http://localhost:5000/api/favorites",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setFavorites(res.data || []);
        } catch (err) {
            console.log(
                "Favorites error:",
                err.response?.data || err.message
            );
        }
    };

    // useEffect
    useEffect(() => {
        const token = localStorage.getItem("token");

        const loadData = async () => {
            if (!token) {
                navigate("/login");
                return;
            }

            await fetchFavorites();
        };

        loadData();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                My Favorites ❤️
            </h1>

            {favorites.length === 0 ? (
                <p>No favorites yet</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {favorites.map((f) => (
                        <div
                            key={f.id}
                            className="border p-4 rounded shadow bg-white"
                        >
                            <h2 className="font-bold">{f.name}</h2>
                            <p className="text-sm text-gray-600">
                                {f.description}
                            </p>
                            <p className="text-xs text-gray-500">
                                {f.category}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorites;