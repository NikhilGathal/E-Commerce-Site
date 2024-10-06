import React from 'react'
import { useDispatch } from 'react-redux'
import { removeWishItem } from '../store/slices/wishListSlice'

export default function Wishitem({ productId, title, rating, price, imageUrl, quantity }) {
  const dispatch = useDispatch()
  return (
    <div className="cart-item-container" key={productId}>
      <div className="cart-item">
        <img src={imageUrl} alt={title} />
        <div>
          <h3>{title}</h3>
          <p>{rating} ★ ★ ★ ★</p>
        </div>
      </div>

      <div className="">${price}</div>

      <div className="item-quantity">
        {/* <button onClick={() => dispatch(decreaseCartItemQuantity(productId))}></button> */}
        {/* <span>{quantity}</span> */}
        <button onClick={() => dispatch(removeWishItem({productId}))}>Remove</button>
      </div>
      <div className="item-total"></div>
    </div>
  )
}
