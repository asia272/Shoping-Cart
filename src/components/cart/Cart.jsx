import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteToCart } from '../../features/cart/cartSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import './cart.css';

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (cart.length > 0) {
      const initialQty = {};
      cart.forEach((item) => {
        if (!(item.id in quantities)) {
          initialQty[item.id] = item.qty || 1; 
        }
      });
      setQuantities((prevQuantities) => ({ ...prevQuantities, ...initialQty }));
    }
  }, [cart, quantities]);  
  // Increase qty for a specific item
  const increaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  // Decrease qty for a specific item
  const decreaseQty = (id) => {
    if (quantities[id] > 1) {
      setQuantities((prev) => ({
        ...prev,
        [id]: prev[id] - 1,
      }));
    }
  };

  // Handle deletion
  const handleDelete = (product) => {
    dispatch(deleteToCart(product));
    const updatedQuantities = { ...quantities };
    delete updatedQuantities[product.id]; 
    setQuantities(updatedQuantities);
  };

  return (
    <div className="cart">
      <h2>
        <ShoppingCartIcon />
        Your Cart
      </h2>

      {cart.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        cart.map((product, idx) => (
          <div key={idx} className="item">
            <div>
              <h3>{product.name}</h3>
              <p className='price'>Price: {product.price}</p>
            </div>
            <div className="btns">
              <button onClick={() => increaseQty(product.id)}>+</button>
              <p>{quantities[product.id]}</p> 
              <button onClick={() => decreaseQty(product.id)}>-</button>
            </div>

            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(product)}
              startIcon={<DeleteIcon />}
            >
              remove
            </Button>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <p className="total">
          Total: <span>{cart.reduce((acc, product) => acc + product.price * (quantities[product.id] || 1), 0)} Rs</span>
        </p>
      )}
    </div>
  );
};

export default Cart;
