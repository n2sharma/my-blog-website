export const MOCK_PRODUCTS = [
  { sku: 'SKU123', name: 'Mechanical Keyboard', price: '$99', image: '/keyboard.jpg' },
  { sku: 'SKU456', name: 'Gaming Mouse',        price: '$49', image: '/mouse-image.jpg' }, // ✅ just this
  { sku: 'SKU789', name: 'Monitor',             price: '$199', image: '/monitor.jpg' },
];

export type Product = (typeof MOCK_PRODUCTS)[number];
