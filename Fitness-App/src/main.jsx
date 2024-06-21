import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import App from './App.jsx'
import './index.css'

/**
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
*/
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
    },
    {
      path: "landingpage",
      element: <LandingPage/>,
    },
  ]);

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <RouterProvider router={router} />
  );