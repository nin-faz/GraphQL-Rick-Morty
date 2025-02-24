import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <Router>
        <div className="min-h-screen py-8 bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-500 flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
              path="*"
              element={
                <h1 className="flex items-center justify-center h-screen text-white text-4xl font-bold">
                  404 - Not Found
                </h1>
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
