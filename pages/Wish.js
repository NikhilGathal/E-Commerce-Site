import React, { useEffect, useState } from 'react'
import Wishitem from '../components/Wishitem'
import { useSelector } from 'react-redux'
import { getAllWishItems } from '../store/slices/wishListSlice'
export default function Wish() {

  const wishItems = useSelector(getAllWishItems)
  // console.log(wishItems);
  //   console.log( cartItems.map( (curr)=> curr.quantity * curr.price )    );
  let storedWish = JSON.parse(localStorage.getItem('wishItems')) || []
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
   
  }
  
  return (
    <>

    {
      isLoading ? ( <h1 style={{ textAlign: 'center' }}>Loading Wishlist items...</h1>):
      wishItems.length ? (<main className="cart-container">
        <div className="cart-container"> 
        <h2 className='item-wish'>Items in Your WishList</h2>
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
      </main> ) : <div> <h1 className='empty-wish'> Wishlist is empty </h1> </div>})
    





      
    
    </>
  )
}
