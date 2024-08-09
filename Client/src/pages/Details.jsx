import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostRequest from "../../helper/PostRequest";
import axios from "axios";

export default function Details() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data } = await axios.get( `https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        setMovie(data.results);
        console.log(data);
        
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Failed to load movie details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return null;

  return (
    <div>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt={movie.title}
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                MOVIE
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {movie.title}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">
                    {movie.vote_average} ({movie.vote_count} reviews)
                  </span>
                </span>
              </div>
              <p className="leading-relaxed">{movie.overview}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex">
                  <span className="mr-3">Release Date:</span>
                  <span>{movie.release_date}</span>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  Runtime: {movie.runtime} minutes
                </span>
                <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
