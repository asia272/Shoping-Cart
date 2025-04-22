import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from './features/cart/cartSlice';
import './App.css'
import Product from './components/product/Product';
import Cart from './components/cart/Cart';

function App() {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  return (
    <>
      <nav>
        <h1 className='cart-heading'>🛍️ Shopping Cart  <span>({cart.length} Items)</span></h1>
      </nav>
      <main>
        <Product addToCart={(product) => dispatch(addToCart(product))} />
        <Cart />
      </main>

    </>
  )
}

export default App
