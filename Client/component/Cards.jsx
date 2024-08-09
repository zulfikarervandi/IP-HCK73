import React from "react";
import { Link } from "react-router-dom";
import PostRequest from "../helper/PostRequest";
import Swal from "sweetalert2";

export default function Cards({ movie }) {
    const handleSubmit = async () => {
        try {
        const { data } = await PostRequest( {
          url:'/favorites',
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          data: {
            movieId: movie.id,
            movieName: movie.title,
            movieImageUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            movieDesc: movie.overview
          },
        });
        Swal.fire({
          title: "Success!",
          text: "Added to your favorite successfully",
          icon: "success",
        });
        } catch (error) {
             Swal.fire({
               title: "Wait!",
               text: error.response.data.message,
               icon: "error",
             });
        }
    }
  const truncate = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  const fallbackImage =
    "https://via.placeholder.com/300x450?text=No+Image+Available";

  return (
    <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] mt-4">
      <div className="min-h-[256px]">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
        />
      </div>

      <div className="p-6">
        <h3 className="text-gray-800 text-xl font-bold">
          {movie.title || "Untitled Movie"}
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          {movie.release_date
            ? `Released: ${new Date(movie.release_date).getFullYear()}`
            : "Release date unknown"}
        </p>
        <p className="mt-4 text-sm text-gray-500 leading-relaxed">
          {movie.overview
            ? truncate(movie.overview, 100)
            : "No description available."}
        </p>
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => handleSubmit()}
            className="px-5 py-2.5 rounded-lg text-black text-sm tracking-wider border-none outline-none bg-red-600 hover:bg-red-700 active:bg-red-800 transition duration-300"
          >
            add favorite
          </button>
        </div>
      </div>
    </div>
  );
}
