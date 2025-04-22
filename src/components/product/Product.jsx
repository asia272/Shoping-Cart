import "./Product.css"
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Mobile", price: 800 },
  { id: 3, name: "Tablet", price: 900 },
];

function Product({ addToCart }) {
  return (
    <div className="product-box">

      <h2>
        <ShoppingCartIcon/>
        Products
      </h2>
      {products.map((product) => (
        <div key={product.id} className="product">
          <p>{product.name} - $ {product.price}</p>
          <Button variant="contained" onClick={() => addToCart(product)}>Add to Cart</Button>

        </div>
      ))}

    </div>
  );
}

export default Product;
