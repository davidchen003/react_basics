import { createContext, useState } from "react";

// using capital F below because it is a react component we are creating
const FavoritesContext = createContext({
  // setting initial values of the states we need
  favorites: [],
  totalFavorites: 0,
  // initialize the following to empty functions, to give us better autocompletion in the IDE later (?)
  addFavorite: (favoriteMeetup) => {},
  removeFavorite: (meetupId) => {},
  itemIsFavorite: (meetupId) => {},
});

export function FavoritesContextProvider(props) {
  // we can use this component to wrap up all the component that need access to the Context. So whenever the state changes here, this component will be re-evaluated, and in turn other components wrapped inside it will also be re-evaluated

  const [userFavorites, setUserFavorites] = useState([]);

  function addFavoriteHandler(favoriteMeetup) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.concat(favoriteMeetup);

      //above arrow funtion method guarantees instant state update; method below could be delayed
      // setUserFavorites(userFavorites.concat(favoriteMeetup));
    });
  }

  function removeFavoriteHandler(meetupId) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.filter((meetup) => meetup.id !== meetupId);
    });
  }

  function itemIsFavoriteHandler(meetupId) {
    return userFavorites.some((meetup) => meetup.id === meetupId);
  }

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
