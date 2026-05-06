import { useParams, useNavigate } from "react-router-dom";
import ReceiptView from "../components/ReceiptView/ReceiptView";
import type { Order } from "../types/order";
import type { Receipt } from "../types/receipt";
import { generateReceipt, closeReceipt } from "../services/receiptService";
import { updateOrderStatus } from "../services/orderService";
import { useState, useEffect } from "react";

interface ReceiptPageProps {
  orders: Order[];
  onOrderStatusChange: (updatedOrder: Order) => void;
}

const ReceiptPage: React.FC<ReceiptPageProps> = ({
  orders,
  onOrderStatusChange,
}) => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!orderId) return;

    const foundOrder = orders.find((o) => o.id === orderId);
    if (!foundOrder) {
      navigate("/orders");
      return;
    }

    setOrder(foundOrder);
    setReceipt(generateReceipt(foundOrder));
  }, [orderId, orders, navigate]);

  const handleMarkCompleted = (): void => {
    if (!order || !receipt) return;

    const updatedOrder = updateOrderStatus(order, "Completed");
    const closedReceipt = closeReceipt(receipt);

    onOrderStatusChange(updatedOrder);
    setOrder(updatedOrder);
    setReceipt(closedReceipt);
  };

  if (!order || !receipt) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          color: "#999",
        }}
      >
        <p>Order not found</p>
      </div>
    );
  }

  return (
    <ReceiptView
      receipt={receipt}
      onMarkCompleted={handleMarkCompleted}
      isActive={receipt.isActive}
    />
  );
};

export default ReceiptPage;
