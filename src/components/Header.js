// import PropTypes from "prop-types"; // --- propTypes to make code more rubost
import Button from "./Button";
import { useLocation } from "react-router-dom";

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <Button
          color={showAdd ? "red" : "green"}
          text={showAdd ? "Close" : "Add"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker (as default)",
};

// --- propTypes to make code more rubost
// Header.propTypes = {
//   title: PropTypes.string,
//   // or
//   // title: PropTypes.string.isRequired,
// };
// ---

// --- CSS in JS
// const headingStyle = { color: "red", backgroundColor: "black" };
// ---

export default Header;

// --- components can be classes, instead of functions, as shown below ---
// --- use `rce` to create class boilerplate, instead of `rafce`  ---
// import React, { components } from "react";
// export class Header extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>class example</h1>
//       </div>
//     );
//   }
// }
// export default Header;
// ----
