[course video](https://www.youtube.com/watch?v=Dorf8i6lCuk&t=27s)
[style files and dummy data](https://github.com/academind/react-complete-guide-code/tree/zz-reactjs-summary/extra-files)
[code, snapshot by sections](https://github.com/academind/react-complete-guide-code/tree/zz-reactjs-summary/extra-files)

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
