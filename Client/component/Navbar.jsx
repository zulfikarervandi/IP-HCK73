import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ onLogout, id }) {
  return (
    <div className="space-y-4">
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-gray-800 text-sm py-3 dark:bg-white">
        <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
          <div
            id="hs-navbar-dark"
            className="overflow-hidden transition-all duration-300 basis-full grow sm:block"
            aria-labelledby="hs-navbar-dark-collapse"
          >
            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
              <button
                className="font-medium text-white focus:outline-none dark:text-black"
                onClick={onLogout}
              >
                Logout
              </button>
              <Link
                to="/favorites"
                className="font-medium text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-500 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
              >
                My Favorites
              </Link>
              <Link
                to="/"
                className="font-medium text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-500 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
              >
                Home
              </Link>
              <Link
                to={`/users/me`}
                className="font-medium text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-500 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
              >
                Users
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
