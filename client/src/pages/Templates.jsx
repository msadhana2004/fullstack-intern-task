import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* =========================
   STATIC TEMPLATE DATA
========================= */
const staticTemplates = [
    {
        id: 1,
        name: "Portfolio Design",
        description: "Modern portfolio UI with clean layout",
        category: "portfolio",
        thumbnail_url:
            "https://marketplace.canva.com/EAFwckKNjDE/2/0/1600w/canva-black-white-grayscale-portfolio-presentation-vzScEqAI__M.jpg",
    },
    {
        id: 2,
        name: "Dribbble UI",
        description: "Creative UI design inspired by Dribbble",
        category: "business",
        thumbnail_url:
            "https://cdn.dribbble.com/userupload/42825312/file/original-c5b732fb4d38a34ca9cef8b451cf7af5.png",
    },
    {
        id: 3,
        name: "Travel Landing",
        description: "Beautiful travel landing page template",
        category: "education",
        thumbnail_url:
            "https://static.vecteezy.com/system/resources/thumbnails/054/233/997/small/shadow-of-an-airplane-glides-over-a-turquoise-beach-surrounded-by-lush-greenery-during-a-clear-day-in-a-tropical-free-photo.jpeg",
    },
    {
        id: 4,
        name: "Business Dashboard",
        description: "Admin dashboard UI template",
        category: "business",
        thumbnail_url:
            "https://media.istockphoto.com/id/1488294044/photo/businessman-works-on-laptop-showing-business-analytics-dashboard-with-charts-metrics-and-kpi.jpg",
    },
    {
        id: 5,
        name: "Education Portal",
        description: "Learning platform UI design",
        category: "education",
        thumbnail_url:
            "https://bansalgroup-assets.s3.ap-south-1.amazonaws.com/STG/Test_BGI_Bhopal/2025/01/education-portal1.jpg",
    },
];

function Templates() {
    const [templates] = useState(staticTemplates);
    const [favorites, setFavorites] = useState([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");

    const navigate = useNavigate();

    // logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    // favorite toggle
    const toggleFavorite = (id) => {
        if (favorites.includes(id)) {
            setFavorites(favorites.filter((f) => f !== id));
        } else {
            setFavorites([...favorites, id]);
        }
    };

    const isFavorite = (id) => favorites.includes(id);

    // filter
    const filteredTemplates = templates.filter((t) => {
        const matchSearch = t.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchCategory =
            category === "all" || t.category === category;

        return matchSearch && matchCategory;
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">

            {/* NAVBAR */}
            <div className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/70 border-b border-gray-800 px-6 py-4 flex justify-between items-center">

                <h1 className="text-2xl font-extrabold tracking-wide">
                    Mini SaaS 🚀
                </h1>

                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 rounded-lg"
                >
                    Logout
                </button>

            </div>

            {/* TITLE */}
            <div className="text-center mt-10">
                <h2 className="text-4xl font-bold">
                    Explore Templates
                </h2>
                <p className="text-gray-400 mt-2">
                    Choose your perfect design ⚡
                </p>
            </div>

            {/* SEARCH + FILTER */}
            <div className="max-w-5xl mx-auto mt-8 px-4 flex flex-col md:flex-row gap-4">

                <input
                    className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700"
                    placeholder="Search templates..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="p-3 rounded-xl bg-gray-900 border border-gray-700"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="business">Business</option>
                    <option value="portfolio">Portfolio</option>
                    <option value="education">Education</option>
                </select>

            </div>

            {/* CARDS */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 mt-6">

                {filteredTemplates.map((t) => (
                    <div
                        key={t.id}
                        className="bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-pink-500/20 hover:-translate-y-1 transition"
                    >

                        {/* IMAGE */}
                        <div className="w-full aspect-[4/3] bg-gray-800 flex items-center justify-center overflow-hidden">
                            <img
                                src={t.thumbnail_url}
                                alt={t.name}
                                className="max-w-full max-h-full object-contain transition duration-300 hover:scale-105"
                            />
                        </div>

                        {/* CONTENT */}
                        <div className="p-4">

                            <h2 className="text-lg font-bold truncate">
                                {t.name}
                            </h2>

                            <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                                {t.description}
                            </p>

                            <span className="text-xs mt-3 inline-block px-3 py-1 rounded-full bg-gray-800 text-gray-300">
                                {t.category}
                            </span>

                            <button
                                onClick={() => toggleFavorite(t.id)}
                                className={`mt-4 w-full py-2 rounded-xl font-semibold transition ${isFavorite(t.id)
                                    ? "bg-gray-700"
                                    : "bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90"
                                    }`}
                            >
                                {isFavorite(t.id)
                                    ? "❤️ Favorited"
                                    : "Add Favorite"}
                            </button>

                        </div>
                    </div>
                ))}

            </div>

        </div>
    );
}

export default Templates;