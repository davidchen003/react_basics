[course video](https://www.youtube.com/watch?v=w7ejDZ8SWv8)
[code](https://github.com/bradtraversy/react-crash-2021)

## Setup

- `npx create-react-app react_basics`
- `cd react_basics`
- `npm start`

- add VS code extension

  - ES7 React/Redux/GraphQL/React-Native snippets, so to use
    - `rafce` (arrow function export component)
  - Bracket Pair Colorizer

- clean up useless files
- create `components` folder in `src` to store all react components (it's convention to name all the components with **capital** initial)

## Header component

- `Header.js` in `src/components`
- start with `rafce` to create the boilerplate.

  - however `import React from 'react'` is no longer needed
  - import/use it in App.js
    - `import Header from "./components/Header";`
    - `<Header />`

- components can be **classes**, instead of **functions**, as shown below
- use `rce` to create class boilerplate, instead of `rafce` for functions

## Prop

### passing properties

- `<Header title="Task Tracker" />` in app.js
- in Header.js

```
const Header = (props) => {
    return (
        <header>
            <h1>{props.title}</h1>
        </header>
    );
};
```

- or,

```
const Header = ({title}) => {
    return (
        <header>
            <h1>{title}</h1>
        </header>
    );
};
```

### default props

- in Header.js, add the following, in case not title prop passed, it will show the default

```
Header.defaultProps = {
    title: "Task Tracker (as default)",
    };
```

### PropTypes

- we can specify props types to make code more robust

```
import PropTypes from "prop-types";

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

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
```

- now if in app.js we use `<Header title={1} />`, it will still render, but console will show a warning message
- or `title: PropTypes.string.isRequired`, not we'll have warning if there is no prop passed

## Styling

- there are a few ways you can do CSS with React

- direct CSS in JavaScript.

  `<h1 style={{ color: 'red',backgroundColor:'black' }}>{title}</h1>`, or

  `const headingStyle={ color: 'red',backgroundColor:'black' }`

  `<h1 style={headingStyle}>{title}</h1>`

**Commit 1**

- use style sheet e.g. `index.css` (copied from course github code), which is automatically imported into `index.js`

- style components as external package (very popular) (not immplemented)

## Button.js component

- so we can reuse this Button component in many places with different color, text, and onClick function.

**Commit 2**
