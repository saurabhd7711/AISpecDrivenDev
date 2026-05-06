import styles from "./MenuList.module.css";
import MenuItemCard from "../MenuItemCard/MenuItemCard";
import type { MenuItem, MenuCategory } from "../../types/menuItem";

interface MenuListProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

const MenuList: React.FC<MenuListProps> = ({ items, onAddToCart }) => {
  const categories: MenuCategory[] = ["Burger", "Side", "Drink", "Dessert"];

  const groupedItems = categories.map((category) => ({
    category,
    items: items.filter((item) => item.category === category),
  }));

  return (
    <div className={styles.container}>
      {groupedItems.map(({ category, items: categoryItems }) => (
        <div key={category} className={styles.section}>
          <h2 className={styles.categoryTitle}>{category}s</h2>
          {categoryItems.length === 0 ? (
            <p className={styles.empty}>No items available</p>
          ) : (
            <div className={styles.grid}>
              {categoryItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuList;
