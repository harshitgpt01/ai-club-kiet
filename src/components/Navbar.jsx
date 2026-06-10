import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between">
      <h1 className="text-2xl font-bold">
        AI Club KIET
      </h1>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/team">Team</Link>
        <Link to="/events">Events</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;