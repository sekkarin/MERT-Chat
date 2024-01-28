import { Link } from "react-router-dom";

const index = () => {
  return (
    <section className="flex flex-1 flex-col drop-shadow-lg bg-white rounded-md p-3 mt-20 md:max-w-md md:mx-auto mx-5">
      <h1 className="text-3xl font-bold">Links🙂</h1>
      <br />
      <h2 className="text-xl font-bold">Public</h2>
      <Link to="/login" className="text-blue-600 hover:text-blue-400">
        Login
      </Link>
      <Link to="/register" className="text-blue-600 hover:text-blue-400">
        Register
      </Link>
      <br />
      <h2 className="text-xl font-bold">Private</h2>
      <Link to="/" className="text-blue-600 hover:text-blue-400">
        Home
      </Link>
      <Link to="/profile" className="text-blue-600 hover:text-blue-400">
        Editor Profile
      </Link>
      <Link to="/admin" className="text-blue-600 hover:text-blue-400">
        Admin Page
      </Link>
      <Link to="/" className="text-blue-600 hover:text-blue-400">
        Update Restaurant Page
      </Link>
      <Link to="/newRestaurant" className="text-blue-600 hover:text-blue-400">
        New Restaurant Page
      </Link>
    </section>
  );
};

export default index;
