import React, { createContext, useReducer, useContext, useEffect } from 'react';

const MovieListContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD': return [...state, action.payload];
    case 'REMOVE': return state.filter(m => m.id !== action.payload);
    case 'SET': return action.payload;
    default: return state;
  }
};

export const MovieListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const saved = localStorage.getItem('myList');
    if (saved) dispatch({ type: 'SET', payload: JSON.parse(saved) });
  }, []);

  useEffect(() => {
    localStorage.setItem('myList', JSON.stringify(state));
  }, [state]);

  return (
    <MovieListContext.Provider value={{ myList: state, dispatch }}>
      {children}
    </MovieListContext.Provider>
  );
};

export const useMovieList = () => useContext(MovieListContext);
