import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import SelectMenu from '../components/SelectMenu'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import {
  fetchProductdata,
  fetchProducts,
  fetchProductsError,
  getAllProducts,
  getProductError,
  getProductLoadingState,
  updateAllProducts,
} from '../store/slices/productsSlice'
import { useOutletContext } from 'react-router-dom'
import ProductShimmer from '../components/ProductShimmer'

export default function Home() {
  const [query, setquery] = useState('')
  const [query1, setquery1] = useState('')

  const [dark] = useOutletContext()
  // console.log(query);

  const dispatch = useDispatch()


useEffect(() => {

  if(query1)
  {
    fetch(`https://fakestoreapi.com/products/category/${query1}`)
    .then( (res)=> res.json() ).then( (data)=>  dispatch(updateAllProducts(data)) )
  }


  const delayDebounceFn = setTimeout(() => {
    if (query.length > 2) { // Only fetch if query is longer than 2 characters
      fetch(`https://fakestoreapi.com/products/category/${query}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.length === 0) {
            dispatch(fetchProductsError('No products found')); // Dispatch error if no products found
          } else {
            dispatch(updateAllProducts(data));
            setquery('') 
           // Update products if data exists
          }
        })
        .catch(() => {
          dispatch(fetchProductsError('Error fetching products')); // Dispatch error if fetch fails
        });
    }
  }, 1000); // 300ms debounce

  return () => clearTimeout(delayDebounceFn); // Cleanup the timeout on query change
}, [query, dispatch,query1]);

    

  // useEffect(() => {
  //   if (query) {
  //     fetch(`https://fakestoreapi.com/products/category/${query}`)
  //       .then(res => {
  //         // Check if the response is OK
  //         if (!res.ok) {
  //           throw new Error('Network response was not ok');
  //         }
  //         return res.json();
  //       })
  //       .then(json => {
  //         // Check if the returned data is empty
  //         if (json.length === 0) {
  //           dispatch(fetchProductsError('Category Not Found'));
  //           dispatch(updateAllProducts([])); // Clear the products list
  //         } else {
  //           dispatch(updateAllProducts(json));
  //         }
  //       })
  //       .catch(error => {
  //         console.log('Error:', error.message);
  //         dispatch(fetchProductsError('Category Not Found'));
  //         dispatch(updateAllProducts([])); // Clear the products list
  //       });
  //   } else {
  //     // Optionally, you could fetch all products or clear the list if the query is empty
  //     dispatch(fetchProducts());
  //   }
  // }, [query, dispatch]);

  // useEffect(() => {
  //   if (query) {
  //     fetch(`https://fakestoreapi.com/products/category/${query}`)
  //       .then(res => {
  //         if (!res.ok) {
  //           throw new Error('Network response was not ok');
  //         }
  //         return res.json();
  //       })
  //       .then(json => {
  //         if (json.length === 0) {
  //           console.log('error');

  //           // dispatch(fetchProductsError({payload : 'Category Not Found'})); // Set error for no products
  //           dispatch(fetchProductsError())
  //           dispatch(updateAllProducts([])); // Clear the products list
  //         } else {
  //           dispatch(updateAllProducts(json)); // Update the products list
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Error:', error.message);
  //         dispatch(fetchProductsError()) // Set error on fetch failure
  //         dispatch(updateAllProducts([])); // Clear the products list
  //       });
  //   } else {
  //     // Optionally, you could fetch all products or clear the list if the query is empty
  //     dispatch(fetchProductdata());
  //   }
  // }, [query, dispatch]);

  const productsList = useSelector(getAllProducts)
  const isLoading = useSelector(getProductLoadingState)
  // const isLoading = 1
  const error = useSelector(getProductError)
  return (
    <main className={` ${dark ? 'dark' : ''}`}>
      <div className="search-filter-container">
        <SearchBar query={query} setquery={setquery} />
        <SelectMenu setquery1={setquery1} setquery={setquery} />
      </div>

      {/* Render loading message */}
      {/* {isLoading && <h1 className='home-error'>Loading...</h1>} */}

      {isLoading && <ProductShimmer/>}
      
      {/* Render error message, but keep search and select menu visible */}
      {error && !isLoading && <h2 className='home-error'>{error}</h2>}

      {/* Render the product list only if there are products */}
      {!isLoading && !error && productsList.length > 0 && (
        <div className="products-container">
          {productsList.map(({ id, title, rating, price, image }) => (
            <Product
              key={id}
              productId={id}
              title={title}
              rating={rating.rate}
              price={price}
              imageUrl={image}
            />
          ))}
        </div>
      )}
    </main>
  )
  
  // isLoading ? (
  //   <h1 className='home-error ' >Loading...</h1>
  // ) : error ? (
  //   <h2 className='home-error ' >{error}</h2>
  // ) : (
  //   <>
  //     <main className={` ${dark ? 'dark' : ''}`}>
  //       <div className="search-filter-container">
  //         <SearchBar query={query} setquery={setquery} />
  //         <SelectMenu setquery1={setquery1} setquery={setquery} />
  //       </div>
  //       <div className="products-container">
  //         {productsList.map(({ id, title, rating, price, image }) => (
  //           <Product
  //             key={id}
  //             productId={id}
  //             title={title}
  //             rating={rating.rate}
  //             price={price}
  //             imageUrl={image}
  //           />
  //         ))}
  //       </div>
  //     </main>

  //   </>
  // )
}
