import React from 'react'
import { useDispatch } from 'react-redux'
import {
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
  removeCartItem,
} from '../store/slices/cartSlice'

export default function CartItem({
  productId,
  title,
  rating,
  price,
  imageUrl,
  quantity,
}) {
  const dispatch = useDispatch()
  return (
    <div className="cart-item-container">
      <div className="cart-item">
        <img src={imageUrl} alt={title} />
        <div>
          <h3>{title}</h3>
          <p>{rating} ★ ★ ★ ★</p>
        </div>
      </div>

       <div className="">${price}</div>
      <div className="item-quantity">
        <button onClick={() =>{
           dispatch(decreaseCartItemQuantity({productId}))
           let storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
           // Check if the product already exists in the cart
           const existingProductIndex = storedCart.findIndex(item => item.productId === productId);
           if (existingProductIndex !== -1) {
             // If it exists, increment the quantity
             storedCart[existingProductIndex].quantity -= 1;
           } else {
             // If it doesn't exist, add a new object with productId and quantity
             storedCart.push({ productId, quantity: 1 });
           }
           // Save the updated cart back to localStorage
           localStorage.setItem('cartItems', JSON.stringify(storedCart));
           console.log(storedCart);
           // Dispatch the action to add to cart in Redux
        }}>-</button>
        <span>{quantity}</span>
        <button onClick={() => {
          dispatch(increaseCartItemQuantity({productId}))

          let storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
          // Check if the product already exists in the cart
          const existingProductIndex = storedCart.findIndex(item => item.productId === productId);
          if (existingProductIndex !== -1) {
            // If it exists, increment the quantity
            storedCart[existingProductIndex].quantity += 1;
          } else {
            // If it doesn't exist, add a new object with productId and quantity
            storedCart.push({ productId, quantity: 1 });
          }
          // Save the updated cart back to localStorage
          localStorage.setItem('cartItems', JSON.stringify(storedCart));
          console.log(storedCart);
          // Dispatch the action to add to cart in Redux


        }}>+</button>
      </div>
      <div className="item-total">${quantity * price}</div>
     <div>  <button className='remove'  onClick={  ()=> dispatch(removeCartItem(productId)) }>Remove</button> </div>
      
    </div>
  )
}
