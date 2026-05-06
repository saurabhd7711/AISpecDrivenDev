import styles from "./ReceiptView.module.css";
import type { Receipt } from "../../types/receipt";
import { formatTime } from "../../utils/timeUtils";

interface ReceiptViewProps {
  receipt: Receipt;
  onMarkCompleted: () => void;
  isActive: boolean;
}

const ReceiptView: React.FC<ReceiptViewProps> = ({
  receipt,
  onMarkCompleted,
  isActive,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.receipt}>
        <h1 className={styles.title}>Receipt</h1>

        <div className={styles.section}>
          <p>
            <strong>Order ID:</strong> {receipt.orderId}
          </p>
          <p>
            <strong>Receipt ID:</strong> {receipt.id.substring(0, 12)}
          </p>
        </div>

        <div className={styles.section}>
          <h3>Items</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {receipt.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td className={styles.center}>{item.quantity}</td>
                  <td className={styles.right}>${item.price.toFixed(2)}</td>
                  <td className={styles.right}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.total}>
          <span className={styles.totalLabel}>Total Amount:</span>
          <span className={styles.totalValue}>
            ${receipt.totalAmount.toFixed(2)}
          </span>
        </div>

        <div className={styles.section}>
          <p>
            <strong>Placed At:</strong> {formatTime(receipt.placedAt)}
          </p>
          {receipt.completedAt && (
            <p>
              <strong>Completed At:</strong> {formatTime(receipt.completedAt)}
            </p>
          )}
        </div>

        {isActive && (
          <button className={styles.button} onClick={onMarkCompleted}>
            Mark as Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default ReceiptView;
