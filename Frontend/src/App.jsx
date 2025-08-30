import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import UploadCaption from "./components/UploadCaption";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuth") === "true"
  );

  // Detect system theme / persist
  useEffect(() => {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const saved = localStorage.getItem("site-theme");
    const initial = saved || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.add(initial);
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(next);
    localStorage.setItem("site-theme", next);
  }

  function handleAuthChange(status) {
    setIsAuthenticated(status);
    localStorage.setItem("isAuth", status ? "true" : "false");
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 
      dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 
      text-gray-900 dark:text-gray-100 transition-colors duration-500">
      
      {/* Navbar */}
      <Navbar
        isAuthenticated={isAuthenticated}
        onAuthChange={handleAuthChange}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Hero Section */}
      <section className="relative w-full text-center py-10 sm:py-20">
        <h1 className=" mt-2 text-2xl sm:text-5xl font-extrabold tracking-tight text-indigo-700 dark:text-indigo-400">
         Create Stunning Captions Effortlessly
        </h1>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <section className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-xl 
          p-6 md:p-10 border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-2xl">
          <UploadCaption
            isAuthenticated={isAuthenticated}
            onAuthChange={handleAuthChange}
          />
        </section>
      </main>

     
     
    </div>
  );
}
