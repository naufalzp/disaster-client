import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ user }) => {
  return (
    <header className="flex h-auto w-full justify-between bg-white p-6">
      <span className="text-lg font-semibold">Welcome!, {user.name} ({user.email})</span>
      <Link
        to="/"
        className="rounded-md ease-in-out duration-300 px-4 py-2 font-bold text-white bg-red-500 hover:bg-red-700">
        Logout
      </Link>
    </header>
  );
}

Header.propTypes = {
  user: PropTypes.object
}

export default Header