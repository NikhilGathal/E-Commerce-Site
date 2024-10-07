import React, { useEffect, useState } from 'react'
import wishIcon from '../assets/heart-solid.svg'
import { Link } from 'react-router-dom'
import CartIcon from '../assets/cart-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProductdata,
  fetchProducts,
  fetchProductsError,
  updateAllProducts,
} from '../store/slices/productsSlice'
import { fetchCartItems, fetchCartItemsdata, fetchCartItemsError, loadCartItems, loadCartItemsFromLocal } from '../store/slices/cartSlice'
import { fetchdata } from '../store/middleware/api'
import ModalSign from './ModalSign'
import ModalLogin from './ModalLogin'
import { addWishItem, loadWishItem } from '../store/slices/wishListSlice'

export default function Header({ dark ,isdark }) {
  const [issign, setissign] = useState(false)
  const [islog, setislog] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {

    // dispatch(
    //   fetchdata({
    //     url: 'products',
    //     onsuccess: updateAllProducts.type, 
    //      onstart: fetchProducts.type,
    //     onerror: fetchProductsError.type
    //   })
    // )

    // dispatch(fetchdata({
    //   url: 'carts/5',
    //   onsuccess: loadCartItems.type, 
    //   onstart: fetchCartItems.type,
    //   onerror: fetchCartItemsError.type
    // })
    // )




    dispatch(fetchProductdata())

    // dispatch( fetchCartItemsdata())

    let storedCart = JSON.parse(localStorage.getItem('cartItems')) || []; 
    // console.log(storedCart);
    dispatch(loadCartItemsFromLocal(storedCart))

    let storedWish = JSON.parse(localStorage.getItem('wishItems')) || []
    // console.log(storedWish);
    
    dispatch(loadWishItem(storedWish))


    // dispatch(fetchProducts())
    // fetch('https://fakestoreapi.com/products')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     dispatch(updateAllProducts(data))
    //   })
    //   .catch(() => {
    //     dispatch(fetchProductsError())
    //   })



    // dispatch(fetchCartItems())
    // fetch('https://fakestoreapi.com/carts/5')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     dispatch(loadCartItems(data))
    //   })
    //   .catch(() => {
    //     dispatch(fetchCartItemsError())
    //   })
  }, [])
  const cartItems = useSelector((state) => state.cartItems.list)
  // console.log(cartItems);
  const wish = useSelector((state) => state.wishList.list)
  // console.log(wish);


  
  // const dark = false
  return ( 
    <header className={`header-container head ${dark ? 'dark' : ''} `}>
      <div className="header-contents">
       <Link to= "/" >  <h1 onClick={() => {
    //  setquery('')
     dispatch(fetchProductdata())
    //  console.log('clicked');
    }
    }   className='H'> Shopee </h1> </Link>
        <i onClick={ ()=> 
          {
            localStorage.setItem('isdarkmode', !dark)
            isdark(!dark)
          }
        } className={`fa-solid fa-2xl fa-${dark ? 'sun H' : 'moon H'}`}></i>
        <div className='icon-contain'>
          <Link className="cart-icon" to="/cart">
            <img className={ `H ${dark ? 'dark' : ''} `} title='Cart' src={CartIcon} alt="cart-icon" />
          
            <div className="cart-items-count">
              {cartItems.reduce(
                (accumulator, currentItem) => accumulator + currentItem.quantity,
                0
              )}
            </div>
          </Link>
          <Link className="cart-icon" to="/wish">
            <img  title='WishList' className='heart H' src={wishIcon} alt="wish-icon" />
            <div className="cart-items-count">{wish.reduce((acc, curr) => acc + curr.quantity, 0)}</div>
          </Link>
          <h3 className='H' onClick={() => {setissign(true)}}>Signup</h3>
          <ModalSign issign={issign} setissign={setissign} />
          <h3 className='H' onClick={()=> {setislog(true)}}>Login</h3>
        <ModalLogin islog={islog} setislog={setislog}/>
       <Link  to="/about">  <h3 className='H'>About Us</h3> </Link>
        <Link to="/contact"> <h3 className='H'>Contact Us</h3> </Link>
        </div>
   
      </div>
    </header>
  )
}
