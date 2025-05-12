import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed w-full top-0 bg-amber-900 z-50 shadow-lg">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <NavLink
            to="/dashboard"
            className="text-amber-50 text-3xl font-cursive transition-colors"
          >
            Mehndi Artistry
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
