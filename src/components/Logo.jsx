import { Link } from "react-router-dom";
import sphereCodeLogo from "../assets/Logo.png";
const Logo = ({ type }) => {
  return (
    <div className="px-4 md:px-6 flex">
      <img
        src={sphereCodeLogo}
        alt="sphere code logo"
        style={{ width: "70px", height: "50px" }}
        className="flex rounded-full mx-4 "
      />
      <Link
        to="/"
        className={`text-2xl text-orange-500  font-semibold ${
          type && "text-orange  text-4xl"
        }`}
      >
        Bill
        <span
          className={`text-3xl text-rose-400 ${type && " text-5xl font-bold"}`}
        >
          Sphere
        </span>
      </Link>
    </div>
  );
};

export default Logo;
