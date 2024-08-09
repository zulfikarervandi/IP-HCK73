import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostRequest from "../../helper/PostRequest";
import Cards from "../../component/Cards";
import Navbar from "../../component/Navbar";
import AiBar from "../../component/AiBar";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState("");
  const [prompts, setPrompts] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

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
      // console.log(data);
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const Ai = async (e) => {
    e.preventDefault()
    try {
      let {data} = await PostRequest({
        url:'/ai-helper',
        method:"POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        data: {prompts}
      })
      setAnswer(data)
      console.log(data);
      
    } catch (error) {
      console.log(error);
      
    }
  }
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 to-red-700">
      <Navbar onLogout={handleLogout} id={id} />
      <div className="pt-5">
      <AiBar setPrompts={setPrompts} prompts={prompts} Ai={Ai}/>
      </div>
      <div className="bg-white justify-center">
        <p>{answer}</p>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Welcome to Your Movie Playlist 
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-white text-2xl">Loading...</div>
          </div>
        ) : error ? (
          <div className="bg-red-600 text-white p-4 rounded-lg text-center">
            Error: {error}
          </div>
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
