`[course video](https://www.youtube.com/watch?v=w7ejDZ8SWv8)
[code](https://github.com/bradtraversy/react-crash-2021)

## Setup

- `npx create-react-app react_basics`
- `cd react_basics`
- `npm start`

- add VS code extension

  - ES7 React/Redux/GraphQL/React-Native snippets, so to use
    - `rafce` (arrow function export component)
  - `npm install react-icons`

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

- `<Header title="Task Tracker" />` in App.js
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

- now if in App.js we use `<Header title={1} />`, it will still render, but console will show a warning message
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

## Tasks.js component

- create Tasks.js in `src/components` folder
- `map()`
- `useState` for `tasks`
  - state is **immutable**, so don't do `tasks.push()`, instead use setstate, e.g. `setTasks([...tasks, {id: 3, text: "task 3", day: "1/3/2022"}])`
    reminder: true,}])
- import it into App.js

- we don't want the Tasks ([...tasks, {id: 3, text: "task 3", day: "1/3/2022"}]) in Tasks.js, because other components may also need it, we can use
  - **Context API** : provides a way to pass data through the component tree without having to pass props down manually at every level.
  - **Redux**
  - here, we just going to
    - move it to App.js as a global state so it can be passed down to other components
    - in App.js, pass it to Task.js `<Tasks task={Tasks}/>`
    - in Tasks.js, receive the props `const Tasks = ({tasks}) => {`

## Task.js component

- import Task.js into Tasks.js
- cross/delete icon from **react-icons** Font Awesome (fa) family, and style it individually
- `deleteTask()` from App.js -> Tasks.js -> Task.js
- states pass **DOWN** , but actions (and parameters such as task id) pass **UP**.
  - so in Task.js, instead of just `onClick={onDelete}`, use

**Commit 3**
