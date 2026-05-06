import { useState } from "react";
import MenuList from "../components/MenuList/MenuList";
import type { MenuItem } from "../types/menuItem";
import type { CartItem } from "../types/cartItem";
import { menuData } from "../data/menuData";

interface MenuPageProps {
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
}

const MenuPage: React.FC<MenuPageProps> = ({ onAddToCart }) => {
  const [menuItems] = useState<MenuItem[]>(menuData);

  return (
    <div style={{ paddingBottom: "60px" }}>
      <MenuList items={menuItems} onAddToCart={onAddToCart} />
    </div>
  );
};

export default MenuPage;
