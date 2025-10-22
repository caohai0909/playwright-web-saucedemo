export const URLS = {
  BASE_URL: 'https://www.saucedemo.com',
  LOGIN: '/',
  INVENTORY: '/inventory.html',
  CART: '/cart.html',
  CHECKOUT_STEP_ONE: '/checkout-step-one.html',
  CHECKOUT_STEP_TWO: '/checkout-step-two.html',
  CHECKOUT_COMPLETE: '/checkout-complete.html',
};

export const TIMEOUTS = {
  DEFAULT: 30000,
  NAVIGATION: 10000,
  ELEMENT_VISIBLE: 5000,
  NETWORK_IDLE: 10000,
};

export const SORT_OPTIONS = {
  NAME_ASC: 'az',
  NAME_DESC: 'za',
  PRICE_LOW_HIGH: 'lohi',
  PRICE_HIGH_LOW: 'hilo',
} as const;

export const PAGE_TITLES = {
  PRODUCTS: 'Products',
  CART: 'Your Cart',
  CHECKOUT_INFO: 'Checkout: Your Information',
  CHECKOUT_OVERVIEW: 'Checkout: Overview',
  CHECKOUT_COMPLETE: 'Checkout: Complete!',
};

export const SUCCESS_MESSAGES = {
  ORDER_COMPLETE: 'Thank you for your order!',
  ORDER_DISPATCHED: 'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
};