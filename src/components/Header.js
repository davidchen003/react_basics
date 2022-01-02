// import PropTypes from "prop-types"; // --- propTypes to make code more rubost

const Header = (props) => {
  return (
    <header>
      <h1>{props.title}</h1>
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