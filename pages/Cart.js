import React from 'react'
import CartItem from '../components/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllCartItems,
  getCartError,
  getCartLoadingState,
  loadCartItems,
  removeallCartItem,
} from '../store/slices/cartSlice'
import { Link, useOutletContext } from 'react-router-dom'
import { useEffect } from 'react'

export default function Cart() {
  const [query, setquery, dark, isdark] = useOutletContext()

  
  const cartItems = useSelector(getAllCartItems)
  // console.log(cartItems);
  const dispatch = useDispatch()
  // console.log(cartItems);


  const isLoading = useSelector(getCartLoadingState)
  const error = useSelector(getCartError)
  return (

    <>
      <main className= {` cart-container  ${ dark ? 'dark' : ''}`}>
      <div className= "  cart-container " >
      <h2>Items in Your Cart</h2>
      <div className="cart-items-container">
        <div className="cart-header cart-item-container">

          <div className="cart-item">Item</div>
          <div className="">Price</div>
          <div className="quantity">Quantity</div>
          <div className="total">Total</div>
          <div className="remove">Remove</div>
        </div>
        {isLoading ? (
          <h1 style={{ textAlign: 'center' }}>Loading...</h1>
        ) : error ? (
          <h2 style={{ textAlign: 'center' }}>{error}</h2>
        ) : (
          cartItems.map(({ id, title, rating, price, image, quantity }) => (
            <CartItem
              key={id}
              productId={id}
              title={title}
              price={price}
              quantity={quantity}
              imageUrl={image}
              rating={rating.rate}
            />
          ))
        )}

        <div className="cart-header cart-item-container">
          {cartItems.length ? <Link to="/Order">  <button onClick={() => {
            dispatch(removeallCartItem())
            localStorage.removeItem('cartItems');
          }
          } className='place'>Place Order</button> </Link> : ''}
          <div></div>
          <div></div>
          {cartItems.length ? (
            <div className="sum-total">
              ${cartItems.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0).toFixed(1)
              }
            </div>
          ) : ''}
          <div></div>
        </div>
      </div>
    </div>
      </main>
    </>
   
  )
}
