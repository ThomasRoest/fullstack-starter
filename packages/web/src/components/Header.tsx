import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <div className="p-2">
      <nav>
        <ul className="flex gap-x-2">
          <li>
            <Link to="/" activeProps={{ className: "underline" }}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" activeProps={{ className: "underline" }}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

