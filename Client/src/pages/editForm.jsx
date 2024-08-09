import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostRequest from "../../helper/PostRequest"; // Adjust the import path as needed
import Swal from "sweetalert2";
import Navbar from "../../component/Navbar";

export default function EditForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const navigate = useNavigate();
  const [id, setId] =useState(0) 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await PostRequest.get(`/users/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setId(data.id)
        setPassword(data.password)
        setUsername(data.username);
        setEmail(data.email);
        setDateOfBirth(data.dateOfBirth);
      } catch (error) {
        console.log(error);
        
        console.error("Error fetching user data:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch user data",
          icon: "error",
        });
      }
    };

    fetchUserData();
  }, [id]);

  const editPost = async (e) => {
    e.preventDefault();
    try {
      await PostRequest({
        url: `/users/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        data: {
          username,
          email,
          password,
          dateOfBirth,
        },
      });
      Swal.fire({
        title: "Success!",
        text: "User information updated successfully",
        icon: "success",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text:
          error.response.data.message ,
        icon: "error",
      });
    }
  };

  return (
    <div>
        <div>
            <Navbar/>
        </div>
    <div className="max-w-md mx-auto mt-10">
      <form
        onSubmit={editPost}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Leave blank to keep current password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="dateOfBirth"
          >
            Date of Birth
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dateOfBirth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}
