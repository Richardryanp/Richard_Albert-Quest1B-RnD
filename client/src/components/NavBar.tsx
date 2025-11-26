import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="w-full bg-sky-500 text-white px-6 py-4 shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Logo / Title */}
        <h1 className="text-xl font-bold tracking-wide">BNCC Feedback</h1>

        {/* Links */}
        <div className="flex gap-6">
          <Link to="/" className="hover:text-sky-200 transition font-medium">
            Feedback Form
          </Link>

          <Link
            to="/admin"
            className="hover:text-sky-200 transition font-medium"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </nav>
  );
}
