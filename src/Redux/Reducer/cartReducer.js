const INITIAL_STATE = {
  carts: [],
  loading: false,
  error: ''
}

export const cartReducer = (state = INITIAL_STATE, action) => {
  // console.log(action.type)
  switch(action.type) {
    case 'FETCH_DATA_CART_START' :
      return {
        ...state,
        loading: true
      }
    case `FETCH_DATA_CART_SUCCESS` :
      // console.log(action.payload)
      return {
        ...state,
        loading: false,
        carts: action.payload
      }
    default : 
      return state
  }
}