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
import Cast from "./pages/Cast/index.tsx";
import { CastLoader } from "./routes/pages/castLoader.ts";

const routes = createBrowserRouter(createRoutesFromElements(<Route path="/" element={<App />} errorElement={<ErrorPage />} >
  <Route index element={<Home />} loader={homeLoader} errorElement={<ErrorPage />} />
  <Route path="/:mediaType/:id" element={<MovieDetails />} >
  </Route>
  <Route path="/:mediaType/:id/cast" loader={CastLoader} element={<Cast />} />
  <Route path="/:mediaType/:id/cast/:department" loader={CastLoader} element={<Cast />} />

</Route>));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigurationProvider>
      <RouterProvider router={routes} />
    </ConfigurationProvider>
  </React.StrictMode>
);
