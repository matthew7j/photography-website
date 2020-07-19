import * as actionTypes from './actions';

const initialState = {
  currentImage: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_IMAGE:
      return {
        ...state,
        image: action.image
      };
    default:
      return state;
  }
};

export default reducer;