import * as actionTypes from './actions';

const initialState = {
  currentImage: {},
  cart: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_IMAGE:
      return {
        ...state,
        image: action.image
      };
    case actionTypes.ADD_TO_CART:
      let cartArray = state.cart;
      cartArray = cartArray.concat(action.items)

      return {
        ...state,
        cart: [...cartArray]
      }
    case actionTypes.CLEAR_CART:
      return {
        ...state,
        cart: []
      }
    default:
      return state;
  }
};

export default reducer;