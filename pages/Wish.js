import React from 'react'
import Wishitem from '../components/Wishitem'
import { useSelector } from 'react-redux'
import { getAllWishItems } from '../store/slices/wishListSlice'
export default function Wish() {

  const wishItems = useSelector(getAllWishItems)
  // console.log(wishItems);
  //   console.log( cartItems.map( (curr)=> curr.quantity * curr.price )    );
  let storedWish = JSON.parse(localStorage.getItem('wishItems')) || []

  return (
    <div className="cart-container">
      <h2>Items in Your WishList</h2>
      <div className="cart-items-container">
        <div className="cart-header cart-item-container">
          <div className="cart-item">Item</div>
          <div className="">Price</div>
          <div className="quantity">Remove</div>
          <div className="total"></div>
        </div>
        {wishItems.map(({ productId, title, rating, price, image, quantity }) => (
          <Wishitem
            key={title}
            productId={productId}
            title={title}
            price={price}
            quantity={quantity}
            imageUrl={image}
            rating={rating.rate}
          />
        ))}
        <div className="cart-header cart-item-container">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
