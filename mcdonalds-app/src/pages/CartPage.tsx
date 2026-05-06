import { useNavigate } from "react-router-dom";
import CartItemRow from "../components/CartItemRow/CartItemRow";
import CartSummary from "../components/CartSummary/CartSummary";
import type { CartItem } from "../types/cartItem";
import {
  updateItemQuantity,
  removeItemFromCart,
  calculateTotal,
} from "../services/cartService";

interface CartPageProps {
  cart: CartItem[];
  onUpdateCart: (cart: CartItem[]) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cart, onUpdateCart }) => {
  const navigate = useNavigate();
  const total = calculateTotal(cart);

  const handleIncrease = (cartItemId: string): void => {
    const item = cart.find((c) => c.id === cartItemId);
    if (item) {
      const updatedCart = updateItemQuantity(
        cart,
        cartItemId,
        item.quantity + 1,
      );
      onUpdateCart(updatedCart);
    }
  };

  const handleDecrease = (cartItemId: string): void => {
    const item = cart.find((c) => c.id === cartItemId);
    if (item) {
      const updatedCart = updateItemQuantity(
        cart,
        cartItemId,
        item.quantity - 1,
      );
      onUpdateCart(updatedCart);
    }
  };

  const handleRemove = (cartItemId: string): void => {
    const updatedCart = removeItemFromCart(cart, cartItemId);
    onUpdateCart(updatedCart);
  };

  const handlePlaceOrder = (): void => {
    navigate("/orders/new");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "#999",
          }}
        >
          <p style={{ fontSize: "18px" }}>Your cart is empty</p>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: "20px" }}>
            {cart.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
              />
            ))}
          </div>

          <CartSummary
            total={total}
            itemCount={cart.length}
            onPlaceOrder={handlePlaceOrder}
          />
        </div>
      )}
    </div>
  );
};

export default CartPage;
