import styles from "./CartItemRow.module.css";
import type { CartItem } from "../../types/cartItem";

interface CartItemRowProps {
  item: CartItem;
  onIncrease: (cartItemId: string) => void;
  onDecrease: (cartItemId: string) => void;
  onRemove: (cartItemId: string) => void;
}

const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const subtotal = item.price * item.quantity;

  return (
    <div className={styles.row}>
      <div className={styles.info}>
        <h4 className={styles.name}>{item.name}</h4>
        <p className={styles.price}>${item.price.toFixed(2)}</p>
      </div>

      <div className={styles.controls}>
        <button
          className={styles.quantityBtn}
          onClick={() => onDecrease(item.id)}
        >
          −
        </button>
        <input
          type="number"
          className={styles.quantityInput}
          value={item.quantity}
          readOnly
        />
        <button
          className={styles.quantityBtn}
          onClick={() => onIncrease(item.id)}
        >
          +
        </button>
      </div>

      <div className={styles.subtotal}>
        <p className={styles.subtotalText}>${subtotal.toFixed(2)}</p>
      </div>

      <button className={styles.removeBtn} onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </div>
  );
};

export default CartItemRow;
