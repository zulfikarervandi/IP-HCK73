import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/register";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Favorites from "./pages/favorites";
import EditForm from "./pages/editForm";


const router = createBrowserRouter([
  {
    element: <Login/>,
    path:'/login',
     loader: () => {
      if (localStorage.getItem("access_token")) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    element: <Register/>,
    path:'/add-user'
  },
  {
    element: <EditForm/>,
    path:'/users/me'
  },
  {
    element: <Home/>,
    path:'/',
    loader: () => {
      if (!localStorage.getItem("access_token")) {
        return redirect("/login");
      }
      return null;
    },
  },
  {
    element: <Favorites/>,
    path:'/favorites'
  },
  {
    element: <Details/>,
    path:'/movie/:id'
  },
  {
    path: '*',
    element: <h1>beloman ya</h1>
  }
])


function App() {
  return <RouterProvider router={router} />;
}

export default App;
