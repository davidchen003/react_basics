[course video](https://www.youtube.com/watch?v=Dorf8i6lCuk&t=27s)
[style files and dummy data](https://github.com/academind/react-complete-guide-code/tree/zz-reactjs-summary/extra-files)
[code, snapshot by sections](https://github.com/academind/react-complete-guide-code/tree/zz-reactjs-summary/extra-files)

- **firebase** as the backend/database
  - used **Realtime Database**, not the **Cloud Firestore Database**
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

## Styling, via CSS module files

- for big projects, typically there are different css files for different components
- it would be better if these css files are scoped to their corresponding components, not affecting other components, which can be accomplished by the **CSS Modules** provided by react.

- create `MainNavigation.module.css`, need to following this name convention for react **CSS Modules** to work correctly (scope the CSS only to `MainNavigation.js` component)
- in `MainNavigation.js`, `import classes from './MainNavigation.module.css';`
- apply/attach the css classes from `MainNavigation.module.css` to the appropriate elements in `MainNavigation.js`
  ```
  <header className={classes.header}>
    <div className={classes.logo}>React Meetups</div>
  ```

## Outputing data: simple version

- Dummy data and list mapping in `AllMeetups.js`

  ```
  <ul>
      {DUMMY_DATA.map((meetup) => {
        return <li key={meetup.id}>{meetup.title}</li>;
      })}
  </ul>
  ```

## Outputing data: structured with more components: AllMeetup-MeetupList-MeetupItem

- create `meetups` folder under `components`
- add `MeetupItem.js`, `MeetupList.js`, and their respective CSS files
- `AllMeetups.js`
  ```
  <section>
    <h1>All Meetups</h1>
    <MeetupList meetups={DUMMY_DATA} />
  </section>
  ```

**Commit B1-3**

## Styling, via wrapper component, enabled by props.children

- can be (re)used for other components too
- create a `ui` folder under `component`, for some user-interface components that don't belong to specific feature, but can be used in different places of the app.
- create `Card.js` in it, together with it's CSS module file
  ```
  function Card(props) {
  return <div className={classes.card}>{props.children}</div>;
  }
  ```
- `children` prop is a special prop which every component receives by default. `children` holds the content before the openning and closing tags.
- import and use it in `MeetupItem.js`

- create another custom wrapper component `layout.js` in `layout` folder, together with its CSS module file
  ```
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  ```
- import and use it in `App.js` to replace the `<MainNavigation />`, which affect all routes and their pages

**Commit B1-4**

## User input form

- create `NewMeetupForm.js` and its CSS module file
  - also uses `<Card>` wrapper component for styling
  - similar to `className` (instead of standard `class`), we use `htmlFor (instead of `for`) as in `<label htmlFor="title">`
  - unless we specify `type="button"`, the regular button inside the `<form>` will submit the form.
- import/use in `AllMeetups.js`
- the form doesn't actually work (submit anything) yet, but it's there.

**Commit B1-5**

## `useRef` and form submission

- `event.preventDefault()` to prevent the default submit action of the browser (sending request to the server that serves the page). instead we want it to run our own Javascript logic.

- to get the input value we could use
  - `useState` as before
  - but we'll use `useRef` this time since we only interested in getting the user input once.

**Commit B1-6**

## firebase

- used **Realtime Database**, not the **Cloud Firestore Database**
- create a project and "start in test mode" (not the "lock mode", otherwise you won't be able to send the request)

- we could put the data submit request in `NewMeetupForm.js`, but it's already crowed there, so we'll pass the data to `NewMeetup.js` via `props.onAddMeetup(meetupData);`
- in `NewMeetup.js`, we define the `onAddMeetup`
  ```
    function addMeetupHandler(meetupData) {
    fetch("https://academind2-default-rtdb.firebaseio.com/meetups.json", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  ```
  - http address is from my firebase account + `meetups.json` (which created a meetup folder in the database, for better organization)
  - `method=POST` for storing data (otherwise the default will be `GET` under `fetch`)
  - once we specify `POST` we need to provide data in `body`
  - http address is from my AcadeMind2 (the old one AcadeMind somehow doesn't work anymore)
  - at this moment, when you click `AddMeetup`, nothing seems to happen, but the data is actually already sent to firebase (where you can verify)

**Commit B1-7**

## Navigating programmatically, useNavigate hook

- In react-router-dom v6 `useHistory()` is replaced by `useNavigate()`.

- in `NewMeetup.js`

  -`import { useNavigate() } from "react-router-dom";`

  - `const navigate = useNavigate();`
  - after the `fetch` promise add
    ```
    .then(() => {
      navigate('/');
    });
    ```
    which delivers us to the starting (AllMeetups) page after data posted

**Commit B1-8**
