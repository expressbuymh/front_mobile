export const addToCart = (product) => ({
    type: 'ADD_TO_CART',
    payload: product,
})

export const removeFromCart = (productId) => ({
    type: 'REMOVE_FROM_CART',
    payload: productId,
})

export const almacenarCarrito = (cartData) => ({
    type: 'ALMACENAR_CARRITO',
    payload: cartData,
})

export const updateCartItemMas = (product) => ({
    type: 'UPDATE_CART_ITEM_MAS',
    payload: product,
  })

  export const updateCartItemMenos = (product) => ({
    type: 'UPDATE_CART_ITEM_MENOS',
    payload: product,
  })
  