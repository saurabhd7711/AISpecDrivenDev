import OrderCard from "../components/OrderCard/OrderCard";
import type { Order } from "../types/order";
import { useNavigate } from "react-router-dom";

interface OrderListPageProps {
  orders: Order[];
}

const OrderListPage: React.FC<OrderListPageProps> = ({ orders }) => {
  const navigate = useNavigate();

  const handleViewReceipt = (orderId: string): void => {
    navigate(`/orders/${orderId}`);
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <h1>Your Orders</h1>

      {orders.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "#999",
            fontSize: "16px",
          }}
        >
          <p>No orders placed yet. Start shopping!</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewReceipt={handleViewReceipt}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderListPage;
