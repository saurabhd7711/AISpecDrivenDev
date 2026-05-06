import { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import type { CartItem } from "./types/cartItem";
import type { MenuItem } from "./types/menuItem";
import type { Order } from "./types/order";
import { addItemToCart } from "./services/cartService";
import "./App.css";

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const handleAddToCart = (menuItem: MenuItem): void => {
    if (!menuItem.isAvailable) {
      alert("This item is not available");
      return;
    }
    const updatedCart = addItemToCart(cart, menuItem);
    setCart(updatedCart);
  };

  const handleUpdateCart = (updatedCart: CartItem[]): void => {
    setCart(updatedCart);
  };

  const handleOrderPlaced = (updatedCart: CartItem[]): void => {
    setCart(updatedCart);
  };

  const handleAddOrder = (newOrder: Order): void => {
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
  };

  const handleOrderStatusChange = (updatedOrder: Order): void => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order,
      ),
    );
  };

  const cartCount = cart.length;

  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="navbar">
        <Link to="/" className="logo">
          🍔 McDonald&apos;s
        </Link>
        <div className="nav-links">
          <Link to="/menu" className="nav-link">
            Menu
          </Link>
          <Link to="/cart" className="nav-link">
            Cart {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>
          <Link to="/orders" className="nav-link">
            Orders
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <AppRoutes
          cart={cart}
          orders={orders}
          onAddToCart={handleAddToCart}
          onUpdateCart={handleUpdateCart}
          onOrderPlaced={handleOrderPlaced}
          onAddOrder={handleAddOrder}
          onOrderStatusChange={handleOrderStatusChange}
        />
      </main>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
