import * as a from './actionTypes';

const initiatState = [];

const booksReduser = (state = initiatState, action) => {
  switch (action.type) {
    case a.ADD_BOOK:
      return [...state, action.payload];

    default:
      return state;
  }
};

export default booksReduser;
