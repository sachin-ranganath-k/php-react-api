import {
  ADD_NOTE,
  ADD_USER,
  DELETE_NOTE,
  GET_NOTES,
  GET_USERS,
  SHOW_ERROR,
  SOMETHING_WENT_WRONG,
} from "../actions/actionConstants";

const initialState = {
  loadAllNotes: [],
  allUsers: [],
  error: false,
  somethingWentWrongError: false,
};
console.log(initialState.allUsers);
const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        loadAllNotes: action.payload,
      };

    case ADD_NOTE:
      return {
        loadAllNotes: [...state.loadAllNotes, action.payload],
      };

    case SHOW_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case SOMETHING_WENT_WRONG:
      return {
        ...state,
        somethingWentWrongError: action.payload,
      };

    case ADD_USER:
      return {
        ...state,
        allUsers: [...state.allUsers, action.payload],
      };

    case GET_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };

    // case DELETE_NOTE:
    //   return {
    //     ...state,
    //     loadAllNotes: state.loadAllNotes.filter((note) => note.id != action.id),
    //   };

    default:
      return state;
  }
};

export default notesReducer;
