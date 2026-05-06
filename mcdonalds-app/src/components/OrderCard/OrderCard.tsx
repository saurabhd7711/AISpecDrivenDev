import styles from "./OrderCard.module.css";
import type { Order } from "../../types/order";
import { formatTime } from "../../utils/timeUtils";

interface OrderCardProps {
  order: Order;
  onViewReceipt: (orderId: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onViewReceipt }) => {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Pending":
        return "pending";
      case "Confirmed":
        return "confirmed";
      case "Completed":
        return "completed";
      case "Cancelled":
        return "cancelled";
      default:
        return "";
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.orderId}>Order #{order.id.substring(0, 8)}</h3>
        <span
          className={`${styles.status} ${styles[getStatusColor(order.status)]}`}
        >
          {order.status}
        </span>
      </div>

      <div className={styles.details}>
        <p>
          <strong>Items:</strong> {order.items.length}
        </p>
        <p>
          <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
        </p>
        <p>
          <strong>Placed:</strong> {formatTime(order.placedAt)}
        </p>
      </div>

      <button className={styles.button} onClick={() => onViewReceipt(order.id)}>
        View Receipt
      </button>
    </div>
  );
};

export default OrderCard;
