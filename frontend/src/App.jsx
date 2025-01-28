import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import PlainLayout from "./components/Layout/PlainLayout";
import NavBarLayout from "./components/Layout/NavBarLayout";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetUp from "./components/admin/CompanySetUp";
import AdminJobs from "./components/admin/AdminJobs";
import PostJobs from "./components/admin/PostJobs";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";

function App() {
  const appRouter = createBrowserRouter([
    {
      element: <NavBarLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/jobs",
          element: <Jobs />,
        },
        {
          path: "/description/:id",
          element: <JobDescription />,
        },
        {
          path: "/browse",
          element: <Browse />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/admin/companies",
          element: (
            <ProtectedRoute>
              <Companies />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/companies/create",
          element: (
            <ProtectedRoute>
              <CompanyCreate />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/companies/:id",
          element: (
            <ProtectedRoute>
              <CompanySetUp />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/jobs",
          element: (
            <ProtectedRoute>
              <AdminJobs />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/jobs/create",
          element: (
            <ProtectedRoute>
              <PostJobs />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/jobs/:id/applicants",
          element: (
            <ProtectedRoute>
              <Applicants />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      element: <PlainLayout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },

        {
          path: "/signup",
          element: <Signup />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
