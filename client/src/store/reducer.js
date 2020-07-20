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
      console.log(`got items! : ${JSON.stringify(action.items)}`);
      console.log(`cartArray before: ${JSON.stringify(cartArray)}`);
      cartArray = cartArray.concat(action.items)
      console.log(`cart array: ${JSON.stringify(cartArray)}`);

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