import styles from "./MenuItemCard.module.css";
import type { MenuItem } from "../../types/menuItem";

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{item.name}</h3>
      <p className={styles.description}>{item.description}</p>
      <div className={styles.footer}>
        <span className={styles.price}>${item.price.toFixed(2)}</span>
        {item.isAvailable ? (
          <button className={styles.button} onClick={() => onAddToCart(item)}>
            Add to Cart
          </button>
        ) : (
          <span className={styles.unavailable}>Unavailable</span>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;
