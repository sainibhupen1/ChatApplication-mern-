import React from "react";
import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Box from "./components/Box";

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/box/:id",
    element: <Box />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={BrowserRouter} />
    </>
  );
};

export default App;
