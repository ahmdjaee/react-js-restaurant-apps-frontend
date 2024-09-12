import PropTypes from "prop-types";

function Badge({ children, color }) {
  return (
    <span
      className={`inline-block bg-gradient-to-r ${color} rounded-full px-3 py-1 text-sm font-semibold text-white text-nowrap`}
    >
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
};

export default Badge;
