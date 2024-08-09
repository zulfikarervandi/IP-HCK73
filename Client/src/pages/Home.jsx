import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostRequest from "../../helper/PostRequest";
import Cards from "../../component/Cards";
import Navbar from "../../component/Navbar";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams()

  useEffect(() => {
    getAllMovies();
  }, []);

  const getAllMovies = async () => {
    try {
      setLoading(true);
      const { data } = await PostRequest.get("/movies", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(data);
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-red-900">
      <Navbar onLogout={handleLogout} id={id}/>
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-white text-center py-10">Loading...</div>
        ) : error ? (
          <div className="text-white text-center py-10">Error: {error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <Cards key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
