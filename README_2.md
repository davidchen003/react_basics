[course video](https://www.youtube.com/watch?v=Dorf8i6lCuk&t=27s)
[style files and dummy data](https://github.com/academind/react-complete-guide-code/tree/zz-reactjs-summary/extra-files)
[code, snapshot by sections](https://github.com/academind/react-complete-guide-code/tree/zz-reactjs-summary/extra-files)

- **SPA**: single page application

# To-Do project

## Setup

- Git branched from `51c7240 Initialize project using Create React App`.
- only keep index.js, App.js, and index.css in src folder and clean the files also.
- index.css copied content from the course.

- `npm start` to bring up the development server

## Components

- create a `components` folder (not a must, but convention and good practice) to hold components
- the convention is to name the component js files with **capital initial** (to differentiate from the built-in components).

- import components
- passing `props`
  - 1. `Todo(props)` then use the props `<h2>{props.text}</h2>`, or
  - 2. `Todo({text})` then use it as `<h2>{text}</h2>`

## Conditional rendering with `&&` or `...?...:`

- Todo.js
  - it is `<button onClick={deleteHandler}>` (which will execute when the button is clicked), not `<button onClick={deleteHandler()}>` (which will be evaluated/executed once when Javascript/react evaluate the code, which is too soon)
  - `const [modalIsOpen, setModalIsOpen] = useState(false)`
  - conditional rendering `{modalIsOpen && <Modal />}` or `{modalIsOpen ? <Modal /> : null}`
- Modal.js
  - **modal**, also called **overlay**
- Backdrop.js

## Function as props

- to turn-off the modal, it is tempeting to do it in Todo.js `{modalIsOpen && <Backdrop onClick={closeModalHandler} />}`
- however, Backdrop is a **custom component** that doesn't recognize `onClick` event listener, instead we have to:

  - create a `closeModalHandler()` function in Todo.js
  - pass the function as props to Backdrop.js. `{modalIsOpen && <Backdrop onCancel={closeModalHandler} />}`
  - then connect it to onClick in the backdrop <div>: `<div onClick={props.onCancel} />`

- we can do the same for Confirm and Cancel button of the modal

**Commit B1-1**

# Meetup Project

- start from scratch

## Routing

- `npm install react-router-dom`

- it allows us to change what visiable on the screen, based on URL, without fetching new html pages.
- it's an allusion of routing since it is SPA (single page application, for better UX)

- add `pages` folder (not a must, just good practice) for the components that will be loaded as "pages", to differentiate from other components.

- in index.js
  - `import { BrowserRouter } from "react-router-dom";`
  - and then wrap up the App with { BrowserRouter }, which is itself a component too
    ```
    <BrowserRouter>
        <App />
    </BrowserRouter>
    ```
- in App.js

  - `import { Route, Routes } from "react-router-dom";`
    - In **react-router-dom v6**, `Switch` is replaced by `Routes`, Route syntax also changed.
  - then,
    ```
    <div>
      <Routes>
        <Route exact path="/" element={<AllMeetupsPage />} />
        <Route path="/new-meetup" element={<NewMeetupPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
    ```

- w/o this `exact`, this root path will be the one show up when the url is `http://localhost:3000/new-meetup`

- Create **links** for routing
  - create `layout/MainNavigation.js`, it is not a page loaded via routing, but a general layout
    - `<Link to="/new-meetup">Add New Meetup</Link>` etc.
  - import/use it to App.js
  - we don't use the standard html **anchor tag** `<a href=' '>` here, because what it does is to send the request to the server, where the router will figure out what page to load. This is not efficient since we already are running our react application.
  - instead we'll use the `link` component, react DOM attachs a click listener to it, prevents the browser default click action (sending the request), instead just parse the url you want to go to, change the url in the url bar, and load the appropriate page/component on the screen, all within Javascript/react. So we stay on this already loaded page and don't this extra request.

**Commit B1-2**
