import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedUserRoute from "./components/ProtectedUserRoute";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import ExercisesDashboard from "./pages/ExercisesDashboard";
import ExerciseDetailPage from "./pages/ExerciseDetailPage";
import WorkoutDashboard from "./pages/WorkoutDashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={ true } path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
        {/* Private Protected User Routes Below */}
      <Route path='' element={<ProtectedUserRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exercise" element={<ExercisesDashboard />} />
        <Route path="/exercise/:id" element={<ExerciseDetailPage />} />
        <Route path="/workoutdashboard" element={<WorkoutDashboard />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={ store }>
    <React.StrictMode>
      <RouterProvider router={ router } />
    </React.StrictMode>
  </Provider>
);
