import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { homeLoader } from "./routes/pages/homeLoader.ts";
import ErrorPage from "./error-page.tsx";
import { ConfigurationProvider } from "./context/ConfigurationContext.tsx";
import MovieDetails from "./pages/MovieDetails/index.tsx";

const routes = createBrowserRouter(createRoutesFromElements(<Route path="/" element={<App />} errorElement={<ErrorPage />} >
  <Route index element={<Home />} loader={homeLoader} errorElement={<ErrorPage />} />
  <Route path="/movie/:id" element={<MovieDetails />} />
</Route>));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigurationProvider>
      <RouterProvider router={routes} />
    </ConfigurationProvider>
  </React.StrictMode>
);
