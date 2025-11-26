import { useState } from "react";

export default function FeedbackForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    eventName: "",
    division: "RnD",
    rating: 1,
    comment: "",
    suggestion: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Feedback submitted!");
      setForm({
        name: "",
        email: "",
        eventName: "",
        division: "RnD",
        rating: 1,
        comment: "",
        suggestion: "",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg border border-sky-200 my-5">
        <h2 className="text-2xl font-bold text-sky-700 mb-6 text-center">
          Submit Feedback
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sky-700 font-medium mb-1">Name</label>
            <input
              className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sky-700 font-medium mb-1">Email</label>
            <input
              className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Event Name */}
          <div>
            <label className="block text-sky-700 font-medium mb-1">
              Event Name
            </label>
            <input
              className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
              name="eventName"
              placeholder="Event Name"
              value={form.eventName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Division */}
          <div>
            <label className="block text-sky-700 font-medium mb-1">
              Division
            </label>
            <select
              name="division"
              value={form.division}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-sky-300 rounded-lg bg-white focus:ring-2 focus:ring-sky-400 outline-none"
            >
              <option>LnT</option>
              <option>EEO</option>
              <option>PR</option>
              <option>HRD</option>
              <option>RnD</option>
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sky-700 font-medium mb-1">
              Rating (1–5)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              name="rating"
              value={form.rating}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
              required
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sky-700 font-medium mb-1">
              Comment (optional)
            </label>
            <textarea
              className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
              name="comment"
              placeholder="Your comment"
              value={form.comment}
              onChange={handleChange}
            />
          </div>

          {/* Suggestion */}
          <div>
            <label className="block text-sky-700 font-medium mb-1">
              Suggestion (optional)
            </label>
            <textarea
              className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
              name="suggestion"
              placeholder="Your suggestion"
              value={form.suggestion}
              onChange={handleChange}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg font-semibold shadow-md transition"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
