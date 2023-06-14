const initialState = {
  items: [],
  cart: {}
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, ...action.payload],
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((item) => item.product_id._id !== action.payload),
      }
    case 'ALMACENAR_CARRITO':
      return {
        ...state,
        cart: action.payload,
      }
    case 'UPDATE_CART_ITEM_MAS':
      const updatedItemsMas = state.items.map((item) => {
        if (item.product_id._id === action.payload.product_id._id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          }
        }
        return item;
      })
      return {
        ...state,
        items: updatedItemsMas,
      }
    case 'UPDATE_CART_ITEM_MENOS':
      const updatedItemsMenos = state.items.map((item) => {
        if (item.product_id._id === action.payload.product_id._id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          }
        }
        return item;
      })
      return {
        ...state,
        items: updatedItemsMenos,
      }

    default:
      return state
  }
}

export default cartReducer;
