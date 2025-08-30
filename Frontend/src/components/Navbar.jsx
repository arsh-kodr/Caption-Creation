import React, { useState } from "react";

export default function Navbar({ isAuthenticated, onAuthChange }) {
  const [showAuth, setShowAuth] = useState(null); // "login" | "register" | null
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const BASE = "https://caption-creation.onrender.com";

  async function handleSubmit(endpoint) {
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Auth failed");
      onAuthChange(true);
      setShowAuth(null);
      setForm({ username: "", password: "" });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    onAuthChange(false);
    fetch(`${BASE}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    }).catch(() => {});
  }

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Brand */}
        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          Caption Creator
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => setShowAuth("login")}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition"
              >
                Login
              </button>
              <button
                onClick={() => setShowAuth("register")}
                className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-gray-800 transition"
              >
                Register
              </button>
            </>
          ) : (
            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium shadow hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="w-96 bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowAuth(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-5 text-center">
              {showAuth === "login" ? "Login to your account" : "Create an account"}
            </h2>

            <div className="space-y-4">
              <input
                value={form.username}
                onChange={(e) =>
                  setForm((f) => ({ ...f, username: e.target.value }))
                }
                placeholder="Username"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                placeholder="Password"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
              />

              <button
                onClick={() => handleSubmit(showAuth)}
                disabled={loading}
                className="w-full px-3 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {loading ? "Processing..." : showAuth === "login" ? "Login" : "Register"}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
