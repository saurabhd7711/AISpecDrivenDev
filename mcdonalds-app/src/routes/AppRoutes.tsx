import { Routes, Route } from "react-router-dom";
import MenuPage from "../pages/MenuPage";
import CartPage from "../pages/CartPage";
import PlaceOrderPage from "../pages/PlaceOrderPage";
import OrderListPage from "../pages/OrderListPage";
import ReceiptPage from "../pages/ReceiptPage";
import type { CartItem } from "../types/cartItem";
import type { Order } from "../types/order";
import type { MenuItem } from "../types/menuItem";

interface AppRoutesProps {
  cart: CartItem[];
  orders: Order[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateCart: (cart: CartItem[]) => void;
  onOrderPlaced: (cart: CartItem[]) => void;
  onAddOrder: (order: Order) => void;
  onOrderStatusChange: (updatedOrder: Order) => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({
  cart,
  orders,
  onAddToCart,
  onUpdateCart,
  onOrderPlaced,
  onAddOrder,
  onOrderStatusChange,
}) => {
  return (
    <Routes>
      <Route
        path="/menu"
        element={<MenuPage cart={cart} onAddToCart={onAddToCart} />}
      />
      <Route
        path="/cart"
        element={<CartPage cart={cart} onUpdateCart={onUpdateCart} />}
      />
      <Route
        path="/orders/new"
        element={
          <PlaceOrderPage
            cart={cart}
            onOrderPlaced={onOrderPlaced}
            onAddOrder={onAddOrder}
          />
        }
      />
      <Route path="/orders" element={<OrderListPage orders={orders} />} />
      <Route
        path="/orders/:orderId"
        element={
          <ReceiptPage
            orders={orders}
            onOrderStatusChange={onOrderStatusChange}
          />
        }
      />
      <Route
        path="/"
        element={<MenuPage cart={cart} onAddToCart={onAddToCart} />}
      />
    </Routes>
  );
};

export default AppRoutes;
