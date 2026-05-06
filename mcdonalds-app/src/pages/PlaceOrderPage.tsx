import { useNavigate } from "react-router-dom";
import type { CartItem } from "../types/cartItem";
import type { Order } from "../types/order";
import { createOrder } from "../services/orderService";
import { clearCart } from "../services/cartService";

interface PlaceOrderPageProps {
  cart: CartItem[];
  onOrderPlaced: (cart: CartItem[]) => void;
  onAddOrder: (order: Order) => void;
}

const PlaceOrderPage: React.FC<PlaceOrderPageProps> = ({
  cart,
  onOrderPlaced,
  onAddOrder,
}) => {
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirmOrder = (): void => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before placing an order.");
      return;
    }

    const newOrder = createOrder(cart);
    onAddOrder(newOrder);
    onOrderPlaced(clearCart());
    navigate("/orders");
  };

  const handleCancel = (): void => {
    navigate("/cart");
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1>Review Order</h1>

      {cart.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
          <p>Your cart is empty</p>
        </div>
      ) : (
        <div>
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <h3>Order Items</h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "16px",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "2px solid #ddd" }}>
                  <th style={{ textAlign: "left", padding: "8px" }}>Item</th>
                  <th style={{ textAlign: "center", padding: "8px" }}>Qty</th>
                  <th style={{ textAlign: "right", padding: "8px" }}>Price</th>
                  <th style={{ textAlign: "right", padding: "8px" }}>
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "8px" }}>{item.name}</td>
                    <td style={{ textAlign: "center", padding: "8px" }}>
                      {item.quantity}
                    </td>
                    <td style={{ textAlign: "right", padding: "8px" }}>
                      ${item.price.toFixed(2)}
                    </td>
                    <td style={{ textAlign: "right", padding: "8px" }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "18px",
                fontWeight: "bold",
                paddingTop: "16px",
                borderTop: "2px solid #333",
              }}
            >
              <span>Total Amount:</span>
              <span style={{ color: "#d32f2f" }}>${total.toFixed(2)}</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={handleCancel}
              style={{
                padding: "12px 24px",
                backgroundColor: "#ccc",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Back to Cart
            </button>
            <button
              onClick={handleConfirmOrder}
              style={{
                padding: "12px 24px",
                backgroundColor: "#ffc72c",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrderPage;
