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

## Build for production/deployment

- `nmp run build`
- a folder `build` will be created, which is what you'll push for production

  ```
  The project was built assuming it is hosted at /.
  You can control this with the homepage field in your package.json.

  The build folder is ready to be deployed.
  You may serve it with a static server:

  npm install -g serve
  serve -s build

  Find out more about deployment here:

  https://cra.link/deployment
  ```

- we can deploy it locally
  - `npm install -g serve`
  - `serve -s build `
  ```
   Serving!                                      │                                                │
      Local: http://localhost:3000     │
      On Your Network:  http://172.22.48.1:3000
  ```
  - or we can specify a port (e.g. 8000), ``serve -s build -p 8000`
- now you can see the website at http://localhost:3000
- the react icon of Chrome turned from orange to blue; when you click it, it reads: This page is using the production build of React.
- now, even if you delete all the folders other than the build folder, the website will still work.

# JASON Server

## Setting up

- [github](https://github.com/typicode/json-server)
- it's kind of a **Mock API/backend**

- `npm i jason-server`
- in `package.jason`, under "scripts:" section, add

  - `"server":"jason-server --watch db.json --port 5000"` (may not be necessary per following errow message and the working command)

- `npm run server`

  - got error message `'jason-server' is not recognized as an internal or external command, operable program or batch file.`

- run again with `npx json-server --watch db.json --port 5000` with success.
- You'll see the file `db.json` is added. Open it and change it to:

  ```
  {
  "tasks": [
      {
      "id": 1,
      "text": "Doctors Appointment",
      "day": "Feb 5th at 2:30pm",
      "reminder": true
      },
      {
      "id": 2,
      "text": "Meeting at School",
      "day": "Feb 6th at 1:30pm",
      "reminder": true
      }
  ]
  }
  ```

  - it's the same structure as our tasks JS object, but now it's JSON, **the keys need quotes around them**

  - delete the initial tasks info in `const [tasks, setTasks] = useState([])`

- open another terminal to start our website `npm start` (at port 3000) (this is **deverlopment build**, not the **production build** above )

**Commit 7**

## Fetching data (tasks) from server

- the data can be see at `http://localhost:5000/tasks`

- `useEffect()` hook

  ```
    useEffect(() => {
  const getTasks = async () => {
    const tasksFromServer = await fetchTasks();
    setTasks(tasksFromServer);
  };

  getTasks();
  }, []);

  // fetch data
  // moving this out of useEffect so others can use it
  const fetchTasks = async () => {
  const res = await fetch("http://localhost:5000/tasks");
  const data = await res.json();
  return data;
  };
  ```

- we'll see the tasks are fetched JSON server and displayed at our web page

**Commit 8**

## Delete task

- at this moment we can delete the tasks from UI, but not from server, so when we refresh, the old data loads back

## Add task

- no need to create id, it will be assigned automatically

## Fetch a single task, and update the toggled reminder to server

- in App.js

  ```
  const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`);
  const data = await res.json();
  return data;
  };
  ```

- and update the `const toggleReminder = async (id) => {` accordingly

- now when we toggle the reminder, it update permanently in the server (instead of just in UI)

**Commit 9**

## Rounting (briefy and messy, should have introduced earlier)

- `npm i react-router-dom`

- add `Footer.js`, and import it in App.js
- add `About.js`

- in App.js
  - `import { BrowserRouter as Router, Route } from 'react-router-dom'`
  - wrap the whole `return` by `<Router></Router>`
  - instead of import About.js as we did to Footer.js, use
    - `<Route path="/about" component={About} />`
- ...

## useLocation

- to get rid of Add button on About page
- Header.js
  - `const location = useLocation()`, which allows us to look at the current route we are in
  - change
    ```
    <Button
    color={showAdd ? "red" : "green"}
    text={showAdd ? "Close" : "Add"}
    onClick={onAdd}
    />
    ```
    to
    ```
    {location.pathname === "/" && (
      <Button
        color={showAdd ? "red" : "green"}
        text={showAdd ? "Close" : "Add"}
        onClick={onAdd}
      />
    )}
    ```

**Commit 10**
