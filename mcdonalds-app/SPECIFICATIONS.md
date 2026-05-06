# McDonald's Online Ordering App

## Purpose

Build a simple React application to manage McDonald's online food ordering. Customers can browse the menu, add items to their cart, place orders, and track order status — all driven by spec-first development.

---

## Tech Stack

- React 18
- TypeScript
- react-router-dom v6
- CSS (or CSS Modules)
- Functional components only

---

## Basic Flow

- Menu contains multiple categories (Burgers, Sides, Drinks, Desserts)
- Customer browses menu and adds items to cart
- Cart shows selected items with quantities and total price
- Customer places order → order is created with a unique Order ID
- Order receipt is generated when order is placed
- Receipt includes item details, quantities, total amount, and order time
- On order completion:
  - Receipt is closed/confirmed
  - Order status updates to `Completed`
  - Cart is cleared

---

## Core Entities

### MenuItem

```ts
id: string
name: string
description: string
price: number
category: 'Burger' | 'Side' | 'Drink' | 'Dessert'
isAvailable: boolean
imageUrl?: string
```

### CartItem

```ts
id: string
menuItemId: string
name: string
price: number
quantity: number
```

### Order

```ts
id: string
items: CartItem[]
totalAmount: number
status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'
placedAt: string
completedAt?: string
```

### Receipt

```ts
id: string
orderId: string
items: CartItem[]
totalAmount: number
placedAt: string
completedAt?: string
isActive: boolean
```

---

## Business Rules

- A menu item can only be added to the cart if it is available
- Cart must have at least one item before placing an order
- Order total is calculated based on item prices and quantities
- Receipt is generated automatically when order is placed
- Receipt is closed when order status changes to `Completed` or `Cancelled`
- Cart is cleared only after a successful order placement
- Quantity of a cart item must be at least 1
- Customer cannot place a duplicate active order (one active order at a time)

---

## Screens

- **Menu Page** — Browse all menu items grouped by category
- **Cart Page** — View selected items, update quantities, remove items, see total
- **Place Order Page** — Review cart and confirm the order
- **Order List Page** — View all past and active orders with statuses
- **Receipt Page** — View the receipt for a specific order

---

## Routing

```
/menu                → Menu Page (browse all items by category)
/cart                → Cart Page (view and manage cart)
/orders/new          → Place Order Page (review and confirm order)
/orders              → Order List Page (all orders)
/orders/:orderId     → Receipt Page (receipt for a specific order)
```

---

## Folder Structure

```
src/

  components/
    MenuItemCard/
      MenuItemCard.tsx
      MenuItemCard.module.css
    MenuList/
      MenuList.tsx
      MenuList.module.css
    CartItemRow/
      CartItemRow.tsx
      CartItemRow.module.css
    CartSummary/
      CartSummary.tsx
      CartSummary.module.css
    OrderCard/
      OrderCard.tsx
      OrderCard.module.css
    ReceiptView/
      ReceiptView.tsx
      ReceiptView.module.css

  pages/
    MenuPage.tsx
    CartPage.tsx
    PlaceOrderPage.tsx
    OrderListPage.tsx
    ReceiptPage.tsx

  routes/
    AppRoutes.tsx

  services/
    menuService.ts
    cartService.ts
    orderService.ts
    receiptService.ts

  types/
    menuItem.ts
    cartItem.ts
    order.ts
    receipt.ts

  utils/
    timeUtils.ts
    priceUtils.ts
    idUtils.ts

  data/
    menuData.ts

  App.tsx
  index.tsx
```

---

## Data

Seed the app with static mock menu data inside `src/data/menuData.ts`.

### Sample Menu Data

```ts
// src/data/menuData.ts

import { MenuItem } from '../types/menuItem';

export const menuData: MenuItem[] = [
  {
    id: 'm1',
    name: 'Big Mac',
    description: 'Two beef patties with special sauce, lettuce, cheese, pickles, and onions.',
    price: 5.99,
    category: 'Burger',
    isAvailable: true,
  },
  {
    id: 'm2',
    name: 'McChicken',
    description: 'Crispy chicken patty with mayo and shredded lettuce.',
    price: 4.49,
    category: 'Burger',
    isAvailable: true,
  },
  {
    id: 'm3',
    name: 'French Fries (Large)',
    description: 'Golden, crispy fries lightly salted.',
    price: 2.99,
    category: 'Side',
    isAvailable: true,
  },
  {
    id: 'm4',
    name: 'Coca-Cola (Medium)',
    description: 'Refreshing Coca-Cola served with ice.',
    price: 1.99,
    category: 'Drink',
    isAvailable: true,
  },
  {
    id: 'm5',
    name: 'McFlurry Oreo',
    description: 'Creamy vanilla soft serve with Oreo cookie pieces.',
    price: 3.49,
    category: 'Dessert',
    isAvailable: true,
  },
  {
    id: 'm6',
    name: 'Quarter Pounder with Cheese',
    description: 'A quarter pound beef patty with cheese, onions, and pickles.',
    price: 6.49,
    category: 'Burger',
    isAvailable: false,
  },
];
```

---

## State Management

- Use React hooks (`useState`, `useEffect`, `useCallback`)
- Cart state is managed at the top-level `App.tsx` and passed via props
- Order state is managed in `OrderListPage.tsx`
- Receipt state is derived from order data
- No global state library (no Redux, no Context API)
- Keep state close to where it is used

---

## Services

### `menuService.ts`

```ts
// Responsibilities:
// - getAllMenuItems(): MenuItem[]
// - getMenuItemById(id: string): MenuItem | undefined
// - getMenuItemsByCategory(category: string): MenuItem[]
```

### `cartService.ts`

```ts
// Responsibilities:
// - addItemToCart(cart: CartItem[], menuItem: MenuItem): CartItem[]
// - removeItemFromCart(cart: CartItem[], cartItemId: string): CartItem[]
// - updateItemQuantity(cart: CartItem[], cartItemId: string, quantity: number): CartItem[]
// - calculateTotal(cart: CartItem[]): number
// - clearCart(): CartItem[]
```

### `orderService.ts`

```ts
// Responsibilities:
// - createOrder(cart: CartItem[]): Order
// - updateOrderStatus(order: Order, status: Order['status']): Order
// - getOrderById(orders: Order[], id: string): Order | undefined
```

### `receiptService.ts`

```ts
// Responsibilities:
// - generateReceipt(order: Order): Receipt
// - closeReceipt(receipt: Receipt): Receipt
```

---

## Utils

### `timeUtils.ts`

```ts
// formatTime(isoString: string): string
// getCurrentISOTime(): string
```

### `priceUtils.ts`

```ts
// formatPrice(amount: number): string  → e.g. "$5.99"
// calculateSubtotal(price: number, quantity: number): number
```

### `idUtils.ts`

```ts
// generateId(): string  → simple unique ID using Date.now() + Math.random()
```

---

## Types

### `src/types/menuItem.ts`

```ts
export type MenuCategory = 'Burger' | 'Side' | 'Drink' | 'Dessert';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  isAvailable: boolean;
  imageUrl?: string;
}
```

### `src/types/cartItem.ts`

```ts
export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
}
```

### `src/types/order.ts`

```ts
import { CartItem } from './cartItem';

export type OrderStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  placedAt: string;
  completedAt?: string;
}
```

### `src/types/receipt.ts`

```ts
import { CartItem } from './cartItem';

export interface Receipt {
  id: string;
  orderId: string;
  items: CartItem[];
  totalAmount: number;
  placedAt: string;
  completedAt?: string;
  isActive: boolean;
}
```

---

## Component Responsibilities

### `MenuItemCard`

- Displays name, description, price, and category badge
- Shows "Add to Cart" button if item is available
- Shows "Unavailable" badge if item is not available
- Calls `onAddToCart(menuItem)` prop on button click

### `MenuList`

- Receives full list of menu items
- Groups items by category
- Renders `MenuItemCard` for each item

### `CartItemRow`

- Displays item name, unit price, quantity controls (+/-), subtotal
- Calls `onIncrease(cartItemId)`, `onDecrease(cartItemId)`, `onRemove(cartItemId)` props

### `CartSummary`

- Displays total amount
- Shows "Place Order" button
- Disables "Place Order" button if cart is empty

### `OrderCard`

- Displays order ID, placed time, total amount, and status badge
- "View Receipt" button navigates to `/orders/:orderId`

### `ReceiptView`

- Displays full receipt: order ID, items, quantities, prices, total, placed time
- Shows "Mark as Completed" button if order is active
- Shows completion time if order is completed

---

## Page Responsibilities

### `MenuPage.tsx`

- Fetches menu items from `menuService`
- Passes `onAddToCart` down to `MenuList` → `MenuItemCard`
- Shows cart item count in a sticky header/nav bar

### `CartPage.tsx`

- Displays all cart items using `CartItemRow`
- Displays `CartSummary` with total
- Handles increase, decrease, remove actions
- "Place Order" button navigates to `/orders/new`

### `PlaceOrderPage.tsx`

- Displays read-only cart review
- Shows total amount
- "Confirm Order" button calls `orderService.createOrder(cart)`
- On success: clears cart, navigates to `/orders`

### `OrderListPage.tsx`

- Displays all orders using `OrderCard`
- Shows empty state if no orders exist

### `ReceiptPage.tsx`

- Reads `orderId` from URL params
- Finds matching order from order list
- Renders `ReceiptView`
- "Mark as Completed" button updates order status and closes receipt

---

## Navigation Bar

Persistent nav bar visible on all pages with links:

```
McDonald's Logo | Menu | Cart (n) | Orders
```

- Cart shows item count badge dynamically
- Built inside `App.tsx` or a `Navbar` component

---

## Error Handling

- Show error message if cart is empty and user tries to place an order
- Show error message if a menu item is unavailable and cannot be added
- Handle empty menu list gracefully with a "No items available" message
- Handle empty cart gracefully with a "Your cart is empty" message
- Handle empty order list gracefully with a "No orders placed yet" message
- Show "Order not found" if receipt page receives an invalid order ID
- Handle quantity going below 1 by auto-removing the item from cart

---

## Coding Rules

- No class components
- No `any` type
- No `console.log`
- Small, readable, single-responsibility components
- All props must be explicitly typed with TypeScript interfaces
- All service functions must have explicit return types
- No inline styles — use CSS Modules only
- File names match component names exactly

---

## Acceptance Criteria

- Menu items display correctly grouped by category
- Unavailable items cannot be added to the cart
- Cart correctly reflects added items, quantities, and total price
- Cart item quantity can be increased, decreased, or removed
- Order is placed only when cart has at least one item
- Order is assigned a unique ID with correct placed time
- Receipt is generated with correct order details on order placement
- Receipt closes and order status updates to `Completed` on confirmation
- Cart is cleared after successful order placement
- All routes navigate correctly without page refresh
- App runs without any TypeScript errors
- All edge cases (empty cart, unavailable item, invalid order ID) are handled gracefully

---

## Future Enhancements (Out of Scope)

- User authentication and profiles
- Payment gateway integration
- Real-time order tracking
- Backend API integration
- Persistent storage (localStorage or database)
- Promo codes and discounts
