import React, { useRef, useState } from "react";

const LANGS = [
  "Hindi",
  "Hinglish",
  "English",
  "Haryanavi",
  "Punjabi",
  "Bhojpuri",
  "Marathi",
  "Gujarati",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Bengali",
  "Odia",
  "Rajasthani",
  "Assamese",
  "Konkani",
];
const STYLES = ["Funny", "Dark Humor", "Aesthetic", "Minimal", "Gen Z", "Tapori"];

export default function UploadCaption({ isAuthenticated, onAuthChange }) {
  const fileRef = useRef(null);
  const [filePreview, setFilePreview] = useState(null);
  const [lang, setLang] = useState(LANGS[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState(null);
  const [error, setError] = useState(null);

  const BASE = "https://caption-creation.onrender.com";

  function onFileChange(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFilePreview(URL.createObjectURL(f));
  }

  async function submit(e) {
    e.preventDefault();
    setError(null);
    setCaption(null);

    if (!isAuthenticated) {
      alert("Please login or register to create captions.");
      return;
    }

    const file = fileRef.current.files?.[0];
    if (!file) {
      setError("Please select an image.");
      return;
    }

    const form = new FormData();
    form.append("image", file);
    form.append("language", lang);
    form.append("style", style);

    setLoading(true);
    try {
      const res = await fetch(`${BASE}/api/posts`, {
        method: "POST",
        body: form,
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create post");

      setCaption(data.post.caption || "—");
    } catch (err) {
      setError(err.message);
      if (err.message.toLowerCase().includes("unauthorized"))
        onAuthChange(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10"
    >
      {/* Upload Section */}
      <div className="flex flex-col gap-6">
        <label
          htmlFor="image-input"
          className="flex flex-col items-center justify-center w-full h-72 border-2 border-dashed rounded-2xl cursor-pointer bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-gray-300 dark:border-gray-600 hover:border-indigo-600 transition-all shadow-sm"
        >
          {filePreview ? (
            <img
              src={filePreview}
              alt="preview"
              className="h-full w-full object-cover rounded-2xl"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-gray-500 dark:text-gray-400">
              <span className="text-xl font-semibold">Upload Your Image</span>
              <span className="text-sm">PNG, JPG (max 5MB)</span>
              <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                Click or Drag & Drop
              </span>
            </div>
          )}
          <input
            id="image-input"
            ref={fileRef}
            onChange={onFileChange}
            type="file"
            accept="image/*"
            hidden
          />
        </label>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Language
            </label>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {LANGS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Caption Theme
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {STYLES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition disabled:bg-gray-400"
        >
          {loading ? "⏳ Generating..." : " Generate Caption"}
        </button>

        {error && (
          <div className="text-red-600 text-sm font-medium">{error}</div>
        )}
      </div>

      {/* Caption Preview Section */}
      <div className="flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-8 shadow-sm">
          {loading ? (
            <div className="animate-pulse space-y-4 w-full">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          ) : caption ? (
            <p className="text-xl font-semibold text-center text-gray-800 dark:text-gray-200 leading-relaxed">
              {caption}
            </p>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center text-lg font-medium">
              Your caption will appear here 
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
