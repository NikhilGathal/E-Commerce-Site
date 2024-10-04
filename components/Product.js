import { useDispatch } from 'react-redux'
import { addCartItem } from '../store/slices/cartSlice'
import { addWishItem } from '../store/slices/wishListSlice'
import { Link } from 'react-router-dom'

export default function Product({ productId, title, rating, price, imageUrl }) {
  const dispatch = useDispatch()
  return (
    <div className="product">
      <div className="product-image">
        <Link to={`/${productId}`}> <img src={imageUrl} alt={title} />  </Link>
      </div>
      <div className="title-container">
        <Link to={`/${productId}`}>  <h3 className='item-detail'>
          {title}
        </h3> </Link>
      </div>
      <div className="price-rating-container">
        <p className="rating">{+rating} ★ ★ ★ ★</p>
        <p className="price">${price}</p>
      </div>
      <div className="cta-container">
        <button
          // onClick={() => {
          //   let storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
          //   storedCart.push({productId : quantity});
          //   localStorage.setItem('cartItems', JSON.stringify(storedCart));
          //   dispatch(addCartItem({ productId }))
          // }}


          onClick={() => {
            // Retrieve existing cart items or initialize an empty array
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
            // Dispatch the action to add to cart in Redux
            dispatch(addCartItem({ productId }));
          }}
        >
          Add to Cart
        </button>
        <button onClick={() => {
          let storedWish = JSON.parse(localStorage.getItem('wishItems')) || [];
          const existingProductIndex = storedWish.findIndex(item => item.productId === productId);
          if (existingProductIndex !== -1) {
            console.log("Product already in wishlist.");
          } else {
            storedWish.push({ productId, quantity: 1 });
          }
          localStorage.setItem('wishItems', JSON.stringify(storedWish));
          dispatch(addWishItem({ productId }))
        }}
        >Add to WishList</button>
      </div>
    </div>
  )
}
