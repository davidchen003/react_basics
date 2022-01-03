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

## conditional rendering

- change `<Tasks tasks={tasks} onDelete={deleteTask} />` to
  ````
    {tasks.length > 0 ? (
      <Tasks tasks={tasks} onDelete={deleteTask} />
    ) : (
      "No Tasks To Show"
    )}
    ```
  ````
- try it out by deleting all the tasks

## Toggle Reminder

- toggleReminder(), App.js -> Tasks.js -> Task.js
- change (setState) individual key/value of the state
  ```
    const toggleReminder = (id) => {
  setTasks(
    tasks.map((task) =>
      task.id === id ? { ...task, reminder: !task.reminder } : task
    )
  );
  };
  ```
- use Chrome Dev Tool **React Extension** (select Components instead of Console) to see the App.js hook state reminder changes when you double click the tasks

## Template literals, conditional className

- in Task.js change `<div className="task"` to `<div className={`task ${task.reminder ? 'reminder' : ''}`}>`
- because of what we have in index.css
  ```
  .task.reminder {
      border-left: 5px solid green;
      }
  ```
  when we double click the task, the green left boarder will be on and off

**Commit 4**

## AddTask.js

- import it in App.js
- useState, `onChange={(e) => setText(e.target.value)}` etc.
- use Chrome Dev Tool **React Extension** (select Components instead of Console), you can see the 3 states change under AddTask as you enter the text and check the Set Reminder.
- addTask() in App.js, and pass it down to AddTask.js
- `checked={reminder}`, so when the form reset (checked = false), it is unchecked. **otherwise, the last check remains** after you clicked the Save button.
- in AddTask.js, `<form className="add-form" onSubmit={onSubmit}>`and create the `onSubmit()`. We are not using the `onAdd` directly, because there are a few things to take care before we pass the data
  - `e.preventDefault()`
  - data validation
  - clear the form, setState

**Commit 5**

## toggle show/no show AddTask

- **&& conditional rendering**, in App.js
  - `const [showAddTask, setShowAddTask] = useState(false)`
  - change `<AddTask onAdd={addTask} />` to `{showAddTask && <AddTask onAdd={addTask} />}`
- `onAdd={() => setShowAddTask(!showAddTask)}`, don't confuse this onAdd prop with the other one
- pass onAdd prop to Header.js
- in Header.js, `onClick={onAdd}`

- so now when you click the Add button, the AddTask form shows and disappears

## Add button change text conditionally

- in Add.js, <header>, add `showAdd={showAddTask}` prop
- in Header.js, change <Button>, from `text='Add'` to `text={showAdd ? "Close" : "Add"}`

- now when the AddTask is shown, the button text is "Close"; when the Add Task form is hidden, the button text is "Add"
- we can also change the button color conditionally, from `color="green"` to `color={showAdd ? "red" : "green"}`

**Commit 6**
