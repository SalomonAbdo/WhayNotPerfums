import { persistentAtom } from '@nanostores/persistent';

// Estado persistente del carrito (se guarda en localStorage automáticamente)
// La clave en localStorage será 'wnp_cart'
export const isCartOpen = persistentAtom('wnp_cart_open', 'false'); // Estado para abrir/cerrar sidebar si decido usarlo
export const cartItems = persistentAtom('wnp_cart', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

/**
 * Añadir producto al carrito
 * @param {object} product
 */
export function addToCart(product) {
  const currentItems = cartItems.get();
  const existingItem = currentItems.find((item) => item.id === product.id);

  if (existingItem) {
    cartItems.set(
      currentItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  } else {
    cartItems.set([...currentItems, { ...product, quantity: 1 }]);
  }

  // Opcional: Abrir carrito o mostrar notificación
  console.log("Producto añadido:", product);
}

/**
 * Remover un item del carrito
 * @param {string} itemId
 */
export function removeFromCart(itemId) {
  cartItems.set(cartItems.get().filter((item) => item.id !== itemId));
}

/**
 * Cambiar cantidad de un item
 * @param {string} itemId
 * @param {number} newQuantity
 */
export function updateQuantity(itemId, newQuantity) {
  if (newQuantity < 1) return;
  cartItems.set(
    cartItems.get().map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    )
  );
}

export function clearCart() {
  cartItems.set([]);
}
