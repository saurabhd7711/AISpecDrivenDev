import styles from "./CartSummary.module.css";

interface CartSummaryProps {
  total: number;
  itemCount: number;
  onPlaceOrder: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  total,
  itemCount,
  onPlaceOrder,
}) => {
  return (
    <div className={styles.summary}>
      <div className={styles.content}>
        <div className={styles.row}>
          <span className={styles.label}>Items:</span>
          <span className={styles.value}>{itemCount}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Total:</span>
          <span className={styles.totalValue}>${total.toFixed(2)}</span>
        </div>
      </div>
      <button
        className={styles.button}
        onClick={onPlaceOrder}
        disabled={itemCount === 0}
      >
        Place Order
      </button>
    </div>
  );
};

export default CartSummary;
