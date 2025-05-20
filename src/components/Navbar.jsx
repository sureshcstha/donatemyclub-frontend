import { NavLink } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-white text-xl font-semibold">
          Donate
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;