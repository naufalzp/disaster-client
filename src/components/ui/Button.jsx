import PropTypes from "prop-types";

const Button = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`rounded-md ease-in-out duration-300 px-4 py-2 font-bold text-white ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
