// src/utils/cartUtils.js

export const getCartItemsFromLocalStorage = (userId) => {
  const data = localStorage.getItem(`cart_${userId}`);
  return data ? JSON.parse(data) : [];
};

export const saveCartItemsToLocalStorage = (userId, items) => {
  localStorage.setItem(`cart_${userId}`, JSON.stringify(items));
};
