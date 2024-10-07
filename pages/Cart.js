


import React, { useState } from 'react'
import CartItem from '../components/CartItem'
import empty from '../assets/empty.png'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllCartItems,
  getCartError,
  getCartItems,
  getCartLoadingState,
  loadCartItems,
  removeallCartItem,
} from '../store/slices/cartSlice'
import { Link, useOutletContext } from 'react-router-dom'
import { useEffect } from 'react'

export default function Cart() {
  const [query, setquery, dark, isdark] = useOutletContext()


  const cartItems = useSelector(getAllCartItems)
  console.log(cartItems);
  
  // const isLoading = useSelector(getCartLoadingState) // Loading state selector
  const error = useSelector(getCartError)            // Error state selector
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  // Simulate data fetching (if you're getting cart items from an API/localStorage, etc.)
  const fetchCartItems = async () => {
    // Simulate async action (like fetching from Redux store or localStorage)
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsLoading(false);
  };
  fetchCartItems();
}, []);

if (isLoading) {
  <h1 style={{ textAlign: 'center' }}>Loading Cart items...</h1>
}

  // Logic to avoid showing "Cart is Empty" before data is loaded
  return (
    <>
      {isLoading ? (  // Display loading state until data is fetched
        <h1 style={{ textAlign: 'center' }}>Loading Cart items...</h1>
      ) : cartItems.length ? ( // Check for items after loading is done
        <main className={`cart-container ${dark ? 'dark' : ''}`}>
          <div className="cart-container">
            <h2 className='item-wish'>Items in Your Cart</h2>
            <div className="cart-items-container">
              <div className="cart-header cart-item-container">
                <div className="cart-item">Item</div>
                <div className="">Price</div>
                <div className="quantity">Quantity</div>
                <div className="total">Total</div>
                <div className="remove">Remove</div>
              </div>
              {cartItems.map(({ id, title, rating, price, image, quantity }) => (
                <CartItem
                  key={id}
                  productId={id}
                  title={title}
                  price={price}
                  quantity={quantity}
                  imageUrl={image}
                  rating={rating.rate}
                />
              ))}
              <div className="cart-header cart-item-container">
                <Link to="/Order">
                  <button
                    onClick={() => {
                      dispatch(removeallCartItem())
                      localStorage.removeItem('cartItems')
                    }}
                    className="place"
                  >
                    Place Order
                  </button>
                </Link>
                <div></div>
                <div></div>
                <div className="sum-total">
                  ${cartItems
                    .reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
                    .toFixed(1)}
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <div className="empty-cart">
          <img src={empty} />
          <h1>Your Cart is Empty</h1>
          <Link to="/">
            <button>Return to Shop</button>
          </Link>
        </div>
      )}
    </>
  )
}





