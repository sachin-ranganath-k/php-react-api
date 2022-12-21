import * as actionTypes from "./actionConstants";

export const getNotes = (payload) => {
  return {
    type: actionTypes.GET_NOTES,
    payload,
  };
};

export const addNote = (payload) => {
  return {
    type: actionTypes.ADD_NOTE,
    payload,
  };
};

export const showError = (flag) => {
  return {
    type: actionTypes.SHOW_ERROR,
    payload: flag,
  };
};

export const somethingWentWrong = (flag) => {
  return {
    type: actionTypes.SOMETHING_WENT_WRONG,
    payload: flag,
  };
};

export const addUser = (payload) => {
  return {
    type: actionTypes.ADD_USER,
    payload,
  };
};

export const getUsers = (payload) => {
  return {
    type: actionTypes.GET_USERS,
    payload,
  };
};


// export const deleteNote = (id) => {
//   return {
//     type: actionTypes.DELETE_NOTE,
//     payload: id,
//   };
// };

// export const updateNote = (id) => {
//   return {
//     type: actionTypes.UPDATE_NOTE,
//     payload: id,
//   };
// };
