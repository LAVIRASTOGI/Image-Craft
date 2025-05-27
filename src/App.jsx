import { Routes, Route } from "react-router-dom";
import { useState, useEffect, lazy, Suspense, useTransition } from "react";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";

const BuyCredit = lazy(() => import("./pages/BuyCredit"));
const Result = lazy(() => import("./pages/Result"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

// Simple loading component for route transitions
const RouteLoadingFallback = () => (
  <div className="flex justify-center items-center min-h-[70vh]">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full border-2 border-t-blue-600 border-blue-200 animate-spin mb-4"></div>
      <p className="text-blue-600 font-medium">Loading page...</p>
    </div>
  </div>
);

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Optimize loading with startTransition
    const timer = setTimeout(() => {
      startTransition(() => {
        setLoading(false);
      });
    }, 1000); // 1 second loading for better performance

    return () => clearTimeout(timer);
  }, [startTransition]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-white relative overflow-hidden">
      {/* Show loading screen while app is initializing */}
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      {/* Transition indicator */}
      {isPending && (
        <div className="fixed top-0 left-0 w-full h-1 bg-blue-600 animate-pulse z-50"></div>
      )}

      {/* Subtle animated background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Main content */}
      <Navbar />
      <div className="px-4 sm:px-10 md:px-14 lg:px-28 pt-16">
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/result"
              element={
                <ProtectedRoute>
                  <Result />
                </ProtectedRoute>
              }
            />
            <Route
              path="/buy"
              element={
                <ProtectedRoute>
                  <BuyCredit />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

export default App;
