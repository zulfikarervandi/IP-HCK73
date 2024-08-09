import React, { useEffect, useState } from "react";
import PostRequest from "../../helper/PostRequest";
import { Link } from "react-router-dom";
import Navbar from "../../component/Navbar";
import Swal from "sweetalert2";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = async () => {
    try {
      setLoading(true);
      const { data } = await PostRequest.get("/favorites", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setFavorites(data || []);
      console.log(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setError("Failed to fetch favorites. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    try {
      await PostRequest.delete(`favorites/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      getFavorites();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "An error occurred while deleting the favorite.",
        icon: "error",
      });
    }
  };

  const truncate = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  const fallbackImage =
    "https://via.placeholder.com/300x450?text=No+Image+Available";

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-bold mb-6 text-center">My Favorites</h1>
      {favorites.length === 0 ? (
        <p className="text-center">You haven't added any favorites yet.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-5">
          {favorites.map((movie) => (
            <div
              key={movie.id }
              className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-sm"
            >
              <div className="relative aspect-[2/3]">
                <img
                  src={movie.movieImageUrl}
                  alt={movie.movieName}
                  className="absolute h-full w-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackImage;
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  {movie.movieName || "Untitled Movie"}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {movie.movieDesc
                    ? truncate(movie.movieDesc, 100)
                    : "No description available."}
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={() => deletePost(movie.id)}
                    className="inline-block px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
